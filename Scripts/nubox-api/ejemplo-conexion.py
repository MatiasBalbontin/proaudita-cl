"""
Ejemplo de conexión a la API de Nubox para extraer datos contables.
Requiere: pip install requests python-dotenv
Requiere: archivo .env con NUBOX_CLIENT_ID, NUBOX_CLIENT_SECRET, NUBOX_EMPRESA_RUT
"""

import os
import requests
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv("NUBOX_CLIENT_ID")
CLIENT_SECRET = os.getenv("NUBOX_CLIENT_SECRET")
EMPRESA_RUT = os.getenv("NUBOX_EMPRESA_RUT")  # formato: 12345678-9

BASE_URL = "https://api.nubox.com/v1"


def get_token():
    response = requests.post(
        f"{BASE_URL}/oauth/token",
        data={
            "grant_type": "client_credentials",
            "client_id": CLIENT_ID,
            "client_secret": CLIENT_SECRET,
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json()["access_token"]


def get_headers(token):
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "X-Company-RUT": EMPRESA_RUT,
    }


def get_libro_diario(token, fecha_desde, fecha_hasta):
    """Extrae el libro diario en un rango de fechas."""
    headers = get_headers(token)
    params = {
        "fecha_desde": fecha_desde,  # formato YYYY-MM-DD
        "fecha_hasta": fecha_hasta,
        "limit": 500,
        "offset": 0,
    }
    asientos = []
    while True:
        response = requests.get(
            f"{BASE_URL}/contabilidad/asientos",
            headers=headers,
            params=params,
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        asientos.extend(data.get("items", []))
        if len(data.get("items", [])) < params["limit"]:
            break
        params["offset"] += params["limit"]
    return asientos


def get_registro_ventas(token, periodo):
    """Extrae registro de ventas de un período (formato YYYY-MM)."""
    headers = get_headers(token)
    anio, mes = periodo.split("-")
    response = requests.get(
        f"{BASE_URL}/facturacion/documentos",
        headers=headers,
        params={
            "tipo": "venta",
            "anio": anio,
            "mes": mes,
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.json().get("items", [])


if __name__ == "__main__":
    print("Conectando a Nubox...")
    token = get_token()
    print(f"Token obtenido: OK")

    # Ejemplo: libro diario del mes anterior
    hoy = datetime.today()
    primer_dia_mes_anterior = (hoy.replace(day=1) - timedelta(days=1)).replace(day=1)
    ultimo_dia_mes_anterior = hoy.replace(day=1) - timedelta(days=1)

    asientos = get_libro_diario(
        token,
        primer_dia_mes_anterior.strftime("%Y-%m-%d"),
        ultimo_dia_mes_anterior.strftime("%Y-%m-%d"),
    )
    print(f"Asientos encontrados: {len(asientos)}")

    # Validar cuadratura
    for asiento in asientos:
        debe = sum(d["monto"] for d in asiento.get("detalle", []) if d["tipo"] == "D")
        haber = sum(d["monto"] for d in asiento.get("detalle", []) if d["tipo"] == "H")
        if abs(debe - haber) > 0.01:
            print(f"ALERTA: Asiento {asiento['numero']} no cuadra: D={debe} H={haber}")
