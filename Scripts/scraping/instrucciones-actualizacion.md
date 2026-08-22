# Scraping de Prospectos — Instrucciones de Actualización

## Base existente

`C:\Users\matia\OneDrive\Escritorio\Scrap\call_apify.py` — extrae negocios de Google Maps via Apify Actor "Google Maps Scraper".

## Cambios necesarios antes de usar

### 1. CIUDADES (actualizar en call_apify.py)

```python
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
]
```

### 2. RUBROS / SECTORES OBJETIVO (actualizar en call_apify.py)

```python
RUBROS = [
    "constructora",
    "empresa constructora",
    "clínica privada",
    "centro médico",
    "hotel",
    "inmobiliaria",
    "empresa de servicios",
    "consultora",
    "transporte y logística",
    "distribuidora",
    "empresa de servicios profesionales",
]
```

### 3. Filtros de calidad (agregar en el script)

```python
def cumple_filtros(empresa):
    return (
        empresa.get("rating", 0) >= 3.5
        and empresa.get("website")  # tiene sitio web
        and empresa.get("email")    # tiene email visible
        and len(empresa.get("reviews", [])) >= 5  # mínimo 5 reseñas
    )
```

### 4. Campo de score (agregar)

```python
def calcular_score(empresa):
    score = 0
    if empresa.get("website"): score += 3
    if empresa.get("email"): score += 3
    reviews = len(empresa.get("reviews", []))
    if reviews >= 20: score += 3
    elif reviews >= 10: score += 2
    elif reviews >= 5: score += 1
    rating = empresa.get("rating", 0)
    if rating >= 4.5: score += 2
    elif rating >= 4.0: score += 1
    return score
```

### 5. Template de email (actualizar en mailer_leads.py)

Ver template completo en `../email-frio/template-base.md` en `marketing + ads/`.

Asunto: `{nombre_empresa} — consulta sobre procesos contables`

### 6. Límite de envío

```python
MAX_EMAILS_POR_DIA = 20  # No superar para evitar spam
```

## Automatización semanal

**Opción A — GitHub Actions:**

```yaml
# .github/workflows/scraping-semanal.yml
name: Scraping semanal de prospectos
on:
  schedule:
    - cron: '0 9 * * 1'  # Lunes 9:00 AM Chile (UTC-3 → 12:00 UTC)
jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r Scripts/scraping/requirements.txt
      - run: python Scripts/scraping/call_apify.py
        env:
          APIFY_API_TOKEN: ${{ secrets.APIFY_API_TOKEN }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          NOTIFY_EMAIL: ${{ secrets.NOTIFY_EMAIL }}
```

**Opción B — n8n en Railway:**
- Crear workflow con nodo "Schedule" (cron `0 9 * * 1`)
- Nodo "Execute Command" → `python scraping/call_apify.py`
- Nodo "Email" → notificación de resultado

## Output esperado

CSV semanal con columnas:
```
nombre, rubro, ciudad, telefono, email, sitio_web, rating, n_reviews, score
```

Ordenado por `score DESC`. Los primeros 20 son los que se contactan esa semana.
