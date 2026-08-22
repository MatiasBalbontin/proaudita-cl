# Correo corporativo — matiasbalbontin@proaudita.cl

## Opción recomendada: Cloudflare Email Routing (gratis)

**Qué hace:** redirige todo el correo que llegue a `matiasbalbontin@proaudita.cl` a tu Gmail
(`matiasrbalbontin@gmail.com`). Recibes en Gmail, respondes desde Gmail, costo cero.

**Limitación:** para que el destinatario vea `matiasbalbontin@proaudita.cl` como remitente
al responder, debes configurar "Enviar como" en Gmail (paso 3 abajo).

---

### Paso 1 — Activar Cloudflare Email Routing

1. Entra a [dash.cloudflare.com](https://dash.cloudflare.com) → selecciona `proaudita.cl`
2. Menú izquierdo → **Email** → **Email Routing**
3. Clic **Enable Email Routing** — Cloudflare agrega automáticamente los registros MX al DNS
4. En **Routing Rules** → **Create address**:
   - Address: `matiasbalbontin`
   - Action: **Send to** → `matiasrbalbontin@gmail.com`
5. Confirma en Gmail el email de verificación que llega

**Resultado:** cualquier correo a `matiasbalbontin@proaudita.cl` llega a tu Gmail.

---

### Paso 2 — Configurar SPF/DKIM para envío (ya hecho si Resend está activo)

Resend ya requiere que agregues registros DNS para `proaudita.cl`. Si los configuraste
al activar Resend, el dominio ya tiene SPF y DKIM. Verifica en Cloudflare DNS que existan:

```
TXT  @   "v=spf1 include:_spf.resend.com ~all"
CNAME    resend._domainkey  →  (el valor que te dio Resend)
```

Si faltan, ir a [resend.com/domains](https://resend.com/domains) y seguir las instrucciones.

---

### Paso 3 — Enviar desde Gmail como matiasbalbontin@proaudita.cl

Para que el campo "De:" muestre tu correo corporativo al responder:

1. Gmail → Configuración (engranaje) → **Ver toda la configuración**
2. Pestaña **Cuentas e importación** → **Enviar correo como** → **Añadir otra dirección**
3. Nombre: `Matías Balbontín`, Dirección: `matiasbalbontin@proaudita.cl`
4. Servidor SMTP: usa **smtp.resend.com**
   - Puerto: 465 (SSL)
   - Usuario: `resend`
   - Contraseña: tu `RESEND_API_KEY`
5. Verificar → Gmail envía un código al correo → llega a tu Gmail vía Cloudflare → ingresas el código
6. Listo. Puedes seleccionar qué dirección usar al redactar

---

### Alternativa de pago: Google Workspace

Si necesitas calendario compartido, Drive corporativo o múltiples usuarios:

- [workspace.google.com](https://workspace.google.com) → Plan Business Starter
- Costo: USD $6/usuario/mes
- Incluye: Gmail, Calendar, Drive, Meet con dominio propio
- Setup: agregar registros MX de Google en Cloudflare DNS

No lo necesitas ahora. Cloudflare + Resend cubre el 100% de lo que necesitas en esta etapa.

---

## Resumen rápido

| Paso | Plataforma | Tiempo estimado |
|---|---|---|
| 1. Email routing (recibir) | Cloudflare | 10 min |
| 2. Verificar SPF/DKIM | Resend dashboard | 5 min |
| 3. Enviar como (Gmail) | Gmail settings | 10 min |

**Total: ~25 minutos. Costo: $0.**
