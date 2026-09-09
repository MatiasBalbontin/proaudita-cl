# Plan estratégico — Proaudita CEO autónomo (Claude)

> Rol: operar Proaudita como CEO delegado. Auditar, detectar oportunidades, asignar
> tareas, hacer research/scraping, generar leads, redactar y enviar comunicaciones,
> convertir en clientes e ingresos.
> Fecha de arranque: 2026-09-08. Horizonte de este documento: 4 semanas (hasta 2026-10-05).

---

## 1. Norte y métrica única

**North Star:** MRR + ingreso por proyecto firmado.
**Meta 90 días (ya definida en `ruta a seguir.md`):** 3 clientes pagantes.
**Meta mes 1:** 1 cliente firmado + 2 propuestas vivas + pipeline con 200 leads calificados.

### Embudo con supuestos explícitos (para poder auditar el error)

| Etapa | Meta mes 1 | Tasa asumida |
|---|---|---|
| Leads scrapeados | 400 | — |
| Leads calificados (score ≥ 60) | 200 | 50% |
| Emails fríos enviados | 120 | máx 20/día hábil |
| Respuestas | 10 | 8% |
| Reuniones de diagnóstico | 5 | 50% de respuestas |
| Propuestas enviadas | 3 | 60% de reuniones |
| Cierres | 1 | 33% de propuestas |

Si una tasa real cae bajo la mitad de la asumida, el agente `ops-auditor` abre hallazgo
y propone corrección — no se sigue empujando volumen sobre un embudo roto.

---

## 2. Arquitectura operativa

```
                     CEO (Claude, este hilo)
                             │
        ┌──────────┬─────────┼─────────┬──────────┬──────────┐
   lead-hunter  outreach  content   crm-tracker  proposal  ops-auditor
   (research)   -writer   -engine   (pipeline)   -closer   (control)
        │          │         │          │           │          │
        └──────────┴─────────┴──── data/ ───────────┴──────────┘
                    pipeline.jsonl · leads.csv · metrics.jsonl
```

**Regla de estado:** ningún agente guarda estado en su contexto. Todo se escribe en
`data/`. Append-only en `.jsonl` para tener trazabilidad auditable (es una firma de
auditoría: el propio proceso comercial debe ser auditable).

### Capa de datos (crear en semana 1)

| Archivo | Contenido |
|---|---|
| `data/leads.csv` | Prospectos crudos + enriquecidos + `score` |
| `data/pipeline.jsonl` | Eventos: `lead_added`, `email_sent`, `replied`, `meeting_booked`, `proposal_sent`, `won`, `lost` |
| `data/metrics.jsonl` | Snapshot semanal de tasas del embudo |
| `data/outbox/` | Comunicaciones redactadas **pendientes de aprobación** |
| `data/sent/` | Comunicaciones ya enviadas (copia exacta) |

`data/` con datos de prospectos va a `.gitignore` (contiene datos personales de
terceros — Ley 19.628). Solo se versionan los templates y los agregados.

---

## 3. Agentes a crear

Definidos como subagentes en `.claude/agents/*.md`. Cada uno con un solo trabajo,
input y output en archivo.

| Agente | Trabajo | Escribe en | Gate humano |
|---|---|---|---|
| `lead-hunter` | Scraping Google Maps/web + enriquecimiento + scoring de prospectos | `data/leads.csv` | no |
| `outreach-writer` | Redacta email frío / DM LinkedIn / seguimiento personalizado por lead | `data/outbox/` | **sí — Matías aprueba antes de enviar** |
| `content-engine` | Calendario editorial LinkedIn + posts + artículos SEO | `marketing + ads/` | **sí — publicación** |
| `crm-tracker` | Ingiere eventos, detecta seguimientos vencidos, arma la lista diaria de acciones | `data/pipeline.jsonl` | no |
| `proposal-closer` | Diagnóstico → propuesta → contrato usando `skills/propuesta-generator` | `procedimientos y procesos/propuestas/` | **sí — envío** |
| `ops-auditor` | Auditoría semanal: tasas reales vs. supuestas, salud del sitio, hallazgos priorizados | `data/metrics.jsonl` + informe | no |

### Gates — por qué

Envío de correo y publicación pública son irreversibles y afectan reputación de marca
y del dominio de correo. Mes 1 corre con aprobación humana en esos tres puntos. Si al
cierre del mes 1 la tasa de aprobación sin edición es ≥ 90%, se propone quitar el gate
del seguimiento (no del primer contacto).

### Límites duros (no negociables sin Matías)

- Máx 20 emails fríos/día, máx 2 seguimientos por prospecto, luego se cierra como `lost`.
- Nunca inventar casos de éxito, clientes ni cifras. Sin clientes documentados, no hay
  casos (decisión ya registrada en `CONTEXT.md`).
- Nunca tocar paleta, tagline, servicios, WhatsApp ni Cal.com.
- Todo correo sale con opt-out real y con identificación de Proaudita.

---

## 4. Plan mensual inmediato (2026-09-08 → 2026-10-05)

### Semana 1 (08–14 sep) — Cerrar el flanco de credibilidad + montar el motor

Un prospecto que recibe correo frío googlea el nombre. Si LinkedIn/Cal.com no calzan
con el sitio, el correo se quema. Esto va primero.

