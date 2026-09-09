"""
Scraping de prospectos — Proaudita
Actor: compass/crawler-google-places (Google Maps Scraper), pricing PAY_PER_EVENT.

Tarifa plan FREE (verificada 2026-09-07 via API):
    place-scraped            $0.004  base por lugar
    contact-details-scraped  $0.002  add-on que extrae el email desde el sitio
    filter-applied           $0.001  por lugar POR filtro -> filtramos en Python, no en el actor
    => costo efectivo $0.006 por lugar

Presupuesto: tope duro de $5 USD administrado por este script (ledger) Y por el
parametro maxTotalChargeUsd de cada run (tope a nivel plataforma). La cuenta FREE
ademas tiene maxMonthlyUsageUsd = 5.

Uso:
    python call_apify_proaudita.py --pilot           # ~60 lugares, ~$0.36
    python call_apify_proaudita.py --budget 2.10     # tanda con presupuesto explicito
    python call_apify_proaudita.py --saldo           # solo consultar cuanto queda

Requiere .env con APIFY_API_TOKEN (y opcionalmente RESEND_API_KEY, NOTIFY_EMAIL).
"""

import argparse
import base64
import csv
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / ".env")

APIFY_API_TOKEN = os.getenv("APIFY_API_TOKEN")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "matiasrbalbontin@gmail.com")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")

ACTOR = "compass~crawler-google-places"
API = "https://api.apify.com/v2"

# --- Presupuesto -----------------------------------------------------------
BUDGET_TOTAL_USD = 5.00          # tope autorizado por Matias
COST_PER_PLACE_USD = 0.006       # place-scraped + contact-details-scraped
MIN_CHARGE_CAP_USD = 0.50        # minimo que exige el actor para maxTotalChargeUsd
RESERVE_USD = 0.20               # colchon para no rozar el tope de la cuenta

REPO = Path(__file__).resolve().parents[2]
DATA = REPO / "data"
LEDGER = DATA / "apify-ledger.jsonl"
LEADS_CSV = DATA / "leads.csv"

# --- Segmentacion ----------------------------------------------------------
# Menos combinaciones y mejor elegidas. Cada combinacion extra diluye el
# presupuesto: 144 queries x 40 lugares = 5760 lugares = ~$34 USD.
COMUNAS = ["Las Condes", "Providencia", "Vitacura", "Santiago Centro", "Huechuraba"]
RUBROS = [
    "empresa constructora",
    "clinica privada",
    "hotel boutique",          # "hotel" a secas traia solo cadenas (Accor, NH, Ibis)
    "inmobiliaria",
    "empresa de logistica",
]

# Aprendido en el piloto 2026-09-07: 32% del output eran cadenas multinacionales
# (contabilidad centralizada fuera de Chile, correo de reservas) o micro-empresas.
PREFIJOS_NO_DECISOR = ("reservas@", "reservations@", "booking@", "reserva@", "-re@",
                       "media.", "press@", "prensa@", "marketing@", "rrhh@", "postulacion")
# Alojamiento chico: aparece en "hotel boutique" pero factura muy por debajo del piso
NOMBRES_MICRO = ("hostal", "b&b", "bed and breakfast", "hospedaje", "residencial")
CADENAS = ("accor.com", "nh-hotels.com", "marriott", "hilton", "ihg.com", "melia",
           "wyndham", "radisson", "techint")
REVIEWS_MAX_CADENA = 1500   # sobre esto = corporacion grande, ya tiene Big Four
REVIEWS_MIN_EMPRESA = 20    # bajo esto = micro-empresa, fuera del cliente ideal

MIN_RATING = 3.5
MIN_REVIEWS = 5

CAMPOS = [
    "nombre", "rubro", "ciudad", "telefono", "email", "sitio_web",
    "rating", "n_reviews", "score", "senal", "estado",
    "fecha_extraccion", "fecha_email_1", "fecha_email_2", "notas",
]


# --- Ledger de gasto -------------------------------------------------------
def gasto_acumulado() -> float:
    if not LEDGER.exists():
        return 0.0
    total = 0.0
    for linea in LEDGER.read_text(encoding="utf-8").splitlines():
        if linea.strip():
            total += float(json.loads(linea).get("usd", 0))
    return round(total, 4)


def registrar_gasto(run_id: str, usd: float, lugares: int, leads: int, nota: str = "") -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    evento = {
        "ts": datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds"),
        "run_id": run_id,
        "usd": round(usd, 4),
        "lugares": lugares,
        "leads_calificados": leads,
        "nota": nota,
    }
    with LEDGER.open("a", encoding="utf-8") as f:
        f.write(json.dumps(evento, ensure_ascii=False) + "\n")


def saldo() -> float:
    return round(BUDGET_TOTAL_USD - RESERVE_USD - gasto_acumulado(), 4)


