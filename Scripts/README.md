# Scripts — Proaudita

Scripts de automatización para operación, marketing y conexión con herramientas externas.

## Estructura

```
Scripts/
├── scraping/         → scraping de prospectos (Google Maps, webs, directorios)
├── nubox-api/        → integración con API de Nubox para extracción y análisis
└── email/            → automatización de envío de emails fríos y seguimientos
```

## Scripts existentes (externos a este repo)

Base de scraping disponible en:
`C:\Users\matia\OneDrive\Escritorio\Scrap\`
- `call_apify.py` — extrae datos de Google Maps via Apify
- `mailer_leads.py` — envía emails a los leads extraídos

**Estado:** funcional en estructura básica. Requiere actualización de CIUDADES, RUBROS, template de email y filtros de calidad. Ver `scraping/instrucciones-actualizacion.md`.

## Variables de entorno necesarias

Crear `.env` en la raíz de `Scripts/` (no commitear):

```bash
# Apify
APIFY_API_TOKEN=xxx

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=matias@proaudita.cl
SMTP_PASS=xxx

# Resend (alternativa a SMTP directo)
RESEND_API_KEY=xxx

# Nubox
NUBOX_CLIENT_ID=xxx
NUBOX_CLIENT_SECRET=xxx
NUBOX_EMPRESA_RUT=xxx

# Notificaciones
NOTIFY_EMAIL=matiasrbalbontin@gmail.com
```

## Reglas de seguridad

- NUNCA commitear `.env` ni credenciales
- `.gitignore` ya cubre `*.env` y `.env*`
- Para producción, usar GitHub Actions Secrets o variables de entorno de Railway/DigitalOcean
