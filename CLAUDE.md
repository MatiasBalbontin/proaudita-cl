# Proaudita — Instrucciones para Claude Code

Lee `CONTEXT.md` primero. Contiene todas las decisiones de marca, servicios, paleta, tipografía y estructura del proyecto.

---

## Cuando el usuario pida auditar

Ejecuta estas skills en orden:

```
vercel-react-best-practices   → revisa el código Next.js
vercel-web-design-guidelines  → audita el diseño contra estándares Vercel
review my UI                  → auditoría visual completa
/impeccable                   → polish final de UI
```

---

## Qué revisar en cada auditoría

### Código (vercel-react-best-practices)
- App Router correctamente estructurado (`app/` directory)
- Server Components vs Client Components bien separados (`'use client'` solo donde corresponde)
- Metadata SEO completa (`title`, `description`, `og:*`, `twitter:*`) orientada a Chile
- Fuentes cargadas con `next/font/google` (Space Grotesk + Inter)
- Imágenes usando `next/image` con `alt` descriptivo en español
- Sin `console.log` en producción
- Variables de entorno en `.env.local`, nunca hardcodeadas
- Formulario de contacto con validación y manejo de errores

### Diseño (vercel-web-design-guidelines + review my UI)
- Paleta respetada: primario `#0019FF`, navy `#1A1A5E`, fondo `#F5F7FA`, texto `#0D0D2B`
- Tipografía: Space Grotesk para headings, Inter para body — nunca mezclar con otras fuentes
- El logo SVG usa gradiente azul → navy, tipografía Space Grotesk Semi-Bold
- Contraste WCAG AA mínimo en todos los textos
- Responsive: mobile-first, breakpoints en `sm` (640px), `md` (768px), `lg` (1024px)
- Navegación sticky con logo + anchors + CTA "Agendar"
- Hero: tagline "Auditoría estratégica. Resultados medibles." visible sin scroll en desktop y mobile
- 5 servicios en 4 grupos visuales (ver CONTEXT.md)
- Sección de perfil con credenciales — UdeC mencionado con nombre completo
- Formulario + botón WhatsApp + embed/link Cal.com

### Marca (verificar manualmente)
- El copy no usa "recursos energéticos" en ninguna parte
- No aparece "Ingeniero en Informática" como título — solo como formación
- No hay sección de "casos de éxito" ni testimonios fabricados
- El tagline aparece exactamente como: "Auditoría estratégica. Resultados medibles."
- WhatsApp: +56 9 9438 8261
- Cal.com: https://app.cal.com/matiasbalbontin

### Performance
- Lighthouse score objetivo: Performance ≥ 90, Accessibility ≥ 90, SEO ≥ 95
- Fuentes con `display: swap`
- Sin imágenes sin optimizar
- Sin dependencias innecesarias en `package.json`

---

## Stack definido

- **Framework:** Next.js 14+ con App Router
- **Hosting:** Vercel
- **Estilos:** Tailwind CSS
- **Fuentes:** Google Fonts vía `next/font/google`
- **Formulario:** React Hook Form + envío vía API Route o Resend
- **Contacto:** WhatsApp Business link + Cal.com embed o link directo

---

## Lo que NO tocar sin confirmar con el usuario

- Paleta de colores (definida y cerrada)
- Tagline (definido y cerrado)
- Listado de servicios (5 servicios en 3 grupos)
- Número de WhatsApp
- Link de Cal.com

---

## Estado del sitio

**proaudita.cl está VIVO** — lanzado y verificado el 2026-08-10. SSL activo, 0 errores.

## Pendientes que el usuario debe resolver

- [ ] Foto profesional para sección de perfil (`components/Profile.tsx`)
- [ ] Verificar formulario de contacto en producción (enviar mensaje de prueba real)
- [ ] Actualizar bio Cal.com a español con posicionamiento correcto
- [ ] Actualizar LinkedIn y proporcionar URL para incluir en el sitio
- [ ] Configurar WhatsApp Business con nombre Proaudita

---

## Funcionalidades fase 2 (post-lanzamiento)

### Perfiles y presencia digital
- [ ] **Completación de perfil LinkedIn** — actualizar con posicionamiento Proaudita, headline correcto, servicios, formación. URL a confirmar para incluir en el sitio.
- [ ] **Completación de perfil Cal.com** — bio en español, foto profesional, renombrar reuniones ("Diagnóstico inicial 30 min", "Sesión completa 60 min", "Consulta rápida 15 min")

### SEO
- [ ] **SEO on-page** — metadata completa por sección, schema markup (Person + ProfessionalService + LocalBusiness), sitemap.xml, robots.txt
- [ ] **SEO de contenido** — blog/insights orientado a palabras clave del mercado chileno: "auditoría de procesos municipios Chile", "planificación tributaria empresas Chile", "automatización contable pymes"
- [ ] **Google Business Profile** — crear y verificar perfil para aparecer en búsquedas locales

### Automatización de redes sociales
- [ ] **Estrategia de contenido** — calendario editorial semanal para LinkedIn (canal principal B2B Chile)
- [ ] **Posts automatizados** — pipeline de generación y publicación: insights de auditoría, tips tributarios, casos de optimización genéricos (sin nombrar clientes), actualizaciones normativas SII/Contraloría
- [ ] **Herramienta** — evaluar Buffer, Hootsuite o n8n para automatización del calendario

### Scraping semanal de prospectos
- [ ] **Script automatizado semanal** — scraping Google Maps. Prototipo en `C:\Users\matia\OneDrive\Escritorio\Scrap\` (call_apify.py + mailer_leads.py). Base sólida, requiere:
  - Reemplazar CIUDADES y RUBROS por segmentos objetivo de Proaudita (constructoras, clínicas, hoteles, empresas de servicios, inmobiliarias — sectores con necesidad real de auditoría contable/procesos)
  - Template de email con posicionamiento Proaudita y firma de Matías
  - Filtro de calidad: rating ≥ 3.5, tiene sitio web, tiene email
  - Campo de score para priorizar leads
  - Scheduler semanal: GitHub Actions cron o n8n
- [ ] **Output** — CSV semanal con leads priorizados + envío automático de email frío
