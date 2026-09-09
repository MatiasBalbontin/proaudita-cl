"""
Consolidacion de la base de leads — Proaudita.
Cierra el tramo de scraping (decision Matias 2026-09-07: no recargar Apify).

Hace tres cosas sobre data/leads.csv, in place:
  1. Dedup por empresa real (dominio > email > telefono), no por fila.
  2. Enriquecimiento derivado: dominio, si el email llega a una persona, proxy de tamano.
  3. Priorizacion en tiers A/B/C para decidir a quien se le escribe primero.

    python Scripts/consolidar_leads.py
"""

import csv
import re
import shutil
from collections import defaultdict
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
LEADS = REPO / "data" / "leads.csv"

CAMPOS = [
    "tier", "prioridad", "nombre", "rubro", "familia", "ciudad", "telefono", "email",
    "email_nominal", "dominio", "sitio_web", "rating", "n_reviews", "tamano_proxy",
    "score", "senal", "estado", "fecha_extraccion", "fecha_email_1", "fecha_email_2", "notas",
]

# Familias de rubro por encaje con las areas de practica (CONTEXT.md).
# Peso = cuanta complejidad contable//de procesos tiene el rubro en la practica.
FAMILIAS = {
    "construccion": (["constructora", "construcci", "obras", "ingenier"], 20),
    "inmobiliaria": (["inmobiliar", "propiedades", "bienes", "corretaje", "arriendo",
                      "administracion de propiedades", "administraci"], 18),
    "salud": (["clinic", "clínic", "medic", "médic", "hospital", "sanatorio",
               "dental", "laboratorio"], 18),
    "logistica": (["logístic", "logistic", "transport", "carga", "courier",
                   "almacen", "distribuidora", "freight"], 16),
    "hoteleria": (["hotel", "aparthotel", "apart hotel"], 10),
}

GENERICOS = ("gmail.", "hotmail.", "yahoo.", "outlook.", "live.")
BUZONES = ("info@", "contacto@", "contact@", "ventas@", "hola@", "administracion@",
           "admin@", "recepcion@", "consultas@", "comercial@")
# Buzones que existen pero no llegan a nadie que decida contratar una auditoria.
NO_DECISOR = ("denuncia", "reclamo", "cobranza", "soporte", "postventa",
              "servicioalcliente", "servicioclientes", "sac@", "mesadeayuda")
# Corporaciones globales: ya tienen auditor externo, la decision no se toma en Chile.
CORPORACIONES = ("maersk", "dhl.com", "fedex.com", "ups.com", "kuehne", "db-schenker",
                 "sodexo", "cencosud", "falabella")
# Servicios de nicho que caen bajo "constructora" pero facturan como micro-empresa.
MICRO_EN_NOMBRE = ("quincho", "pergola", "p�rgola", "pérgola", "terrazas",
                   "cerco", "piscina", "toldo", "mudanza")


def dominio_de(url: str, email: str) -> str:
    d = url.split("//")[-1].split("/")[0].replace("www.", "").lower().strip()
    if d:
        return d
    return email.split("@")[-1].lower().strip() if "@" in email else ""


def familia_de(rubro: str, nombre: str) -> tuple:
    texto = f"{rubro} {nombre}".lower()
    for fam, (claves, peso) in FAMILIAS.items():
        if any(k in texto for k in claves):
            return fam, peso
    return "otros", 8


def es_nominal(email: str) -> bool:
    """nombre.apellido@ llega a una persona; info@ llega a nadie.
    Un correo en dominio generico nunca cuenta como nominal aunque tenga punto:
    'alcave.propiedades@gmail.com' es un buzon, no una persona."""
    e = email.lower()
    local = e.split("@")[0]
    if any(g in e for g in GENERICOS):
        return False
    if any(e.startswith(b) for b in BUZONES) or any(nd in local for nd in NO_DECISOR):
        return False
    return bool(re.match(r"^[a-z]+[._-][a-z]+", local))


def motivo_descarte(fila: dict) -> str:
    """Segundo pasada de calidad sobre lo ya scrapeado. No cuesta nada y evita
    quemar prospectos con correos que no llegan a un decisor."""
    e = fila["email"].lower()
    nombre = fila["nombre"].lower()
    web = fila["sitio_web"].lower()
    if any(nd in e.split("@")[0] for nd in NO_DECISOR):
        return "buzon no decisor"
    if any(c in e or c in web or c in nombre for c in CORPORACIONES):
        return "corporacion global (auditor ya definido fuera de Chile)"
    if any(m in nombre for m in MICRO_EN_NOMBRE):
        return "servicio de nicho / micro-empresa"
    return ""


def tamano_proxy(reviews: int) -> str:
    if reviews >= 500:
        return "grande"
    if reviews >= 100:
        return "mediana-alta"
    if reviews >= 40:
        return "mediana"
    return "mediana-baja"


