---
name: nubox
description: Skill para trabajar con Nubox — software ERP/contable chileno. Cubre módulos, flujos de datos, integración API y uso en el contexto de proyectos de Proaudita.
---

# Skill: nubox

Cuando esta skill está activa, puedes razonar sobre la plataforma Nubox, sus módulos, su API y cómo se usa en el contexto de auditorías y automatizaciones de Proaudita.

## Qué es Nubox

Nubox es un software ERP/contable chileno en la nube, muy usado por pymes y empresas medianas en Chile. Cubre contabilidad, facturación electrónica, remuneraciones, inventario y más.

**Sitio oficial:** https://www.nubox.com
**Estado API:** Nubox tiene una API REST. La documentación es para clientes con plan compatible.

## Módulos principales de Nubox

| Módulo | Qué hace |
|---|---|
| Contabilidad | Libro diario, mayor, balance, estado de resultados |
| Facturación | Emisión y recepción de DTE (integrado con SII) |
| Remuneraciones | Liquidaciones, finiquitos, libro de remuneraciones |
| Inventario | Control de stock, valorización FIFO/Promedio |
| Tesorería | Flujo de caja, cuentas por cobrar/pagar |
| Reportes | Balance, EEFF, reportes SII, libros auxiliares |

## Flujos más relevantes para auditoría Proaudita

### Revisión de registros contables
1. Exportar libro diario (CSV o Excel) desde Módulo Contabilidad > Reportes
2. Verificar que los asientos estén correctamente cuadrados (Debe = Haber)
3. Cruzar con comprobantes de respaldo (facturas, boletas)
4. Revisar cuentas de control: CxC, CxP, IVA CF, IVA DF

### Revisión de facturación
1. Exportar registro de compras y ventas
2. Cruzar con el F29 declarado ese período
3. Identificar facturas sin registro contable o facturas rechazadas
4. Verificar notas de crédito correctamente emitidas y contabilizadas

### Exportación de datos para análisis
- Contabilidad > Reportes > Libro Diario > Exportar Excel
- Facturación > Libros > Registro de Ventas/Compras > Exportar
- Remuneraciones > Libro de Remuneraciones > Exportar

## API Nubox (para automatizaciones)

La API REST de Nubox permite:
- Consultar cuentas contables
- Crear y consultar asientos
- Emitir y consultar DTE (facturas, boletas)
- Consultar documentos de proveedores y clientes

**Autenticación:** OAuth 2.0 (client_credentials)
**Base URL:** `https://api.nubox.com/v1/` (confirmar en documentación del cliente)

### Estructura básica de llamada API

```python
import requests

# Auth
token_response = requests.post(
    "https://api.nubox.com/oauth/token",
    data={
        "grant_type": "client_credentials",
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
    }
)
token = token_response.json()["access_token"]

# Headers estándar
headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json",
    "X-Company-RUT": RUT_EMPRESA,  # RUT sin puntos, con guión
}
```

### Endpoints clave (verificar versión actual con cliente)

```
GET  /empresas                    → lista empresas del usuario
GET  /contabilidad/cuentas        → plan de cuentas
GET  /contabilidad/asientos       → libro diario (con filtros de fecha)
GET  /facturacion/documentos      → DTE emitidos y recibidos
GET  /remuneraciones/liquidaciones → liquidaciones del período
```

## Variables de entorno para scripts con Nubox

```bash
NUBOX_CLIENT_ID=xxx
NUBOX_CLIENT_SECRET=xxx
NUBOX_EMPRESA_RUT=12345678-9   # sin puntos, con guión
```

## Limitaciones conocidas

- No todas las pymes tienen API habilitada — requiere plan específico
- La documentación oficial puede estar desactualizada — siempre validar con el equipo de Nubox
- Las exportaciones masivas tienen límite de registros por request (paginar con offset/limit)
- El RUT de la empresa debe estar en formato chileno: `XXXXXXXX-X`

## Alternativas que pueden existir en los clientes

- **Defontana:** más completo, más caro, más grande empresas
- **Bsale:** muy usado en retail y gastronómica
- **Siigo (ex ContaPyme):** popular en algunas regiones
- **Excel puro:** aún frecuente en microempresas — en ese caso, el proyecto es de migración + auditoría
