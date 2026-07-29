# Proaudita — Contexto de proyecto

## Marca

**Nombre:** Proaudita
**Dominio:** proaudita.cl
**Tagline:** "Auditoría estratégica. Resultados medibles."
**Posicionamiento:** Firma de auditoría, tributación y consultoría de procesos para
empresas grandes y medianas. Compite por percepción directa con Deloitte y PwC —
foco exclusivamente privado, sin sector público.
**Diferenciador central:** Equipo con base en auditoría, ingeniería y transformación
digital — auditoría con visión técnica, no solo normativa.

---

## Liderazgo

**Nombre:** Matías Rodrigo Balbontín Gaete
**Rol:** Socio Fundador y CEO

### Credenciales (en orden de presentación)

| Credencial | Institución | Año |
|---|---|---|
| Contador Auditor | Universidad de Concepción | 2024 |
| Ingeniería en Informática | (en proceso) | — |
| Digital Transformation Management | UNAB + Arizona State University (W.P. Carey) | 2026 |
| Dirección y Gestión de Proyectos | Universidad Nacional de Córdoba (edX) | 2022 |

### Capacidades técnicas (para sección de perfil)
- IA y datos: IBM Granite, IBM SkillsBuild
- Cloud: Microsoft Azure
- Programación: Python
- Bases de datos: Database Foundations (IBM)

**Nota:** No presentar como "Ingeniero en Informática" (título no obtenido aún). Usar "Ingeniería en Informática" como campo de formación.

---

## Áreas de práctica

Los servicios se presentan como 4 practice areas, estilo firma de auditoría:

### 01 — Auditoría & Assurance
1. **Auditoría de procesos y gestión** — evaluación independiente de flujos
   operacionales y controles internos.
2. **Diagnóstico contable-financiero** — revisión del estado contable y financiero,
   plan de regularización con hallazgos priorizados.

### 02 — Tax Advisory
3. **Planificación tributaria** — optimización de la carga tributaria dentro del
   marco legal chileno.

### 03 — Compliance & Reporting
4. **Contabilidades completas** — administración contable externalizada, recurrente.

### 04 — Consultoría Tecnológica
5. **Automatización de flujos de trabajo** — diseño e implementación de
   automatización de procesos operativos y de reporte.

**Nota de modelo de negocio:** Compliance & Reporting (contabilidad recurrente)
aporta ingreso estable. Auditoría & Assurance y Consultoría Tecnológica son los de
mayor diferenciación y ticket.

---

## Mercado objetivo

**Posicionamiento del sitio:** empresas privadas grandes y medianas en Chile que
necesitan auditoría, cumplimiento tributario o consultoría de procesos con
estándares de firma profesional. Sin foco en sector público — decisión explícita
para no diluir el posicionamiento frente a Deloitte/PwC.

**Alcance geográfico:** Chile (mercado nacional).

**Descartado:** Sector público (municipios, organismos), partidos políticos.

---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `--color-primary` | `#0019FF` | Azul eléctrico — acento principal, CTAs |
| `--color-secondary` | `#1A1A5E` | Navy profundo — texto de autoridad, logo |
| `--color-bg` | `#FFFFFF` | Fondo principal |
| `--color-surface` | `#F5F7FA` | Fondo de secciones alternadas |
| `--color-text` | `#0D0D2B` | Texto base |
| `--color-text-muted` | `#6B7280` | Texto secundario |

---

## Tipografía

- **Headings:** Space Grotesk (Google Fonts) — geométrica, moderna, autoridad sin frialdad
- **Body:** Inter — legible, profesional, estándar web
- **Logo:** Space Grotesk Semi-Bold, gradiente `#0019FF` → `#1A1A5E`. Las imágenes compartidas son referencias de dirección solamente — NO son el logo oficial. El logo final se construye desde cero en SVG/código.
- **Monograma:** "pa" en Space Grotesk — usar como favicon e ícono. También requiere construcción desde cero.

---

## Contacto y conversión

| Canal | Detalle |
|---|---|
| Formulario web | Nombre, empresa, email, descripción del desafío — CTA principal |
| Cal.com | https://app.cal.com/matiasbalbontin — opción secundaria discreta |
| WhatsApp | +56 9 9438 8261 — opción secundaria discreta, sin botón flotante global |

**CTA principal:** "Solicitar una reunión" → ancla al formulario de contacto
(`#contacto`), no directo a Cal.com.

---

## Estructura del sitio (fase 1)

**One-page con anchors.** Tech: Next.js + Vercel.

| Sección | Anchor | Contenido |
|---|---|---|
| Hero | `#inicio` | Tagline, subtítulo, CTA principal |
| Servicios | `#servicios` | 3 cards de servicio con descripción |
| Perfil | `#perfil` | Bio, credenciales, capacidades técnicas |
| Contacto | `#contacto` | Formulario + WhatsApp + Cal.com |

**Navegación:** sticky header con logo + links de anchor + CTA "Agendar"

---

## Casos de éxito

**Ninguno en fase 1.** Se agrega cuando exista el primer cliente documentado.

---

## Roadmap de fases

| Fase | Qué se agrega |
|---|---|
| 1 — Presencia (ahora) | One-page, credibilidad, contacto |
| 2 — Autoridad + captación | Blog/insights, páginas por servicio, SEO, automatización RRSS, scraping semanal de prospectos, completación de perfiles digitales |
| 3 — Recursos | Recursos descargables, lead magnets, plantillas |
| 4 — Plataforma | Portal de cliente, reportes en tiempo real, herramientas propias |

---

## Plan de captación de leads

### Flujo completo

