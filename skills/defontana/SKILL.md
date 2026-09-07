---
name: defontana
description: Skill para trabajar con Defontana — ERP contable chileno de nivel enterprise. Cubre módulos, flujos de datos, exportaciones para auditoría, y diferencias clave con Nubox.
---

# Skill: defontana

Cuando esta skill está activa, puedes razonar sobre la plataforma Defontana, cómo extraer datos para auditoría, y cómo se diferencia de Nubox en el contexto de clientes de Proaudita.

## Qué es Defontana

Defontana es un ERP chileno en la nube, orientado a empresas medianas y grandes. Más completo y más caro que Nubox. Común en empresas con más de 50 empleados y procesos más complejos.

**Sitio oficial:** https://www.defontana.com

## Módulos relevantes para auditoría

| Módulo | Qué contiene | Relevancia para Proaudita |
|---|---|---|
| Contabilidad General | Libro diario, mayor, balance, EEFF | Alta — base de toda auditoría |
| Cuentas por Cobrar | Facturas emitidas, cobros, conciliación | Alta |
| Cuentas por Pagar | Facturas recibidas, pagos, conciliación | Alta |
| Tesorería | Flujo de caja, cuentas bancarias | Media |
| Remuneraciones | Liquidaciones, finiquitos, libro de REM | Alta |
| Inventario | Stock, valorización, movimientos | Media — según rubro |
| Activo Fijo | Bienes, depreciación, bajas | Media — para tax advisory |
| Facturación / DTE | Emisión y recepción de documentos tributarios | Alta |

## Cómo exportar datos para análisis externo

### Libro diario (Contabilidad General)

```
Menú: Contabilidad → Libro Diario → Rango de fechas → Exportar Excel
```

El export incluye: fecha, número de asiento, cuenta contable, glosa, debe, haber, centro de costo.

### Registro de compras y ventas

```
Menú: Facturación → Registros → Compras o Ventas → Período → Exportar
```

Formato: Excel con RUT emisor/receptor, tipo DTE, folio, fecha, monto neto, IVA, total.

### Libro de remuneraciones

```
Menú: Remuneraciones → Reportes → Libro de Remuneraciones → Mes → Excel
```

### Balance y estado de resultados

```
Menú: Contabilidad → Balance → Período → PDF o Excel
```

## API Defontana

Defontana tiene API REST documentada para clientes con plan enterprise.

**Documentación:** disponible en el portal de desarrolladores de Defontana (requiere credenciales).

**Autenticación:** API Key por empresa. El cliente debe generar la key en su panel.

```python
import requests

DEFONTANA_API_KEY = "xxx"  # Provista por el cliente
DEFONTANA_BASE_URL = "https://api.defontana.com/api"

headers = {
    "Authorization": f"Bearer {DEFONTANA_API_KEY}",
    "Content-Type": "application/json",
}

# Ejemplo: obtener libro diario
params = {
    "fechaDesde": "2026-01-01",
    "fechaHasta": "2026-06-30",
    "pagina": 1,
    "porPagina": 500,
}
resp = requests.get(
    f"{DEFONTANA_BASE_URL}/contabilidad/libro-diario",
    headers=headers,
    params=params,
    timeout=30,
)
resp.raise_for_status()
asientos = resp.json()["data"]
```

## Defontana vs Nubox — diferencias clave para auditoría

| Aspecto | Defontana | Nubox |
|---|---|---|
| Tamaño de empresa típica | 50-500 empleados | 5-100 empleados |
| Módulos | ERP completo | Contabilidad + facturación |
| API | Más completa | Básica |
| Multiempresa | Sí, nativo | Limitado |
| Auditoría de activo fijo | Módulo dedicado | Manual |
| Centros de costo | Multi-nivel | Básico |
| Flujo de aprobaciones | Configurable | No |
| Costo mensual aprox. | $150-400 USD | $30-80 USD |

## Señales de que el cliente usa Defontana mal

- Centros de costo no configurados (todos los gastos van a un solo CC)
- Módulo de activo fijo con bienes sin depreciar o con fechas incorrectas
- Integración DTE configurada pero facturas se cargan manualmente igual
- Módulo de remuneraciones no conectado con contabilidad → partida doble manual
- Usuarios con acceso total aunque solo deberían ver ciertos módulos (control interno)

## Preguntas de diagnóstico para cliente con Defontana

1. ¿Tienen configurados centros de costo? ¿Cuántos?
2. ¿El módulo de remuneraciones genera los asientos contables automáticamente?
3. ¿Quién tiene acceso de administrador y cuántas personas tienen acceso total?
4. ¿El activo fijo está al día? ¿Cuándo fue la última baja registrada?
5. ¿Las facturas de proveedores se cargan automáticamente desde DTE o alguien las ingresa manualmente?