# --- Filtros y scoring (en Python: el filtro del actor cuesta $0.001/lugar/filtro) ---
def descarte(lugar: dict, email: str) -> str:
    """Devuelve el motivo de descarte, o '' si el prospecto sigue vivo."""
    reviews = int(lugar.get("reviewsCount") or 0)
    e = email.lower()
    if any(e.startswith(p) or p in e for p in PREFIJOS_NO_DECISOR):
        return "correo de reservas, no decisor"
    if any(c in e or c in (lugar.get("website") or "").lower() for c in CADENAS):
        return "cadena multinacional"
    if reviews > REVIEWS_MAX_CADENA:
        return "corporacion grande (ya tiene auditor externo)"
    if reviews < REVIEWS_MIN_EMPRESA:
        return "micro-empresa"
    if any(n in (lugar.get("title") or "").lower() for n in NOMBRES_MICRO):
        return "alojamiento chico"
    return ""


def cumple_filtros(lugar: dict) -> bool:
    rating = float(lugar.get("totalScore") or 0)
    reviews = int(lugar.get("reviewsCount") or 0)
    email = _primer_email(lugar)
    if not (rating >= MIN_RATING and reviews >= MIN_REVIEWS
            and lugar.get("website") and email):
        return False
    return not descarte(lugar, email)


def _primer_email(lugar: dict) -> str:
    # scrapeContacts deja los contactos en varias formas segun version del actor
    for clave in ("emails", "email"):
        v = lugar.get(clave)
        if isinstance(v, list) and v:
            return str(v[0])
        if isinstance(v, str) and "@" in v:
            return v
    contacto = lugar.get("contactDetails") or {}
    correos = contacto.get("emails") or []
    return str(correos[0]) if correos else ""


def calcular_score(lugar: dict, email: str) -> int:
    """Escala 0-100 (ver .claude/agents/lead-hunter.md)."""
    score = 25  # rubro objetivo: la query ya lo garantiza
    web = lugar.get("website") or ""
    if web and not any(p in web for p in ("wix", "blogspot", "facebook", "instagram")):
        score += 20
    dominio_web = web.split("//")[-1].split("/")[0].replace("www.", "").lower()
    generico = any(g in email.lower() for g in ("gmail.", "hotmail.", "yahoo.", "outlook."))
    if email and not generico:
        score += 20
        if dominio_web and dominio_web in email.lower():
            score += 5
    reviews = int(lugar.get("reviewsCount") or 0)
    rating = float(lugar.get("totalScore") or 0)
    if rating >= MIN_RATING and reviews >= 10:
        score += 15
    if reviews >= 50:
        score += 10  # proxy de tamano
    return min(score, 100)


def detectar_senal(lugar: dict) -> str:
    """Primera linea del email frio sale de aca. Sin senal -> needs-research."""
    partes = []
    if int(lugar.get("reviewsCount") or 0) >= 100:
        partes.append(f"{lugar['reviewsCount']} resenas en Google")
    cat = lugar.get("categoryName")
    if cat:
        partes.append(str(cat))
    if lugar.get("openingHours"):
        partes.append("horario publicado")
    return " | ".join(partes) if partes else "needs-research"


# --- Apify -----------------------------------------------------------------
def lanzar_run(queries: list, lugares_por_query: int, cap_usd: float) -> dict:
    headers = {"Authorization": f"Bearer {APIFY_API_TOKEN}"}
    payload = {
        "searchStringsArray": queries,
        "locationQuery": "Chile",
        "language": "es",
        "maxCrawledPlacesPerSearch": lugares_por_query,
        "scrapeContacts": True,       # add-on $0.002 — SIN esto no viene email
        "scrapePlaceDetailPage": False,
        "includeWebResults": False,
        "maxReviews": 0,
        "maxImages": 0,
        "maxQuestions": 0,
    }
    # Tope a nivel plataforma: Apify aborta el run si lo supera.
    url = f"{API}/acts/{ACTOR}/runs?maxTotalChargeUsd={cap_usd:.2f}"
    r = requests.post(url, json=payload, headers=headers, timeout=60)
    r.raise_for_status()
    run = r.json()["data"]
    print(f"  run {run['id']} lanzado — cap ${cap_usd:.2f}")

    status_url = f"{API}/actor-runs/{run['id']}"
    for _ in range(180):  # hasta 15 min
        time.sleep(5)
        d = requests.get(status_url, headers=headers, timeout=30).json()["data"]
        if d["status"] in ("SUCCEEDED", "FAILED", "ABORTED", "TIMED-OUT"):
            return d
        print(f"    ... {d['status']}", end="\r")
    return requests.get(status_url, headers=headers, timeout=30).json()["data"]


def costo_real(run: dict) -> float:
    for clave in ("usageTotalUsd", "chargedTotalUsd"):
        if run.get(clave) is not None:
            return float(run[clave])
    return float((run.get("stats") or {}).get("computeUnits", 0)) * 0.25


def bajar_dataset(run: dict) -> list:
    headers = {"Authorization": f"Bearer {APIFY_API_TOKEN}"}
    url = f"{API}/datasets/{run['defaultDatasetId']}/items?clean=true&format=json"
    return requests.get(url, headers=headers, timeout=120).json()


