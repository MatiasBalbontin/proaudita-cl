---
name: sii-api
description: Skill para interactuar con los servicios web del SII chileno — consultas de RUT, estado de folios DTE, consulta de facturas en portal proveedores, y APIs públicas disponibles. Cubre autenticación, endpoints y limitaciones.
---

# Skill: sii-api

Cuando esta skill está activa, puedes razonar sobre cómo conectarse a los servicios del SII para automatizar consultas y validaciones contables.

## Estado de las APIs del SII

El SII no ofrece una API REST pública y documentada al estilo moderno. Sus servicios web son SOAP/XML legacy. Existen algunas URLs públicas sin autenticación para consultas básicas.

**Autenticación para servicios avanzados:** Certificado digital (.pfx o .p12) emitido por una CA autorizada por el SII (ej: E-Certchile, FirmaVirtual). Las empresas tienen certificado propio para emitir DTE.

---

## Servicios disponibles sin autenticación (públicos)

### 1. Validación de RUT

```python
import requests

def validar_rut(rut: str) -> dict:
    """
    rut: formato '12345678-9' (sin puntos)
    """
    url = "https://zeus.sii.cl/cvc_cgi/stc/getstc"
    params = {"RUT": rut.replace("-", ""), "PRG": "STC", "OPC": "NOR"}
    resp = requests.get(url, params=params, timeout=10)
    # Parsear HTML response — el SII devuelve HTML, no JSON
    return {"status": resp.status_code, "content": resp.text[:200]}
```

> El SII no ofrece validación de RUT por API JSON. Usar librerías de validación local es más confiable.

### 2. Validación de RUT — local (preferida)

```python
def validar_rut_local(rut: str) -> bool:
    """Valida RUT chileno sin llamada externa."""
    rut = rut.upper().replace(".", "").replace("-", "")
    if len(rut) < 2:
        return False
    cuerpo, dv = rut[:-1], rut[-1]
    if not cuerpo.isdigit():
        return False
    suma = 0
    multiplo = 2
    for d in reversed(cuerpo):
        suma += int(d) * multiplo
        multiplo = 9 if multiplo == 7 else multiplo + 1
    resto = 11 - (suma % 11)
    dv_calculado = "0" if resto == 11 else ("K" if resto == 10 else str(resto))
    return dv == dv_calculado
```

---

## Servicios con autenticación (certificado digital)

### Consulta de DTE emitidos (Registro de Compras y Ventas)

El SII ofrece acceso al RCV (Registro de Compras y Ventas) via Web Services SOAP.

```python
import zeep  # pip install zeep
from lxml import etree

# Endpoints del SII
WSDL_AUTENTICACION = "https://palena.sii.cl/DTEWS/CrSeed.jws?WSDL"
WSDL_RCV = "https://palena.sii.cl/DTEWS/services/wsRCV?WSDL"

def obtener_semilla() -> str:
    client = zeep.Client(WSDL_AUTENTICACION)
    resp = client.service.getSeed()
    # resp es XML — extraer la semilla
    root = etree.fromstring(resp.encode())
    return root.find(".//SEMILLA").text

# El flujo completo requiere:
# 1. Obtener semilla (getSeed)
# 2. Firmar la semilla con el certificado digital de la empresa
# 3. Obtener token (getToken) con la semilla firmada
# 4. Usar el token en llamadas posteriores
```

### Librería recomendada: python-sii

```bash
pip install python-sii
```

```python
# Ofrece abstracción sobre los SOAP services del SII
# Documentación: https://github.com/nicowillis/python-sii (verificar estado)
```

---

## Validaciones útiles sin API

### Verificar que un DTE es válido

El SII permite verificar DTEs en: `https://maullin.sii.cl/cgi_dte/UF_Valid_DTE.cgi`

Para scraping básico de esta validación:

```python
def verificar_dte(rut_emisor: str, tipo_dte: int, folio: int, fecha: str, monto: int, rut_receptor: str) -> bool:
    """Verifica DTE en portal SII. Requiere Selenium o Playwright para el captcha."""
    # El portal SII tiene captcha — no es automatizable de forma confiable
    # Alternativa: usar el XML del DTE y validar su firma digital localmente
    raise NotImplementedError("Verificación online requiere manejo de captcha")
```

### Validar firma del DTE (XML)

```python
from lxml import etree
from xmlsec import verify  # pip install xmlsec lxml

def validar_firma_dte(xml_dte: str) -> bool:
    """Verifica la firma digital del DTE XML."""
    root = etree.fromstring(xml_dte.encode())
    # El DTE usa xmldsig — xmlsec puede verificar la firma
    # Requiere el certificado público del emisor
    pass  # Implementar según librería xmlsec
```

---

## Automatizaciones útiles para Proaudita

### 1. Scraper del portal proveedores del SII

Para clientes que necesitan extraer su RCV (requiere credenciales del cliente):

```python
from playwright.async_api import async_playwright

async def extraer_rcv_sii(rut: str, clave: str, periodo: str) -> dict:
    """
    Extrae el Registro de Compras y Ventas del portal SII.
    periodo: 'YYYY-MM' ej: '2026-07'
    IMPORTANTE: Las credenciales son del cliente — nunca almacenarlas.
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://homer.sii.cl/")
        await page.fill("#rut", rut)
        await page.fill("#clave", clave)
        await page.click("button[type=submit]")
        # Navegar al RCV y extraer tabla
        # ... (implementar según estructura actual del portal)
        await browser.close()
```

> Usar con consentimiento explícito del cliente. Las credenciales SII son personales e intransferibles.

### 2. Verificador de calendario de vencimientos

```python
from datetime import date, timedelta

CALENDARIO_F29_2026 = {
    1: date(2026, 2, 12),
    2: date(2026, 3, 12),
    3: date(2026, 4, 13),
    4: date(2026, 5, 12),
    5: date(2026, 6, 12),
    6: date(2026, 7, 13),
    7: date(2026, 8, 12),
    8: date(2026, 9, 12),
    9: date(2026, 10, 13),
    10: date(2026, 11, 12),
    11: date(2026, 12, 12),
    12: date(2027, 1, 12),
}

def dias_para_proximo_f29() -> int:
    hoy = date.today()
    mes_actual = hoy.month
    vencimiento = CALENDARIO_F29_2026.get(mes_actual)
    if vencimiento and vencimiento >= hoy:
        return (vencimiento - hoy).days
    # Buscar el próximo
    for mes in range(mes_actual + 1, 13):
        v = CALENDARIO_F29_2026.get(mes)
        if v and v >= hoy:
            return (v - hoy).days
    return -1  # Ya pasaron todos los del año
```

---

## Limitaciones importantes

- El SII bloquea IPs que hacen demasiadas requests en poco tiempo
- Usar delays de al menos 2 segundos entre requests al portal
- Los endpoints SOAP del SII cambian sin previo aviso — siempre verificar vigencia
- Para producción, contratar un proveedor DTE certificado (Nubox, Defontana, Acepta) es más confiable que integración directa
