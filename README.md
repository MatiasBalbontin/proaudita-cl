# Proaudita — proaudita.cl

Sitio web institucional de **Proaudita**, firma de auditoría, tributación y consultoría de procesos para empresas grandes y medianas en Chile.

---

## Estado actual

**Fase 1 — LANZADO** 🟢 `proaudita.cl` está vivo en producción.

Última verificación: 2026-08-10 — 0 errores de consola, todas las requests 200.

| Componente | Estado |
|---|---|
| Layout base + navegación sticky | ✅ Listo |
| Hero con tagline | ✅ Listo |
| Sección Servicios | ✅ Listo |
| Sección Perfil / Liderazgo | ✅ Listo |
| Formulario de contacto | ✅ Listo |
| API Route de contacto (Resend) | ✅ Listo |
| Favicon / OG image / metadata | ✅ Listo |
| Dominio proaudita.cl + SSL | ✅ Live en Vercel |
| Variables de entorno en Vercel | ✅ Configuradas |
| Foto profesional en sección perfil | ⏳ Pendiente (ver CLAUDE.md) |

---

## Stack

- **Framework:** Next.js 15 con App Router
- **UI:** Tailwind CSS
- **Fuentes:** Space Grotesk (headings) + Inter (body) — Google Fonts vía `next/font/google`
- **Formulario:** React Hook Form + Resend (API Route en `app/api/contact/`)
- **Hosting:** Vercel
- **Dominio:** proaudita.cl

---

## Estructura

```
app/
├── page.tsx              # One-page principal (Hero, Servicios, Perfil, Contacto)
├── layout.tsx            # Root layout — fuentes, metadata global
├── icon.tsx              # Favicon generado
├── favicon.tsx           # Favicon SVG
├── opengraph-image.tsx   # OG image generada
└── api/
    └── contact/
        └── route.ts      # Endpoint del formulario → envío por Resend
assets/
└── logos/source/         # Referencias de dirección de marca (PNG)

marketing + ads/           # Automatización de captación y contenido
├── calendario-editorial/  # Plan de contenido semanal
├── linkedin/              # Plantillas y hooks para posts
├── email-frio/            # Templates de prospección outbound
└── google-ads/            # (fase 2) Copys y estrategia de anuncios

procedimientos y procesos/ # Operación completa punta a punta
├── flujos/                # Ciclo del cliente documentado
├── formularios/           # Diagnóstico inicial, feedback
├── propuestas/            # Template de propuesta comercial
├── contratos/             # Template de contrato de servicios
└── guias/                 # Guías internas de ejecución

skills/                    # Skills del dominio para Claude Code
├── contador-cl/           # Tributario y contable chileno (SII, normativa)
└── nubox/                 # Integración y API Nubox

Scripts/                   # Automatización y conexiones externas
├── scraping/              # Prospección de clientes (Google Maps / Apify)
├── nubox-api/             # Conexión API Nubox para auditoría
└── email/                 # Seguimiento automático de leads
```

---

## Levantar en local

```bash
npm install
cp .env.local.example .env.local   # completar RESEND_API_KEY y CONTACT_EMAIL
npm run dev                         # http://localhost:3000
```

### Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `RESEND_API_KEY` | API key de Resend para envío del formulario |
| `CONTACT_EMAIL` | Email donde llegan los mensajes del formulario |

---

## Marca

| Elemento | Valor |
|---|---|
| Tagline | "Auditoría estratégica. Resultados medibles." |
| Color primario | `#0019FF` |
| Color navy | `#1A1A5E` |
| WhatsApp | +56 9 9438 8261 |
| Cal.com | https://app.cal.com/matiasbalbontin |

> La paleta, el tagline y los servicios están cerrados. No modificar sin confirmar con el usuario.
> Ver `CONTEXT.md` y `CLAUDE.md` para decisiones de marca completas.

---

## Navegación rápida

| Quiero... | Ir a... |
|---|---|
| No perderme del objetivo | [`ruta a seguir.md`](ruta%20a%20seguir.md) |
| Crear contenido / posts | [`marketing + ads/`](marketing%20+%20ads/) |
| Ver el flujo del cliente | [`procedimientos y procesos/flujos/`](procedimientos%20y%20procesos/flujos/) |
| Usar un template de propuesta | [`procedimientos y procesos/propuestas/`](procedimientos%20y%20procesos/propuestas/) |
| Firmar un contrato | [`procedimientos y procesos/contratos/`](procedimientos%20y%20procesos/contratos/) |
| Correr scraping de leads | [`Scripts/scraping/`](Scripts/scraping/) |
| Conectar a Nubox por API | [`Scripts/nubox-api/`](Scripts/nubox-api/) |
| Contexto tributario chileno | [`skills/contador-cl/`](skills/contador-cl/) |
| Decisiones de marca | [`CONTEXT.md`](CONTEXT.md) |

---

## Pasos para el funcionamiento óptimo

Lo que sigue es el camino ordenado desde "sitio listo en local" hasta una máquina de captación funcionando. Cada bloque puede ejecutarse de forma independiente, pero el orden importa: los bloques anteriores son prerequisito de los siguientes.