```
INBOUND                          OUTBOUND
─────────────────────────────    ─────────────────────────────
LinkedIn post/artículo           Scraper semanal Google Maps
       ↓                                    ↓
  Visita perfil              CSV priorizado (rating ≥ 3.5 + email)
       ↓                                    ↓
  Visita sitio             Email frío personalizado (mailer_leads.py)
       ↓                                    ↓
  ┌────────────────────────────────────────┐
  │         SITIO proaudita.cl             │
  │  CTA 1: Agendar diagnóstico (Cal.com)  │
  │  CTA 2: Escribir por WhatsApp          │
  │  CTA 3: Formulario de contacto         │
  └────────────────────────────────────────┘
                    ↓
         Reunión diagnóstico (30 min)
                    ↓
            Propuesta + cierre
```

### Canal 1 — Inbound (LinkedIn + contenido)
- Publicación semanal en LinkedIn: tips tributarios, insights de auditoría, normativa SII/Contraloría, casos de optimización genéricos
- Objetivo: posicionamiento como experto → visitas al sitio → agendamiento
- Automatización: n8n o Buffer para programar publicaciones
- Métrica: visitas al sitio desde LinkedIn, clics en CTA "Agendar"

### Canal 2 — Outbound (scraping semanal)
- Script Google Maps corre cada lunes (GitHub Actions cron)
- Rubros objetivo: constructoras, clínicas, hoteles, inmobiliarias, empresas de servicios profesionales — sectores con necesidad real de auditoría contable/procesos
- Filtros de calidad: rating ≥ 3.5 + tiene sitio web + tiene email
- Output: CSV priorizado por score
- Email frío: mailer_leads.py, máx 20 correos/día, template con posicionamiento Proaudita
- Seguimiento: si no responde en 5 días → WhatsApp si tiene número
- Métrica: tasa de respuesta, reuniones agendadas desde email frío

### Canal 3 — SEO (fase 2)
- Blog con artículos orientados a búsquedas del mercado chileno
- Keywords prioritarias: "auditoría de procesos empresas Chile", "planificación tributaria pymes Chile", "automatización contable Chile"
- Objetivo: tráfico orgánico de largo plazo hacia el sitio

### Conversión en el sitio (los 3 CTAs)
- **CTA principal:** "Agendar diagnóstico gratuito" → Cal.com 30 min (reunión sin costo, sin compromiso)
- **CTA secundario:** Botón WhatsApp flotante para contacto inmediato
- **CTA terciario:** Formulario para quienes prefieren dejar sus datos sin agendar de inmediato
- El formulario envía notificación a email de Matías + guarda en registro

### Seguimiento post-primer contacto
- Dentro de 24h: confirmación de reunión o respuesta al formulario
- Post-reunión: propuesta enviada dentro de 48h
- Sin respuesta a propuesta en 5 días: seguimiento por WhatsApp

---

### Detalle fase 2 — Captación automatizada
- **SEO:** metadata completa, schema markup, Google Business Profile, blog orientado a keywords chilenos
- **RRSS:** calendario editorial LinkedIn (B2B principal), posts automatizados vía n8n o Buffer — tips tributarios, insights de auditoría, normativa SII/Contraloría
- **Scraping semanal de prospectos:** script Python + GitHub Actions que detecta municipios en ChileCompra, empresas con señales de necesidad contable, organizaciones con financiamiento público activo — output en CSV semanal
- **Perfiles:** LinkedIn y Cal.com actualizados con posicionamiento Proaudita

---

## Skills de Claude Code para revisar post-build

Ejecutar en Claude Code una vez el sitio esté construido:
- `/impeccable` — polish de UI
- `review my UI` — auditoría con `vercel-web-design-guidelines`
- `vercel-react-best-practices` — revisión de código Next.js
- `frontend-design` — diseño de componentes (Anthropic, pública)

---

## Pizarra de pendientes (no bloquean el lanzamiento)

- [ ] **Foto profesional** — para sección de perfil (placeholder mientras tanto)
- [ ] **Actualizar Cal.com** — bio en español con posicionamiento correcto. Actual: "Audit Accountant, Software and AI Engineer" → propuesta: "Contador Auditor · Ingeniería en Informática | Auditoría estratégica de procesos y recursos"
- [ ] **Actualizar LinkedIn** — URL a confirmar, incluir en sitio cuando esté actualizado
- [ ] **WhatsApp Business** — configurar cuenta Business con nombre Proaudita en el +56 9 9438 8261

---

## Decisiones registradas

| Decisión | Opción elegida | Alternativa descartada |
|---|---|---|
| Cliente prioritario | Espectro completo (público y privado, sin priorizar municipios) | Municipios como prioridad, partidos políticos |
| Estructura sitio | One-page | Multi-page |
| Tech | Next.js + Vercel | WordPress, HTML estático |
| Estética | Institucional moderno + toque tech | Cálido boutique, full tech minimalista |
| Contacto | Formulario + WhatsApp + Cal.com (Cal.com como CTA dominante) | Solo formulario, solo teléfono, CTAs con igual peso visual |
| Casos de éxito | Ninguno en lanzamiento | Casos genéricos fabricados |
| Assets de marca | Vectorizado en SVG/código a partir de dirección de marca propia (ver `assets/ASSETS.md`) | Reutilizar plantillas existentes, imagen rasterizada pegada |
| Posicionamiento | Firma enterprise (vs. Deloitte/PwC) | Marca personal independiente |
| Mercado objetivo | Empresas grandes/medianas, privado exclusivo | Espectro público+privado |
| CTA principal | Formulario de contacto | Cal.com directo |
| Tono | Formal-accesible | Cercano/casual |
| Visual | Sobrio, sin animación decorativa | Tech/startup, animado |
