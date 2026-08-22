"""
Envío de emails fríos a leads del CSV semanal — Proaudita
Envía máximo MAX_EMAILS_POR_DIA por ejecución.
Registra el envío en el CSV (fecha_email_1).
Requiere: pip install -r requirements.txt
Requiere: .env con RESEND_API_KEY
"""

import os
import csv
import time
import requests
import argparse
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY")
REMITENTE = "Matías Balbontín <contacto@proaudita.cl>"
MAX_EMAILS_POR_DIA = 20
DELAY_ENTRE_EMAILS = 30  # segundos entre envíos para evitar spam


def generar_asunto(nombre_empresa: str) -> str:
    return f"{nombre_empresa} — consulta sobre procesos contables"


def generar_cuerpo_html(nombre_empresa: str, rubro: str) -> str:
    return f"""
    <div style="font-family: Arial, sans-serif; font-size: 15px; color: #333; max-width: 600px;">
      <p>Hola equipo de {nombre_empresa},</p>

      <p>Soy Matías Balbontín, socio fundador de <strong>Proaudita</strong> — firma de auditoría
      de procesos y consultoría tributaria para empresas en Chile.</p>

      <p>Vi que {nombre_empresa} opera en el sector de {rubro} y me surgió una pregunta:
      ¿tienen un proceso definido para revisar que sus registros contables sean consistentes
      con sus operaciones reales?</p>

      <p>La mayoría de las empresas del sector no lo tienen — no por descuido, sino porque
      sus contadores revisan números pero nadie revisa si los procesos que generan esos números
      están bien diseñados. Esa brecha es costosa y silenciosa.</p>

      <p>Si le interesa explorar esto en <strong>30 minutos sin costo ni compromiso</strong>,
      puede agendar directamente acá:<br>
      <a href="https://app.cal.com/matiasbalbontin">https://app.cal.com/matiasbalbontin</a></p>

      <p>Saludos,<br>
      <strong>Matías Balbontín</strong><br>
      Proaudita | Auditoría estratégica. Resultados medibles.<br>
      +56 9 9438 8261 | proaudita.cl</p>

      <p style="font-size: 12px; color: #999; margin-top: 30px;">
      Si no desea recibir más mensajes de Proaudita, responda con "NO CONTACTAR".
      </p>
    </div>
    """


def enviar_email(destinatario_email: str, nombre_empresa: str, rubro: str) -> bool:
    if not RESEND_API_KEY:
        print(f"  Sin RESEND_API_KEY — omitiendo {destinatario_email}")
        return False

    payload = {
        "from": REMITENTE,
        "to": [destinatario_email],
        "subject": generar_asunto(nombre_empresa),
        "html": generar_cuerpo_html(nombre_empresa, rubro),
        "reply_to": "matias@proaudita.cl",
    }
    resp = requests.post(
        "https://api.resend.com/emails",
        json=payload,
        headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
        timeout=15,
    )
    return resp.status_code == 200


def procesar_csv(archivo_csv: str, modo: str = "inicial") -> None:
    """
    modo "inicial" → envía email_1 a prospectos sin contacto previo
    modo "seguimiento" → envía email_2 a prospectos con email_1 pero sin respuesta (>5 días)
    """
    with open(archivo_csv, "r", encoding="utf-8") as f:
        leads = list(csv.DictReader(f))

    hoy = datetime.today().strftime("%Y-%m-%d")
    enviados = 0

    candidatos = []
    for lead in leads:
        if lead.get("estado") in ("respondio", "reunion_agendada", "descartado"):
            continue
        if modo == "inicial" and not lead.get("fecha_email_1"):
            candidatos.append(lead)
        elif modo == "seguimiento" and lead.get("fecha_email_1") and not lead.get("fecha_email_2"):
            from datetime import date
            fecha_e1 = datetime.strptime(lead["fecha_email_1"], "%Y-%m-%d").date()
            dias = (date.today() - fecha_e1).days
            if dias >= 5:
                candidatos.append(lead)

    # Ordenar por score descendente
    candidatos.sort(key=lambda x: int(x.get("score", 0)), reverse=True)
    candidatos = candidatos[:MAX_EMAILS_POR_DIA]

    print(f"Enviando {len(candidatos)} emails ({modo})...")

    for lead in candidatos:
        if enviados >= MAX_EMAILS_POR_DIA:
            break
        print(f"  → {lead['nombre']} <{lead['email']}>")
        ok = enviar_email(lead["email"], lead["nombre"], lead["rubro"])
        if ok:
            if modo == "inicial":
                lead["fecha_email_1"] = hoy
            else:
                lead["fecha_email_2"] = hoy
            lead["estado"] = "contactado"
            enviados += 1
            time.sleep(DELAY_ENTRE_EMAILS)
        else:
            print(f"    Error al enviar — saltando")

    # Reescribir CSV con fechas actualizadas
    if enviados > 0:
        campos = leads[0].keys()
        with open(archivo_csv, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=campos)
            writer.writeheader()
            writer.writerows(leads)
        print(f"\n{enviados} emails enviados. CSV actualizado.")
    else:
        print("Sin emails enviados.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Envío de emails fríos — Proaudita")
    parser.add_argument("csv", help="Archivo CSV de leads")
    parser.add_argument(
        "--modo",
        choices=["inicial", "seguimiento"],
        default="inicial",
        help="inicial: primer contacto | seguimiento: 5 días sin respuesta",
    )
    args = parser.parse_args()
    procesar_csv(args.csv, args.modo)