---

### Bloque 1 — Lanzamiento (prerequisito para todo lo demás)

**Objetivo:** que proaudita.cl esté vivo y reciba mensajes reales.

1. **Crear cuenta en Resend** → [resend.com](https://resend.com)
   - Verificar el dominio `proaudita.cl` en Resend (agregar registros DNS TXT + MX que ellos indican)
   - Crear API key y copiarla
   - El remitente del formulario usa `contacto@proaudita.cl` — ese dominio debe estar verificado en Resend antes del primer envío real

2. **Configurar variables en Vercel**
   - `RESEND_API_KEY` → la key generada en Resend
   - `CONTACT_EMAIL` → `matiasrbalbontin@gmail.com` (o el email donde quieres recibir los leads)
   - Agregar en: Vercel Dashboard → proyecto → Settings → Environment Variables

3. **Conectar el dominio**
   - En Vercel: Add Domain → `proaudita.cl`
   - En el registrador del dominio: apuntar nameservers a Vercel, o agregar los registros A/CNAME que Vercel entrega
   - SSL se configura automático

4. **Subir foto profesional**
   - Foto en fondo neutro (blanco o gris), formato cuadrado, mínimo 800×800px
   - Reemplazar el placeholder en `components/Profile.tsx`
   - Usar `next/image` con `alt="Matías Balbontín — Socio Fundador Proaudita"`

5. **Verificar el formulario en producción**
   - Enviar un mensaje de prueba desde el sitio live
   - Confirmar que llega al email configurado
   - Confirmar que el `replyTo` apunta al email del remitente (para responder directo)

**Criterio de éxito:** formulario funciona, dominio resuelve con SSL, foto profesional visible.

---

### Bloque 2 — Presencia digital coherente

**Objetivo:** que cuando un prospecto busque a Matías Balbontín o Proaudita, todo sea consistente y profesional.

6. **Cal.com — actualizar perfil**
   - Bio en español: _"Contador Auditor · Ingeniería en Informática | Auditoría estratégica de procesos contables y operacionales para empresas en Chile."_
   - Foto profesional (la misma del sitio)
   - Renombrar las reuniones:
     - Diagnóstico inicial — 30 min (sin costo, sin compromiso)
     - Sesión completa — 60 min
     - Consulta rápida — 15 min
   - Verificar que el link `https://app.cal.com/matiasbalbontin` funcione y llegue a la agenda correcta

7. **LinkedIn — actualizar y obtener URL**
   - Headline: _"Socio Fundador Proaudita | Contador Auditor UdeC | Auditoría de procesos · Tax Advisory · Consultoría tecnológica"_
   - Sección "Acerca de": posicionamiento Proaudita (firma enterprise, diferenciador tech)
   - Listar los 4 servicios como "Prestación de servicios"
   - Obtener la URL de perfil personalizada y agregarla al footer del sitio en `components/Footer.tsx`

8. **WhatsApp Business**
   - Activar cuenta Business en el número +56 9 9438 8261
   - Nombre de la cuenta: `Proaudita`
   - Foto de perfil: logo Proaudita (el monograma "pa" en azul)
   - Mensaje de bienvenida automático: _"Hola, soy Matías de Proaudita. En breve te respondo. Si prefieres, puedes agendar directamente en https://app.cal.com/matiasbalbontin"_

**Criterio de éxito:** buscar "Proaudita" o "Matías Balbontín" en Google y que los 3 perfiles (sitio, Cal.com, LinkedIn) aparezcan consistentes.

---

### Bloque 3 — SEO técnico

**Objetivo:** que Google indexe bien el sitio y que aparezca en búsquedas relevantes del mercado chileno.

9. **Verificar Google Search Console**
   - Crear propiedad en [search.google.com/search-console](https://search.google.com/search-console)
   - Método recomendado: verificación por DNS (un registro TXT en el dominio)
   - Enviar sitemap: `https://proaudita.cl/sitemap.xml`

10. **Agregar sitemap y robots.txt**
    - Crear `app/sitemap.ts` — Next.js lo expone automáticamente en `/sitemap.xml`
    - Crear `app/robots.ts` — expuesto en `/robots.txt`
    - Ejemplo mínimo para robots: `Allow: /`, `Sitemap: https://proaudita.cl/sitemap.xml`

11. **Schema markup (JSON-LD)**
    - Agregar en `app/layout.tsx` un bloque `<script type="application/ld+json">` con:
      - `Person` → Matías Balbontín, Contador Auditor, UdeC
      - `ProfessionalService` → Proaudita, servicios, área de cobertura Chile
      - `LocalBusiness` → nombre, url, contacto, sameAs con LinkedIn y Cal.com
    - Validar en [schema.org/validator](https://validator.schema.org)

12. **Google Business Profile**
    - Crear perfil en [business.google.com](https://business.google.com)
    - Categoría: "Empresa de contabilidad" o "Consultor de gestión empresarial"
    - Agregar descripción, servicios, URL, fotos
    - Verificar (generalmente por correo postal o videollamada)
    - Crítico para aparecer en búsquedas locales tipo _"auditoría de procesos Santiago"_

**Criterio de éxito:** sitio indexado en Google Search Console, schema sin errores, Google Business Profile verificado.

---

### Bloque 4 — Captación outbound (scraping semanal)

**Objetivo:** generar un flujo semanal de prospectos calificados con email frío automatizado.

13. **Configurar el script de scraping**
    - Base disponible en `C:\Users\matia\OneDrive\Escritorio\Scrap\` (call_apify.py + mailer_leads.py)
    - Actualizar `CIUDADES`: Santiago, Providencia, Las Condes, Vitacura, Huechuraba, Quilicura (donde se concentran medianas y grandes empresas)
    - Actualizar `RUBROS` con los segmentos objetivo: constructoras, clínicas privadas, hoteles, inmobiliarias, empresas de servicios profesionales, logística
    - Filtros de calidad: `rating ≥ 3.5`, tiene sitio web, tiene email visible
    - Agregar campo `score` para priorizar: peso mayor a empresas con sitio web corporativo y múltiples reseñas

14. **Template de email frío**
    - Asunto: _"[Nombre empresa] — auditoría de procesos sin costo inicial"_
    - Cuerpo: breve, directo, sin jerga contable. Mencionar el diferenciador tech (auditoría con visión de ingeniería). CTA único: agendar diagnóstico en Cal.com
    - Límite: máximo 20 correos/día para no caer en spam
    - Seguimiento automático: si no responde en 5 días → WhatsApp si tiene número

15. **Automatizar la ejecución semanal**
    - Opción A (recomendada): GitHub Actions con cron `0 9 * * 1` (lunes 9:00 AM)
    - Opción B: n8n en un VPS barato (~$5/mes en DigitalOcean o Railway)
    - Output: CSV semanal con leads priorizados guardado en Google Drive o enviado al email de Matías

**Criterio de éxito:** primer CSV de leads generado y primeros 20 emails enviados en la semana de activación.

---

### Bloque 5 — Captación inbound (contenido LinkedIn)

**Objetivo:** posicionamiento como referente → tráfico orgánico al sitio → agendamientos.

16. **Definir calendario editorial (LinkedIn)**
    - Frecuencia mínima viable: 2 publicaciones por semana
    - Formatos que funcionan en B2B Chile: carruseles PDF, listas numeradas, preguntas abiertas, comentarios sobre normativa SII/Contraloría
    - Temas prioritarios: tips tributarios, errores comunes en auditoría de procesos, automatización contable, cambios normativos SII
    - Evitar: jerga técnica excesiva, posts genéricos de motivación, contenido sobre sector público (no es el mercado objetivo)

17. **Automatizar publicaciones**
    - Herramienta recomendada: **Buffer** (plan gratuito alcanza para empezar) o n8n si ya se configuró en el bloque anterior
    - Flujo: borrador en Notion/Google Docs → revisión → programar en Buffer → publicación automática

18. **Medir y ajustar**
    - Métrica clave: clics en el link del perfil LinkedIn → visitas al sitio → formularios enviados
    - Revisar mensualmente en LinkedIn Analytics qué formatos tienen más alcance
    - Ajustar temas según qué preguntas hacen los prospectos en los mensajes directos

**Criterio de éxito:** primer mes con 8 publicaciones, al menos 1 visita al sitio referida desde LinkedIn por semana.

---

### Bloque 6 — Blog / SEO de contenido (fase 2 avanzada)

**Objetivo:** tráfico orgánico de largo plazo desde búsquedas del mercado chileno.

19. **Agregar sección blog al sitio**
    - Crear `app/blog/page.tsx` (listado) y `app/blog/[slug]/page.tsx` (artículo)
    - Usar MDX o un CMS headless (Sanity o Contentlayer) para gestionar artículos sin tocar código
    - Metadata dinámica por artículo para SEO

20. **Keywords prioritarias**
    - `auditoría de procesos empresas Chile`
    - `planificación tributaria pymes Chile`
    - `automatización contable Chile`
    - `diagnóstico financiero empresas medianas`
    - `Contador Auditor UdeC Chile`

21. **Estructura de artículos**
    - Mínimo 800 palabras, con H2 y H3 bien estructurados
    - Siempre terminar con CTA: _"¿Quieres aplicar esto en tu empresa? Agenda un diagnóstico gratuito."_
    - Frecuencia mínima: 1 artículo por mes para empezar a indexar

**Criterio de éxito:** al menos 3 artículos publicados y apareciendo en Search Console dentro de los 90 días de publicación.

---

## Roadmap

| Fase | Qué se agrega | Bloque |
|---|---|---|
| 1 — Lanzamiento | Sitio live, formulario funcional, dominio, foto | Bloques 1–2 |
| 2 — Autoridad + captación | SEO técnico, Google Business, outbound, LinkedIn | Bloques 3–5 |
| 3 — Recursos | Blog, lead magnets, recursos descargables | Bloque 6 |
| 4 — Plataforma | Portal de cliente, reportes en tiempo real | Por definir |