def prioridad_de(fila: dict, peso_familia: int) -> int:
    """0-100. Distinto del score de scraping: aquel mide calidad del DATO,
    este mide probabilidad de que valga la pena escribirle."""
    p = peso_familia                      # 8-20 encaje de rubro
    reviews = int(fila["n_reviews"] or 0)
    # Sweet spot de empresa mediana. Muy grande ya tiene auditor; muy chica no paga.
    if 40 <= reviews <= 500:
        p += 22
    elif 100 < reviews < 800:
        p += 16
    elif reviews > 800:
        p += 6                            # probable corporacion, baja probabilidad
    else:
        p += 12
    if fila["email_nominal"] == "si":
        p += 20                           # llega a un decisor con nombre
    elif any(g in fila["email"].lower() for g in GENERICOS):
        p -= 10                           # gmail/hotmail: senal de empresa informal
    else:
        p += 12                           # buzon corporativo, sirve
    if fila["dominio"].endswith(".cl"):
        p += 10                           # operacion chilena, no filial de casa matriz
    if float(fila["rating"] or 0) >= 4.0:
        p += 8
    if fila["senal"] != "needs-research":
        p += 10                           # hay con que abrir el correo
    return min(p, 100)


def tier_de(p: int) -> str:
    if p >= 78:
        return "A"
    if p >= 64:
        return "B"
    return "C"


def main() -> None:
    filas = list(csv.DictReader(LEADS.open(encoding="utf-8")))
    shutil.copy(LEADS, LEADS.with_suffix(f".{datetime.today():%Y%m%d}.bak"))

    # --- 1. dedup por empresa real -----------------------------------------
    grupos = defaultdict(list)
    for f in filas:
        clave = (dominio_de(f["sitio_web"], f["email"])
                 or f["email"].lower()
                 or f["telefono"].replace(" ", ""))
        grupos[clave].append(f)

    consolidadas, fusionadas, descartadas = [], 0, []
    for clave, grupo in grupos.items():
        grupo = [g for g in grupo if not motivo_descarte(g)] or []
        for g in grupos[clave]:
            m = motivo_descarte(g)
            if m:
                descartadas.append((g["nombre"], g["email"], m))
        if not grupo:
            continue
        grupo.sort(key=lambda r: -int(r["score"]))
        mejor = dict(grupo[0])
        if len(grupo) > 1:
            fusionadas += len(grupo) - 1
            sedes = [g["nombre"] for g in grupo[1:]]
            mejor["notas"] = (mejor.get("notas") or "")
            mejor["notas"] += f"[dedup] misma empresa que: {'; '.join(sedes)}. "
            print(f"  FUSIONADO ({clave}): {mejor['nombre'][:38]} <- {len(grupo) - 1} sede(s)")
        consolidadas.append(mejor)

    # --- 2. enriquecimiento + 3. priorizacion -------------------------------
    for f in consolidadas:
        f["dominio"] = dominio_de(f["sitio_web"], f["email"])
        f["email_nominal"] = "si" if es_nominal(f["email"]) else "no"
        f["tamano_proxy"] = tamano_proxy(int(f["n_reviews"] or 0))
        fam, peso = familia_de(f["rubro"], f["nombre"])
        f["familia"] = fam
        f["prioridad"] = prioridad_de(f, peso)
        f["tier"] = tier_de(f["prioridad"])

    consolidadas.sort(key=lambda r: (-r["prioridad"], -int(r["score"])))

    with LEADS.open("w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=CAMPOS, extrasaction="ignore")
        w.writeheader()
        w.writerows(consolidadas)

    # --- reporte ------------------------------------------------------------
    from collections import Counter
    n = len(consolidadas)
    if descartadas:
        print(f"\nDescartadas en la 2a pasada de calidad ({len(descartadas)}):")
        for nom, mail, mot in descartadas:
            print(f"  - {nom[:38]:<38} {mail[:30]:<30} {mot}")
    print(f"\n{len(filas)} filas -> {n} empresas unicas "
          f"({fusionadas} fusionadas, {len(descartadas)} descartadas)")
    print("\nTier   n    (semanas de envio a 20/dia)")
    for t in ("A", "B", "C"):
        k = sum(1 for f in consolidadas if f["tier"] == t)
        print(f"  {t}  {k:>4}")
    print("\nPor familia:")
    for fam, k in Counter(f["familia"] for f in consolidadas).most_common():
        prom = round(sum(f["prioridad"] for f in consolidadas if f["familia"] == fam) / k, 1)
        print(f"  {fam:<14} {k:>4}   prioridad prom. {prom}")
    print(f"\nEmail nominal (llega a persona): "
          f"{sum(1 for f in consolidadas if f['email_nominal'] == 'si')}/{n}")
    print("\nTop 10 de la cola de envio:")
    for f in consolidadas[:10]:
        print(f"  {f['tier']} {f['prioridad']:>3} {f['nombre'][:40]:<40} {f['email'][:32]}")


if __name__ == "__main__":
    main()