- [ ] Test real del formulario en producción (pendiente de Fase 1)
- [ ] Foto profesional en `components/Profile.tsx`
- [ ] Cal.com: bio español, reuniones renombradas ("Diagnóstico inicial 30 min")
- [ ] LinkedIn: headline + about + servicios alineados; URL al sitio
- [ ] WhatsApp Business con nombre Proaudita + mensaje de bienvenida
- [ ] Crear `.claude/agents/` (6 agentes) y capa `data/`
- [x] `lead-hunter`: `call_apify_proaudita.py` reescrito con guarda de presupuesto +
      `scrapeContacts`. **3 tandas corridas 2026-09-07: $4.41 de $5, 795 lugares,
      143 leads calificados** en `data/leads.csv`
- [ ] **11 sep — Media day.** Generación de imágenes: foto/retrato profesional para
      `components/Profile.tsx`, imagen OG del sitio, banco de 8–10 imágenes para los
      posts de LinkedIn del mes (2/semana × 4 semanas), y avatar consistente para
      LinkedIn + Cal.com + WhatsApp Business. Se hace en un solo bloque para que la
      identidad visual sea la misma en todos los canales.
- **Salida:** presencia coherente + ≥100 leads calificados en `data/leads.csv` ✅ (143).

#### Economía real del canal outbound (medida, no estimada — 2026-09-07)

| Métrica | Valor |
|---|---|
| Costo por lugar scrapeado | $0.006 (place $0.004 + contacto $0.002) |
| Lugares → lead calificado | 18.0% |
| Costo por lead calificado | $0.031 |
| Runs exitosos | 3/3 |

Con esto, cada $5 de Apify ≈ 160 leads calificados. El supuesto de 200 leads/mes de
§1 cuesta ~$6.2 — el canal es barato; el cuello de botella es el envío, no el scraping.

### Semana 2 (15–21 sep) — Primer outbound real

- [ ] Revisión manual de calidad de los 100 leads (muestra de 20) → ajustar scoring
- [ ] `outreach-writer` genera primeras 40 secuencias personalizadas
- [ ] Matías aprueba tanda 1 → envío 20/día × 2 días
- [ ] `content-engine`: 2 posts LinkedIn publicados + 20 conexiones con perfil de cliente ideal
- [ ] `crm-tracker` registrando cada evento
- **Salida:** 40 emails enviados, ≥ 2 respuestas, primeras métricas reales del embudo.

### Semana 3 (22–28 sep) — Escalar lo que responde, matar lo que no

- [ ] `ops-auditor` corre auditoría: ¿qué rubro/ciudad/asunto respondió?
- [ ] Doblar apuesta en el segmento ganador; scraping de 300 leads más de ese segmento
- [ ] 60 emails nuevos + seguimientos a los de semana 2 (día 5 sin respuesta)
- [ ] 2 posts LinkedIn + 20 conexiones
- [ ] Primeras reuniones de diagnóstico agendadas
- **Salida:** ≥ 3 reuniones agendadas, segmento ganador identificado con dato.

### Semana 4 (29 sep–05 oct) — Convertir

- [ ] `proposal-closer` arma propuestas dentro de 48h post-reunión
- [ ] Seguimiento a propuestas al día 5 (WhatsApp)
- [ ] 20 emails finales + 2 posts
- [ ] SEO base: schema markup (Person + ProfessionalService), sitemap ya existe, Google Business Profile
- [ ] Auditoría de cierre de mes + plan mes 2 propuesto por `ops-auditor`
- **Salida:** ≥ 2 propuestas enviadas, 1 cierre objetivo, informe de mes 1.

### Ritmo fijo

| Cadencia | Qué |
|---|---|
| Diario (lun–vie) | `crm-tracker` lista acciones del día; outbox aprobada se envía; respuestas contestadas < 24h |
| Lunes | Scraping semanal + carga de leads |
| Martes y jueves | Post LinkedIn |
| Viernes | Auditoría semanal `ops-auditor` + informe a Matías |

---

## 5. Presupuesto y riesgos

**Costo mes 1 estimado:** Apify (~US$30) + dominio/correo ya pagado + Vercel free.
Sin Google Ads en mes 1 — sin señal de qué mensaje convierte, el ads quema plata.
Se evalúa en mes 2 con el mensaje que ya demostró respuesta.

| Riesgo | Mitigación |
|---|---|
| Dominio de correo marcado como spam | Máx 20/día, SPF/DKIM/DMARC verificados antes del primer envío, opt-out real |
| Leads de mala calidad (Google Maps trae mucho ruido) | Revisión manual de muestra de 20 antes de escalar |
| Matías es cuello de botella en los gates | Aprobación en tanda, 1 vez al día, no por correo individual |
| Entrega del primer cliente consume todo el tiempo y mata el outbound | Outbound queda en agentes con gate; solo pide 15 min/día de aprobación |
| Datos personales de prospectos | `data/` en `.gitignore`, sin subir a repo público |

---

## 6. Criterio de éxito del mes 1

Se considera exitoso si **al 05-oct** hay: presencia digital coherente ✅, ≥ 120 emails
enviados, ≥ 5 reuniones, ≥ 2 propuestas vivas, y **métricas reales** que reemplacen los
supuestos de la sección 1. Un cierre es el objetivo; el activo permanente es el embudo
medido.
