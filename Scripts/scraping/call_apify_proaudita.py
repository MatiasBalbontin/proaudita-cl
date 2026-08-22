"""
Scraping semanal de prospectos — Proaudita
Extrae negocios de Google Maps via Apify Actor "Google Maps Scraper"
Requiere: pip install -r requirements.txt
Requiere: .env con APIFY_API_TOKEN, NOTIFY_EMAIL, RESEND_API_KEY
"""

import os
import csv
import json
import time
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

APIFY_API_TOKEN = os.getenv("APIFY_API_TOKEN")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "matiasrbalbontin@gmail.com")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")

CIUDADES = [
    "Santiago Centro",
    "Providencia",
    "Las Condes",
    "Vitacura",
    "Huechuraba",
    "Quilicura",
    "San Joaquín",
    "Ñuñoa",
    "Macul",
    "La Florida",
    "Maipú",
    "San Miguel",
]

RUBROS = [
    "empresa constructora",
    "constructora",
    "clínica privada",
    "centro médico privado",
    "hotel",
    "apart hotel",
    "inmobiliaria",
    "empresa de servicios profesionales",
    "empresa de logística",
    "empresa de transporte",
    "distribuidora",
    "empresa de seguridad",
]

MAX_EMAILS_POR_DIA = 20
MIN_RATING = 3.5
MIN_REVIEWS = 5


def cumple_filtros(lugar: dict) -> bool:
    rating = lugar.get("totalScore") or lugar.get("rating") or 0
    reviews = lugar.get("reviewsCount") or 0
    website = lugar.get("website") or ""
    email = lugar.get("email") or ""
    return (
        float(rating) >= MIN_RATING
        and int(reviews) >= MIN_REVIEWS
        and bool(website)
        and bool(email)
        and "@" in email
    )


def calcular_score(lugar: dict) -> int:
    score = 0
    if lugar.get("website"):
        score += 3
    if lugar.get("email"):
        score += 3
    reviews = lugar.get("reviewsCount") or 0
    if reviews >= 50:
        score += 4
    elif reviews >= 20:
        score += 3
    elif reviews >= 10:
        score += 2
    elif reviews >= MIN_REVIEWS:
        score += 1
    rating = float(lugar.get("totalScore") or lugar.get("rating") or 0)
    if rating >= 4.5:
        score += 2
    elif rating >= 4.0:
        score += 1
    # Bonus por sitio web corporativo (no wix/blogspot/facebook)
    website = lugar.get("website") or ""
    if website and not any(p in website for p in ["wix", "blogspot", "facebook", "instagram"]):
        score += 1
    return score


def run_apify_actor(query: str) -> list:
    """Ejecuta el actor de Google Maps Scraper en Apify."""
    run_url = "https://api.apify.com/v2/acts/compass~crawler-google-places/runs"
    headers = {"Authorization": f"Bearer {APIFY_API_TOKEN}"}
    payload = {
        "searchStringsArray": [query],
        "language": "es",
        "maxCrawledPlacesPerSearch": 40,
        "includeReviews": False,
        "includeImages": False,
        "exportPlaceUrls": False,
    }
    run_resp = requests.post(run_url, json=payload, headers=headers, timeout=30)
    run_resp.raise_for_status()
    run_id = run_resp.json()["data"]["id"]

    # Esperar a que termine
    status_url = f"https://api.apify.com/v2/actor-runs/{run_id}"
    for _ in range(60):  # máximo 5 minutos
        time.sleep(5)
        status = requests.get(status_url, headers=headers, timeout=10).json()["data"]["status"]
        if status == "SUCCEEDED":
            break
        if status in ("FAILED", "ABORTED", "TIMED-OUT"):
            print(f"Actor falló para query: {query} — status: {status}")
            return []

    dataset_url = f"https://api.apify.com/v2/actor-runs/{run_id}/dataset/items"
    items = requests.get(dataset_url, headers=headers, timeout=30).json()
    return items


