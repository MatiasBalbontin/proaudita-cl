"""
Importa leads desde nominas publicas de gremios a data/leads.csv.
Fuente: data/fuentes/gremios.tsv (curado a mano desde sitios publicos, sin scraping).

Origen de cada nomina:
  cchc-puerto-montt  old.cchc.cl/gremial/camaras-regionales/puerto-montt/socios
  clinicas-de-chile  clinicasdechile.cl/asociados/
  alog-chile         alog.cl/socios/

Diferencia clave con los leads de Apify: el gremio NO publica correo. Estos entran
como 'por_enriquecer' y sin tier — un lead sin correo no se puede encolar para envio.
Lo que si aportan es pre-calificacion: ser socio del gremio es senal de tamano y de
formalidad que Google Maps no da.

    python Scripts/importar_gremios.py
"""

import csv
import re
import unicodedata
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
LEADS = REPO / "data" / "leads.csv"
FUENTE = REPO / "data" / "fuentes" / "gremios.tsv"

CAMPOS = [
    "tier", "prioridad", "nombre", "rubro", "familia", "ciudad", "telefono", "email",
    "email_nominal", "dominio", "sitio_web", "rating", "n_reviews", "tamano_proxy",
    "score", "senal", "estado", "fuente", "contacto_nombre", "contacto_cargo",
    "fecha_extraccion", "fecha_email_1", "fecha_email_2", "notas",
]

FUENTE_LARGA = {
    "cchc-puerto-montt": "Camara Chilena de la Construccion - Camara Regional Puerto Montt",
    "clinicas-de-chile": "Clinicas de Chile A.G.",
    "alog-chile": "Asociacion Logistica de Chile A.G.",
}


def normalizar(s: str) -> str:
    """Para comparar razones sociales: sin tildes, sin tipo societario, sin puntuacion."""
    s = unicodedata.normalize("NFKD", s.lower())
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = re.sub(r"\b(s\.?a\.?|spa|ltda\.?|limitada|eirl|e\.?i\.?r\.?l\.?|s\.?p\.?a\.?)\b", " ", s)
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return " ".join(s.split())


def dominio_de(url: str) -> str:
    return url.split("//")[-1].split("/")[0].replace("www.", "").lower().strip()


def main() -> None:
    existentes = list(csv.DictReader(LEADS.open(encoding="utf-8")))
    nombres_previos = {normalizar(f["nombre"]) for f in existentes}
    dominios_previos = {f.get("dominio", "") for f in existentes if f.get("dominio")}

    with FUENTE.open(encoding="utf-8") as fh:
        candidatos = list(csv.DictReader(fh, delimiter="\t"))

    hoy = datetime.today().strftime("%Y-%m-%d")
    nuevos, saltados = [], []

    for c in candidatos:
        nombre = c["nombre"].strip()
        norm = normalizar(nombre)
        dom = dominio_de(c.get("sitio_web", "") or "")
        # Dedup: por razon social normalizada y por dominio. Una empresa que ya vino
        # de Apify no se reimporta: se le anota la membresia como senal extra.
        if norm in nombres_previos or (dom and dom in dominios_previos):
            saltados.append((nombre, c["fuente"]))
            continue
        nombres_previos.add(norm)
        if dom:
            dominios_previos.add(dom)

        nuevos.append({
            "tier": "",                       # sin correo no hay cola de envio
            "prioridad": "",
            "nombre": nombre,
            "rubro": "",
            "familia": c["familia"],
            "ciudad": c["ciudad"],
            "telefono": "",
            "email": "",
            "email_nominal": "",
            "dominio": dom,
            "sitio_web": c.get("sitio_web", "") or "",
            "rating": "",
            "n_reviews": "",
            "tamano_proxy": "",
            "score": "",
            "senal": f"Socio de {FUENTE_LARGA[c['fuente']]}",
            "estado": "por_enriquecer",
            "fuente": c["fuente"],
            "contacto_nombre": "",
            "contacto_cargo": "",
            "fecha_extraccion": hoy,
            "fecha_email_1": "",
            "fecha_email_2": "",
            "notas": "",
        })

    # A los ya existentes se les marca la fuente original y, si aplica, la membresia.
    for f in existentes:
        f.setdefault("fuente", "")
        if not f["fuente"]:
            f["fuente"] = "apify-google-maps"
        for nombre, fuente in saltados:
            if normalizar(nombre) == normalizar(f["nombre"]):
                f["notas"] = (f.get("notas") or "") + f"[gremio] socio de {FUENTE_LARGA[fuente]}. "
                f["senal"] = f"{f['senal']} | socio {FUENTE_LARGA[fuente]}"

    with LEADS.open("w", newline="", encoding="utf-8") as fh:
        w = csv.DictWriter(fh, fieldnames=CAMPOS, extrasaction="ignore")
        w.writeheader()
        w.writerows(existentes + nuevos)

    from collections import Counter
    print(f"Candidatos en la nomina : {len(candidatos)}")
    print(f"Ya en la base (dedup)   : {len(saltados)}")
    for nombre, fuente in saltados:
        print(f"    ya estaba: {nombre[:42]:<42} ({fuente})")
    print(f"Importados nuevos       : {len(nuevos)}")
    for fuente, k in Counter(n["fuente"] for n in nuevos).most_common():
        print(f"    {fuente:<20} {k:>4}")
    print(f"\nBase total              : {len(existentes) + len(nuevos)}")
    print(f"  con correo (encolables): {sum(1 for f in existentes + nuevos if f['email'])}")
    print(f"  por_enriquecer         : {sum(1 for f in existentes + nuevos if f['estado'] == 'por_enriquecer')}")


if __name__ == "__main__":
    main()