# --- Persistencia ----------------------------------------------------------
def cargar_existentes() -> set:
    if not LEADS_CSV.exists():
        return set()
    with LEADS_CSV.open(encoding="utf-8") as f:
        return {(fila["nombre"] + "|" + fila["email"]).lower() for fila in csv.DictReader(f)}


def guardar_leads(leads: list) -> int:
    DATA.mkdir(parents=True, exist_ok=True)
    nuevo = not LEADS_CSV.exists()
    with LEADS_CSV.open("a", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=CAMPOS, extrasaction="ignore")
        if nuevo:
            w.writeheader()
        w.writerows(leads)
    return len(leads)


# --- Main ------------------------------------------------------------------
def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pilot", action="store_true", help="tanda de validacion (~60 lugares)")
    ap.add_argument("--budget", type=float, help="USD a gastar en esta tanda")
    ap.add_argument("--saldo", action="store_true", help="solo mostrar presupuesto restante")
    ap.add_argument("--comunas", help="lista separada por coma; sobreescribe COMUNAS. "
                                      "Usar comunas nuevas en cada tanda: repetir una query "
                                      "ya corrida se paga de nuevo y devuelve duplicados.")
    args = ap.parse_args()
    global COMUNAS
    if args.comunas:
        COMUNAS = [c.strip() for c in args.comunas.split(",") if c.strip()]

    if not APIFY_API_TOKEN:
        print("ERROR: falta APIFY_API_TOKEN en Scripts/scraping/.env")
        return 1

    disponible = saldo()
    print(f"Presupuesto: ${BUDGET_TOTAL_USD:.2f} | gastado ${gasto_acumulado():.4f} "
          f"| reserva ${RESERVE_USD:.2f} | disponible ${disponible:.4f}")
    if args.saldo:
        return 0

    tanda = 0.36 if args.pilot else (args.budget or disponible)
    if tanda > disponible:
        print(f"ABORTADO: la tanda (${tanda:.2f}) excede el disponible (${disponible:.4f}).")
        return 1
    if tanda <= 0:
        print("ABORTADO: sin presupuesto disponible.")
        return 1

    lugares = int(tanda / COST_PER_PLACE_USD)
    queries = [f"{r} en {c}" for c in COMUNAS for r in RUBROS]
    por_query = max(1, lugares // len(queries))
    lugares_reales = por_query * len(queries)
    estimado = lugares_reales * COST_PER_PLACE_USD
    cap = max(MIN_CHARGE_CAP_USD, round(estimado * 1.15, 2))

    print(f"Tanda: {len(queries)} queries x {por_query} lugares = {lugares_reales} lugares")
    print(f"Costo estimado ${estimado:.3f} | cap del run ${cap:.2f}")

    run = lanzar_run(queries, por_query, cap)
    usd = costo_real(run)
    print(f"\nRun {run['status']} — costo real ${usd:.4f}")

    if run["status"] != "SUCCEEDED":
        registrar_gasto(run["id"], usd, 0, 0, f"status={run['status']}")
        print("Run no exitoso. Gasto registrado igual.")
        return 1

    items = bajar_dataset(run)
    vistos = cargar_existentes()
    hoy = datetime.today().strftime("%Y-%m-%d")
    leads, con_email = [], 0

    for lugar in items:
        email = _primer_email(lugar)
        if email:
            con_email += 1
        if not cumple_filtros(lugar):
            continue
        clave = f"{lugar.get('title', '')}|{email}".lower()
        if clave in vistos:
            continue
        vistos.add(clave)
        score = calcular_score(lugar, email)
        if score < 60:
            continue
        leads.append({
            "nombre": lugar.get("title", ""),
            "rubro": lugar.get("categoryName", ""),
            "ciudad": lugar.get("city") or lugar.get("neighborhood") or "",
            "telefono": lugar.get("phone", ""),
            "email": email,
            "sitio_web": lugar.get("website", ""),
            "rating": lugar.get("totalScore", ""),
            "n_reviews": lugar.get("reviewsCount", 0),
            "score": score,
            "senal": detectar_senal(lugar),
            "estado": "prospecto",
            "fecha_extraccion": hoy,
            "fecha_email_1": "",
            "fecha_email_2": "",
            "notas": "",
        })

    leads.sort(key=lambda x: x["score"], reverse=True)
    guardar_leads(leads)
    registrar_gasto(run["id"], usd, len(items), len(leads), "pilot" if args.pilot else "tanda")

    n = len(items)
    print(f"\n--- Rendimiento de la tanda ---")
    print(f"Lugares extraidos      : {n}")
    print(f"Con email              : {con_email} ({con_email / n * 100:.1f}%)" if n else "Con email: 0")
    print(f"Leads calificados (>=60): {len(leads)} ({len(leads) / n * 100:.1f}%)" if n else "")
    print(f"Costo                  : ${usd:.4f}  (${usd / max(len(leads), 1):.3f} por lead calificado)")
    print(f"Disponible restante    : ${saldo():.4f}")
    print(f"\nTop 5:")
    for l in leads[:5]:
        print(f"  [{l['score']}] {l['nombre']} | {l['email']} | {l['ciudad']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