def extraer_leads() -> list:
    leads = []
    vistos = set()

    for ciudad in CIUDADES:
        for rubro in RUBROS:
            query = f"{rubro} en {ciudad}"
            print(f"  Buscando: {query}")
            try:
                resultados = run_apify_actor(query)
            except Exception as e:
                print(f"  Error en {query}: {e}")
                continue

            for lugar in resultados:
                nombre = lugar.get("name") or lugar.get("title") or ""
                email = lugar.get("email") or ""
                clave = f"{nombre}|{email}".lower()
                if clave in vistos or not cumple_filtros(lugar):
                    continue
                vistos.add(clave)
                leads.append({
                    "nombre": nombre,
                    "rubro": lugar.get("categoryName") or rubro,
                    "ciudad": ciudad,
                    "telefono": lugar.get("phone") or "",
                    "email": email,
                    "sitio_web": lugar.get("website") or "",
                    "rating": lugar.get("totalScore") or lugar.get("rating") or "",
                    "n_reviews": lugar.get("reviewsCount") or 0,
                    "direccion": lugar.get("address") or "",
                    "score": calcular_score(lugar),
                    "estado": "prospecto",
                    "fecha_extraccion": datetime.today().strftime("%Y-%m-%d"),
                    "fecha_email_1": "",
                    "fecha_email_2": "",
                    "notas": "",
                })

    leads.sort(key=lambda x: x["score"], reverse=True)
    return leads


def guardar_csv(leads: list) -> str:
    fecha = datetime.today().strftime("%Y%m%d")
    nombre_archivo = f"leads_{fecha}.csv"
    campos = [
        "nombre", "rubro", "ciudad", "telefono", "email", "sitio_web",
        "rating", "n_reviews", "score", "estado",
        "fecha_extraccion", "fecha_email_1", "fecha_email_2", "notas",
    ]
    with open(nombre_archivo, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=campos, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(leads)
    print(f"CSV guardado: {nombre_archivo} ({len(leads)} leads)")
    return nombre_archivo


def notificar_por_email(archivo_csv: str, n_leads: int) -> None:
    """Envía notificación via Resend con el CSV adjunto."""
    if not RESEND_API_KEY:
        print("Sin RESEND_API_KEY — notificación omitida")
        return

    with open(archivo_csv, "rb") as f:
        import base64
        contenido_b64 = base64.b64encode(f.read()).decode()

    fecha = datetime.today().strftime("%d/%m/%Y")
    payload = {
        "from": "Proaudita Scraper <contacto@proaudita.cl>",
        "to": [NOTIFY_EMAIL],
        "subject": f"Proaudita — {n_leads} leads nuevos ({fecha})",
        "html": f"""
        <h2>Scraping semanal completado</h2>
        <p><strong>{n_leads} leads calificados</strong> encontrados esta semana.</p>
        <p>Adjunto el CSV con los primeros {min(n_leads, MAX_EMAILS_POR_DIA)} para contactar hoy.</p>
        <p>Ordenados por score (mayor = mejor calidad).</p>
        <p>— Proaudita Scripts</p>
        """,
        "attachments": [{"filename": archivo_csv, "content": contenido_b64}],
    }
    resp = requests.post(
        "https://api.resend.com/emails",
        json=payload,
        headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
        timeout=15,
    )
    if resp.status_code == 200:
        print(f"Notificación enviada a {NOTIFY_EMAIL}")
    else:
        print(f"Error al enviar notificación: {resp.text}")


if __name__ == "__main__":
    print(f"Iniciando scraping — {datetime.today().strftime('%Y-%m-%d %H:%M')}")
    print(f"Ciudades: {len(CIUDADES)} | Rubros: {len(RUBROS)} | Queries: {len(CIUDADES)*len(RUBROS)}")

    leads = extraer_leads()
    print(f"\nLeads calificados: {len(leads)}")

    if not leads:
        print("Sin leads — revisar filtros o configuración de Apify")
    else:
        archivo = guardar_csv(leads)
        notificar_por_email(archivo, len(leads))
        print(f"\nTop 5 leads:")
        for lead in leads[:5]:
            print(f"  [{lead['score']}] {lead['nombre']} | {lead['email']} | {lead['ciudad']}")
