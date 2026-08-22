# Seguimiento Automático de Leads — Diseño

## Flujo de seguimiento

```
Email frío día 0
    └─ Sin respuesta día 5 → Email seguimiento #1
        └─ Sin respuesta día 10 → WhatsApp (si tiene número)
            └─ Sin respuesta día 20 → Archivar (no molestar más)
    └─ Respuesta → Agendar diagnóstico → flujo de procedimientos
```

## Lógica del script (a implementar)

El script necesita llevar un registro en CSV o SQLite de:

| Campo | Descripción |
|---|---|
| empresa | Nombre de la empresa |
| email | Email del contacto |
| telefono | Teléfono (para WhatsApp) |
| fecha_email_1 | Cuándo se envió el primer email |
| fecha_email_2 | Cuándo se envió el seguimiento |
| fecha_whatsapp | Cuándo se intentó WhatsApp |
| estado | prospecto / contactado / respondio / reunion_agendada / descartado |
| notas | Observaciones manuales |

## Herramientas para implementar

**Opción simple:** Python + CSV + `smtplib` / Resend
**Opción robusta:** n8n con nodos de email + registro en Airtable o Google Sheets

## Restricciones legales (Chile)

- La Ley 19.628 protege datos personales. No almacenar más datos de los necesarios.
- Email frío B2B tiene menor restricción que B2C, pero siempre dar opción de darse de baja.
- Incluir en cada email: "Si no desea recibir más mensajes de Proaudita, responda con 'NO CONTACTAR'."
- Respetar las solicitudes de opt-out dentro de 48 horas.
