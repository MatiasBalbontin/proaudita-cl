# Reposicionamiento Proaudita a firma enterprise — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reposicionar proaudita.cl de marca personal a firma de auditoría enterprise (foco empresas grandes/medianas, tono formal-accesible, sin sector público, formulario como CTA principal, visual sobrio).

**Architecture:** Sitio Next.js 15 (App Router) de una sola página con componentes por sección en `components/`. No hay suite de tests automatizada — la verificación de cada tarea es `npm run build` (compila y tipa) + una revisión visual puntual con capturas (Playwright vía `playwright-core`, patrón ya usado en sesiones anteriores) + `grep` para confirmar que el lenguaje retirado (sector público, animaciones específicas) ya no aparece.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS, TypeScript, react-hook-form. Sin dependencias nuevas.

## Global Constraints

- No tocar paleta de colores (`#0019FF` / `#1A1A5E` / `#F5F7FA` / `#0D0D2B` / `#6B7280`) ni tipografía (Space Grotesk headings, Inter body) — CONTEXT.md.
- Tagline se mantiene exacto: "Auditoría estratégica. Resultados medibles." — sin cambios.
- No fabricar casos de éxito, clientes, ni métricas — decisión ya registrada en CONTEXT.md.
- Tono: formal-accesible. Nada de coloquialismos ("te digo honestamente", "sin vueltas") ni jerga corporativa vacía.
- Sin mención a sector público / municipios / Contraloría como mercado en ningún componente.
- Cada tarea termina con `npm run build` limpio antes de pasar a la siguiente.
- Repo git ya inicializado en `D:\proaudita.cl` (commit inicial `b65e6b0`). Cada tarea termina con un commit propio.

---

### Task 1: Actualizar CONTEXT.md al nuevo posicionamiento

**Files:**
- Modify: `CONTEXT.md`

**Interfaces:** Ninguna — documento de referencia, no código.

- [ ] **Step 1: Reemplazar la sección `## Marca`**

Reemplazar el bloque completo de `## Marca` (líneas 3-10 aprox.) por:

```markdown
## Marca

**Nombre:** Proaudita
**Dominio:** proaudita.cl
**Tagline:** "Auditoría estratégica. Resultados medibles."
**Posicionamiento:** Firma de auditoría, tributación y consultoría de procesos para
empresas grandes y medianas. Compite por percepción directa con Deloitte y PwC —
foco exclusivamente privado, sin sector público.
**Diferenciador central:** Equipo con base en auditoría, ingeniería y transformación
digital — auditoría con visión técnica, no solo normativa.
```

- [ ] **Step 2: Reemplazar la sección `## Propietario`**

Reemplazar el encabezado y primeras líneas de `## Propietario` para que el nombre
"para el sitio" refleje el rol de firma:

```markdown
## Liderazgo

**Nombre:** Matías Rodrigo Balbontín Gaete
**Rol:** Socio Fundador y CEO
```

(Se conserva la tabla de credenciales y capacidades técnicas tal como está — esas son
factuales y no cambian.)

- [ ] **Step 3: Reemplazar la sección `## Servicios (fase 1)`**

```markdown
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
```

- [ ] **Step 4: Reemplazar la sección `## Mercado objetivo`**

```markdown
## Mercado objetivo

**Posicionamiento del sitio:** empresas privadas grandes y medianas en Chile que
necesitan auditoría, cumplimiento tributario o consultoría de procesos con
estándares de firma profesional. Sin foco en sector público — decisión explícita
para no diluir el posicionamiento frente a Deloitte/PwC.

**Alcance geográfico:** Chile (mercado nacional).

**Descartado:** Sector público (municipios, organismos), partidos políticos.
```

- [ ] **Step 5: Reemplazar la sección `## Contacto y conversión`**

```markdown
## Contacto y conversión

| Canal | Detalle |
|---|---|
| Formulario web | Nombre, empresa, email, descripción del desafío — CTA principal |
| Cal.com | https://app.cal.com/matiasbalbontin — opción secundaria discreta |
| WhatsApp | +56 9 9438 8261 — opción secundaria discreta, sin botón flotante global |

**CTA principal:** "Solicitar una reunión" → ancla al formulario de contacto
(`#contacto`), no directo a Cal.com.
```

- [ ] **Step 6: Actualizar la tabla `## Decisiones registradas`**

Agregar estas filas nuevas al final de la tabla (no borrar las existentes, que siguen
siendo válidas salvo donde se indique):

```markdown
| Posicionamiento | Firma enterprise (vs. Deloitte/PwC) | Marca personal independiente |
| Mercado objetivo | Empresas grandes/medianas, privado exclusivo | Espectro público+privado |
| CTA principal | Formulario de contacto | Cal.com directo |
| Tono | Formal-accesible | Cercano/casual |
| Visual | Sobrio, sin animación decorativa | Tech/startup, animado |
```

- [ ] **Step 7: Commit**

```bash
cd "D:\proaudita.cl"
git add CONTEXT.md
git commit -m "docs: actualizar CONTEXT.md al posicionamiento de firma enterprise"
```

---

### Task 2: Rediseñar Hero.tsx (copy + eliminar diagrama animado)

**Files:**
- Modify: `components/Hero.tsx`

**Interfaces:**
- Consumes: `Reveal` de `./Reveal` (sin cambios de API).
- Produces: sin cambios de exports — sigue siendo `export default function Hero()`.

- [ ] **Step 1: Reemplazar el contenido completo de `components/Hero.tsx`**

```tsx
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center bg-white pt-24 pb-16"
    >
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-surface text-sm font-medium text-navy px-4 py-1.5 rounded-full mb-8 border border-navy/10">
            <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
            Auditoría &amp; Consultoría Estratégica para Empresas
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="font-grotesk font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-ink mb-6">
            Auditoría estratégica.{' '}
            <span className="text-gradient">Resultados medibles.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="text-lg sm:text-xl text-muted max-w-xl mb-10 leading-relaxed">
            Auditoría, tributación y consultoría de procesos para empresas grandes y
            medianas que buscan resultados medibles, no solo cumplimiento.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-navy transition-colors shadow-lg shadow-primary/25"
            >
              Solicitar una reunión
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 bg-white text-base font-semibold text-navy border-2 border-navy/30 px-7 py-3.5 rounded-xl hover:border-primary hover:text-primary transition-colors"
            >
              Ver servicios
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <p className="mt-4 text-sm text-muted/80">
            Nuestro equipo evalúa tu caso y responde dentro de 24 horas hábiles.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-14 flex flex-wrap gap-x-6 gap-y-2 text-sm text-navy/70 font-medium">
            <span>Auditoría &amp; Assurance</span>
            <span aria-hidden="true">·</span>
            <span>Tax Advisory</span>
            <span aria-hidden="true">·</span>
            <span>Risk &amp; Procesos</span>
            <span aria-hidden="true">·</span>
            <span>Consultoría Tecnológica</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

Esto elimina: el diagrama animado de nodos (`animateMotion`), el numeral fantasma
"pa", los blobs de gradiente radial de fondo, el patrón de grilla, el punto
`animate-pulse` del badge, y el `hover:-translate-y-0.5` del CTA. El layout pasa de
dos columnas a una sola columna centrada (`max-w-3xl`), consistente con "full
corporativo serio".

- [ ] **Step 2: Verificar que compila**

Run: `cd "D:\proaudita.cl" && npm run build`
Expected: `✓ Compiled successfully` sin errores de tipo.

- [ ] **Step 3: Verificar visualmente**

```bash
cd "D:\proaudita.cl"
netstat -ano | grep ':3000' | awk '{print $5}' | sort -u | while read pid; do [ -n "$pid" ] && [ "$pid" != "0" ] && taskkill //PID "$pid" //F 2>&1 || true; done
rm -rf .next
npm run dev > /tmp/dev.log 2>&1 &
sleep 4
cd /tmp/logotrace && node shot3.js
```

Abrir `C:\Users\matia\AppData\Local\Temp\shots\hero-top.png` y `hero-mobile.png` con
la herramienta Read — confirmar: sin diagrama de nodos, sin numeral "pa" de fondo,
badge institucional visible, CTA "Solicitar una reunión".

- [ ] **Step 4: Commit**

```bash
cd "D:\proaudita.cl"
git add components/Hero.tsx
git commit -m "feat: rediseñar Hero a posicionamiento de firma enterprise"
```

---

### Task 3: Reestructurar Services.tsx en 4 pilares Big 4

**Files:**
- Modify: `components/Services.tsx`

**Interfaces:**
- Consumes: `Reveal` de `./Reveal`.
- Produces: sin cambios de exports.

- [ ] **Step 1: Reemplazar el array `groups` y el copy de encabezado**

Reemplazar completamente `components/Services.tsx` por:

```tsx
import Reveal from './Reveal'

const groups = [
  {
    index: '01',
    label: 'Auditoría & Assurance',
    services: [
      {
        title: 'Auditoría de procesos y gestión',
        description:
          'Evaluación independiente de flujos operacionales y controles internos. Identificamos riesgos, ineficiencias y brechas de control con una mirada contable y tecnológica integrada.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        ),
      },
      {
        title: 'Diagnóstico contable-financiero',
        description:
          'Revisión del estado contable y financiero de la organización. Se identifican inconsistencias y se entrega un plan de regularización con hallazgos priorizados.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '02',
    label: 'Tax Advisory',
    services: [
      {
        title: 'Planificación tributaria',
        description:
          'Optimización de la carga tributaria dentro del marco legal chileno. Análisis de estructura societaria y estrategia fiscal alineada a los objetivos del negocio.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '03',
    label: 'Compliance & Reporting',
    services: [
      {
        title: 'Contabilidades completas',
        description:
          'Administración contable externalizada: registro, control y reporte mensual conforme a normativa vigente, con visibilidad continua para la gerencia.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    index: '04',
    label: 'Consultoría Tecnológica',
    services: [
      {
        title: 'Automatización de flujos de trabajo',
        description:
          'Diseño e implementación de automatización de procesos operativos y de reporte, reduciendo tareas manuales y tiempos de cierre.',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ),
      },
    ],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="py-28 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-20">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Áreas de práctica
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              Auditoría, impuestos, procesos y tecnología
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Un equipo multidisciplinario para empresas que necesitan más que
              cumplimiento normativo — necesitan visibilidad real sobre su operación.
            </p>
          </div>
        </Reveal>

        <div className="space-y-20">
          {groups.map((group) => (
            <Reveal key={group.label}>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,10rem)_1fr] gap-6 md:gap-10">
                <div className="flex md:flex-col md:items-start items-center gap-4 md:gap-2">
                  <span className="font-grotesk font-semibold text-5xl md:text-6xl text-navy/25 leading-none">
                    {group.index}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary md:mt-1">
                    {group.label}
                  </span>
                </div>

                <div
                  className={`grid gap-4 ${
                    group.services.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {group.services.map((svc) => (
                    <article
                      key={svc.title}
                      className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary/40 hover:shadow-lg hover:shadow-navy/5 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-primary/8 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        {svc.icon}
                      </div>
                      <h3 className="font-grotesk font-semibold text-ink text-sm mb-2">
                        {svc.title}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">
                        {svc.description}
                      </p>
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-6 bottom-6 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full"
                      />
                    </article>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 text-center">
            <p className="text-muted text-sm mb-2">
              ¿Tu necesidad no está en esta lista?
            </p>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-navy transition-colors"
            >
              Solicitar una reunión
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
```

Esto elimina: el ángulo "rol contralor / Contraloría", el blob de gradiente decorativo
superior derecho, la tarjeta punteada repetida "¿tu desafío no está aquí?" (que se
habría repetido 3 veces con 4 pilares — reemplazada por un único CTA de cierre), y el
`hover:-translate-y-1` de las tarjetas.

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: sin errores.

- [ ] **Step 3: Verificar que no queda lenguaje de sector público**

Run: `grep -in "contraloría\|municipio" components/Services.tsx`
Expected: sin resultados (exit code 1 / vacío).

- [ ] **Step 4: Commit**

```bash
git add components/Services.tsx
git commit -m "feat: reestructurar servicios en 4 pilares tipo Big 4"
```

---

### Task 4: Renombrar Profile.tsx a "Liderazgo" y formalizar la bio

**Files:**
- Modify: `components/Profile.tsx`

**Interfaces:**
- Consumes: `Reveal` de `./Reveal`.
- Produces: sin cambios de exports. El `id="perfil"` de la sección se mantiene sin
  cambios (el anchor no cambia, solo el label visible en la navegación — ver Task 6).

- [ ] **Step 1: Reemplazar el contenido completo de `components/Profile.tsx`**

```tsx
import Reveal from './Reveal'

const credentials = [
  {
    degree: 'Contador Auditor',
    institution: 'Universidad de Concepción',
    year: '2024',
    note: 'Decreto 2024-5478',
  },
  {
    degree: 'Ingeniería en Informática',
    institution: 'En proceso',
    year: '',
    note: '',
  },
  {
    degree: 'Digital Transformation Management',
    institution: 'UNAB + Arizona State University (W.P. Carey)',
    year: '2026',
    note: '',
  },
  {
    degree: 'Dirección y Gestión de Proyectos',
    institution: 'Universidad Nacional de Córdoba (edX)',
    year: '2022',
    note: '',
  },
]

export default function Profile() {
  return (
    <section id="perfil" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <div>
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                Liderazgo
              </span>

              <div className="mt-4 flex items-center gap-5">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-primary to-navy flex items-center justify-center text-white font-grotesk font-semibold text-xl shadow-lg shadow-primary/20">
                  MB
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                    Matías Balbontín
                  </h2>
                  <p className="text-muted text-sm mt-0.5">
                    Socio Fundador y CEO
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-muted leading-relaxed">
                <p>
                  Matías Balbontín es Socio Fundador y CEO de Proaudita. Su formación
                  combina auditoría, ingeniería y transformación digital — una base
                  poco común en el mercado chileno que define el enfoque de la firma:
                  auditoría con visión técnica, no solo normativa.
                </p>
                <p>
                  Bajo su dirección, Proaudita trabaja con empresas medianas y
                  grandes que buscan ir más allá del cumplimiento — entender su
                  operación en profundidad y mejorarla con evidencia.
                </p>
              </div>

              <a
                href="#contacto"
                className="mt-8 inline-flex items-center gap-2 bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy transition-colors"
              >
                Solicitar una reunión
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <h3 className="font-grotesk font-semibold text-ink text-sm uppercase tracking-wide text-muted mb-4">
                Formación
              </h3>
              <div className="space-y-3">
                {credentials.map((c) => (
                  <div
                    key={c.degree}
                    className="flex gap-4 p-4 bg-surface rounded-xl border border-gray-200"
                  >
                    <div
                      className="mt-0.5 w-2 h-2 rounded-full bg-primary flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-grotesk font-semibold text-ink text-sm">
                        {c.degree}
                        {c.year && (
                          <span className="ml-2 font-normal text-muted text-xs">
                            {c.year}
                          </span>
                        )}
                      </p>
                      <p className="text-muted text-sm mt-0.5">{c.institution}</p>
                      {c.note && (
                        <p className="text-muted/60 text-xs mt-0.5">{c.note}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-muted text-xs leading-relaxed">
                Certificaciones adicionales en IA aplicada a auditoría (IBM Granite,
                IBM SkillsBuild), cloud (Microsoft Azure) y análisis de datos.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

Esto elimina: el blob de gradiente decorativo, la cita en bloque (`blockquote`)
personal, y el grid de "capacidades técnicas" (se condensa en una línea de texto).

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/Profile.tsx
git commit -m "feat: formalizar Profile a sección de liderazgo ejecutivo"
```

---

### Task 5: Formalizar Process.tsx

**Files:**
- Modify: `components/Process.tsx`

**Interfaces:** sin cambios de exports ni de la forma `steps`.

- [ ] **Step 1: Reemplazar el array `steps` y el encabezado**

En `components/Process.tsx`, reemplazar el array `steps` por:

```tsx
const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    duration: 'Evaluación inicial · sin costo',
    description:
      'Conversamos sobre tu organización. El equipo entrega una lectura objetiva de la situación y define el alcance del trabajo.',
  },
  {
    n: '02',
    title: 'Propuesta',
    duration: 'Dentro de 48 horas',
    description:
      'Alcance, plazos y honorarios por escrito, alineados a tus objetivos.',
  },
  {
    n: '03',
    title: 'Ejecución',
    duration: 'Según alcance acordado',
    description:
      'Trabajo con hitos y reportes de avance definidos — visibilidad continua, no una entrega única al final.',
  },
  {
    n: '04',
    title: 'Seguimiento',
    duration: 'Continuo',
    description:
      'Cierre de hallazgos, seguimiento de recomendaciones y disponibilidad posterior a la entrega.',
  },
]
```

Y reemplazar el bloque de encabezado (`<h2>` y `<p>`) por:

```tsx
<h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
  De la primera reunión al resultado, sin sorpresas
</h2>
<p className="mt-4 text-muted text-lg leading-relaxed">
  Cuatro etapas claras. Sabes qué esperar antes de comenzar.
</p>
```

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/Process.tsx
git commit -m "feat: formalizar tono de la sección Cómo trabajamos"
```

---

### Task 6: Reescribir FAQ.tsx sin sector público

**Files:**
- Modify: `components/FAQ.tsx`

**Interfaces:** sin cambios de exports.

- [ ] **Step 1: Reemplazar el array `faqs`**

```tsx
const faqs = [
  {
    q: '¿La evaluación inicial tiene costo?',
    a: 'No. Es una conversación inicial sin costo ni compromiso, donde el equipo determina el alcance y la forma de trabajo antes de cualquier propuesta formal.',
  },
  {
    q: '¿Qué tipo de empresas atienden?',
    a: 'El foco de la firma está en empresas medianas y grandes que requieren auditoría, cumplimiento tributario o consultoría de procesos con estándares de firma profesional.',
  },
  {
    q: '¿Cómo manejan la confidencialidad de la información?',
    a: 'Toda la información se trata de forma confidencial. Firmamos acuerdos de confidencialidad (NDA) cuando la organización lo requiere antes de compartir información sensible.',
  },
  {
    q: '¿Qué pasa después de recibir la propuesta?',
    a: 'Cuentas con el tiempo que necesites para evaluarla. Si no hay respuesta dentro de un plazo razonable, el equipo hace un seguimiento breve.',
  },
  {
    q: '¿Cuánto dura un proyecto típico?',
    a: 'Depende del alcance: un diagnóstico contable puede resolverse en semanas, mientras que una auditoría de procesos o una automatización más compleja toma más tiempo. El plazo queda definido en la propuesta formal, no después.',
  },
]
```

Esto elimina la pregunta sobre atención a organismos públicos/Contraloría y
formaliza el resto del tono.

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`

- [ ] **Step 3: Verificar que no queda lenguaje de sector público**

Run: `grep -in "contraloría\|municipio\|sector público" components/FAQ.tsx`
Expected: sin resultados.

- [ ] **Step 4: Commit**

```bash
git add components/FAQ.tsx
git commit -m "feat: reescribir FAQ sin sector público, tono formal"
```

---

### Task 7: Reestructurar Contact.tsx — formulario como CTA dominante

**Files:**
- Modify: `components/Contact.tsx`

**Interfaces:**
- Consumes: `useForm` de `react-hook-form` (sin cambios), `Reveal` de `./Reveal`.
- Produces: sin cambios de exports ni del endpoint consumido (`/api/contact`, sin
  cambios en `app/api/contact/route.ts`).

- [ ] **Step 1: Reemplazar el JSX de `components/Contact.tsx`**

Mantener intacta toda la lógica de React Hook Form (`useForm`, `onSubmit`, estado
`status`) — solo cambia el JSX de presentación. Reemplazar desde el `return (` hasta
el cierre de `</section>` por:

```tsx
  return (
    <section id="contacto" className="py-28 bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Contacto
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              Solicita una reunión con nuestro equipo
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              Completa el formulario y te contactaremos dentro de 24 horas hábiles
              para coordinar una conversación inicial.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-8 items-start">
          {/* Form — dominant */}
          <Reveal>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8">
              {status === 'sent' ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-grotesk font-semibold text-ink">Solicitud enviada</p>
                  <p className="text-muted text-sm mt-2">
                    Te contactaremos dentro de las próximas 24 horas hábiles.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-primary hover:text-navy font-medium transition-colors"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-ink mb-1.5">
                      Nombre *
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      autoComplete="name"
                      {...register('nombre', { required: 'El nombre es requerido' })}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                        errors.nombre ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Tu nombre completo"
                    />
                    {errors.nombre && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.nombre.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-ink mb-1.5">
                      Empresa *
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      autoComplete="organization"
                      {...register('empresa', { required: 'La empresa es requerida' })}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                        errors.empresa ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Nombre de tu empresa"
                    />
                    {errors.empresa && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.empresa.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register('email', {
                        required: 'El email es requerido',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Ingresa un email válido',
                        },
                      })}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${
                        errors.email ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="tu@empresa.cl"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="mensaje" className="block text-sm font-medium text-ink mb-1.5">
                      Cuéntanos sobre tu organización y el desafío que enfrentas *
                    </label>
                    <textarea
                      id="mensaje"
                      rows={4}
                      {...register('mensaje', { required: 'Cuéntanos tu desafío' })}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none ${
                        errors.mensaje ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Describe brevemente tu organización y qué necesitas..."
                    />
                    {errors.mensaje && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.mensaje.message}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <p className="sm:col-span-2 text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3" role="alert">
                      Hubo un error al enviar la solicitud. Intenta nuevamente o escríbenos por WhatsApp.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="sm:col-span-2 bg-primary text-white font-semibold text-sm px-6 py-3 rounded-xl hover:bg-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Enviando...' : 'Enviar solicitud'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Secondary contact options — compact, understated */}
          <Reveal delay={140}>
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Otras formas de contacto
              </p>
              <a
                href="https://app.cal.com/matiasbalbontin"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-navy hover:text-primary transition-colors"
              >
                Agendar directamente en Cal.com →
              </a>
              <a
                href="https://wa.me/56994388261?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20servicios%20de%20Proaudita."
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-navy hover:text-primary transition-colors"
              >
                Escribir por WhatsApp →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

Nota: el campo `empresa` pasa de opcional a requerido (`register('empresa', {
required: ... })`), consistente con el foco explícito en empresas medianas/grandes.

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add components/Contact.tsx
git commit -m "feat: formulario de contacto como CTA dominante, Cal.com/WhatsApp secundarios"
```

---

### Task 8: Actualizar Navbar.tsx y Footer.tsx

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `components/Footer.tsx`

**Interfaces:** sin cambios de exports en ninguno de los dos.

- [ ] **Step 1: En `components/Navbar.tsx`, actualizar el array `links`**

```tsx
const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#perfil', label: 'Liderazgo' },
  { href: '#contacto', label: 'Contacto' },
]
```

- [ ] **Step 2: En `components/Navbar.tsx`, cambiar el botón CTA (desktop) de Cal.com a ancla de contacto**

Reemplazar el bloque:

```tsx
          <a
            href="https://app.cal.com/matiasbalbontin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy hover:-translate-y-0.5 transition-all shadow-sm shadow-primary/20"
          >
            Agendar
          </a>
```

por:

```tsx
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy transition-colors shadow-sm shadow-primary/20"
          >
            Contacto
          </a>
```

- [ ] **Step 3: En `components/Navbar.tsx`, cambiar el botón CTA (mobile) igual que el desktop**

Reemplazar el bloque equivalente dentro de `{menuOpen && (...)}`:

```tsx
          <a
            href="https://app.cal.com/matiasbalbontin"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex justify-center items-center bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-navy transition-colors"
            onClick={closeMenu}
          >
            Agendar diagnóstico gratuito
          </a>
```

por:

```tsx
          <a
            href="#contacto"
            className="mt-4 w-full inline-flex justify-center items-center bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-navy transition-colors"
            onClick={closeMenu}
          >
            Contacto
          </a>
```

- [ ] **Step 4: En `components/Footer.tsx`, actualizar el nav y el link "Agendar reunión"**

Reemplazar:

```tsx
            <a href="#perfil" className="hover:text-white transition-colors">Perfil</a>
            <a
              href="https://app.cal.com/matiasbalbontin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Agendar reunión
            </a>
```

por:

```tsx
            <a href="#perfil" className="hover:text-white transition-colors">Liderazgo</a>
            <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
```

- [ ] **Step 5: Verificar que compila**

Run: `npm run build`
Expected: sin errores.

- [ ] **Step 6: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx
git commit -m "feat: CTA de navegación apunta al formulario de contacto, label Liderazgo"
```

---

### Task 9: Eliminar el botón flotante de WhatsApp global

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/WhatsAppButton.tsx`

**Interfaces:** `Home()` en `app/page.tsx` deja de renderizar `<WhatsAppButton />`.

- [ ] **Step 1: Confirmar que `WhatsAppButton` no se usa en ningún otro archivo**

Run: `grep -rn "WhatsAppButton" --include="*.tsx" .`
Expected: solo aparece en `app/page.tsx` (import + uso) y en su propia definición.

- [ ] **Step 2: Editar `app/page.tsx`**

Quitar el import `import WhatsAppButton from '@/components/WhatsAppButton'` y la
línea `<WhatsAppButton />` dentro del JSX. El archivo queda:

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Profile from '@/components/Profile'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Profile />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Borrar el archivo del componente**

```bash
cd "D:\proaudita.cl"
rm components/WhatsAppButton.tsx
```

- [ ] **Step 4: Verificar que compila**

Run: `npm run build`
Expected: sin errores (ni imports rotos).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: retirar botón flotante de WhatsApp del layout global"
```

---

### Task 10: Reducir movimiento decorativo (reveals más sutiles)

**Files:**
- Modify: `app/globals.css`

**Interfaces:** sin cambios de API — `Reveal.tsx` sigue funcionando igual (visible
por defecto sin JS, `.reveal-armed` + `.is-visible` para la animación).

- [ ] **Step 1: Reducir la distancia de desplazamiento del reveal**

En `app/globals.css`, dentro de `@layer utilities`, cambiar:

```css
  .reveal.reveal-armed {
    opacity: 0;
    transform: translateY(28px);
  }
```

por:

```css
  .reveal.reveal-armed {
    opacity: 0;
    transform: translateY(12px);
  }
```

- [ ] **Step 2: Verificar que compila**

Run: `npm run build`
Expected: sin errores.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "style: reducir distancia de reveal para composición más sobria"
```

---

### Task 11: Verificación final end-to-end

**Files:** ninguno modificado — solo verificación.

- [ ] **Step 1: Build limpio**

Run: `cd "D:\proaudita.cl" && npm run build`
Expected: `✓ Compiled successfully`, `✓ Generating static pages (7/7)`.

- [ ] **Step 2: Confirmar ausencia total de lenguaje de sector público**

Run: `grep -rin "contraloría\|municipio" components/ app/ CONTEXT.md`
Expected: sin resultados (o solo referencias históricas si CONTEXT.md documenta la
decisión de haberlo retirado — revisar caso a caso).

- [ ] **Step 3: Confirmar que no queda ningún CTA apuntando directo a Cal.com como principal**

Run: `grep -rn "app.cal.com" components/`
Expected: solo aparece en `Contact.tsx` (opción secundaria) — no en `Hero.tsx`,
`Navbar.tsx`, `Profile.tsx`, `Services.tsx`, `Footer.tsx`.

- [ ] **Step 4: Reiniciar el dev server limpio y capturar todas las secciones**

```bash
cd "D:\proaudita.cl"
netstat -ano | grep ':3000' | awk '{print $5}' | sort -u | while read pid; do [ -n "$pid" ] && [ "$pid" != "0" ] && taskkill //PID "$pid" //F 2>&1 || true; done
rm -rf .next
npm run dev > /tmp/dev.log 2>&1 &
sleep 4
cd /tmp/logotrace && node shot2.js
```

Revisar con Read: `full-scrolled.png`, `section-servicios.png`, `section-proceso.png`,
`section-perfil.png`, `section-contacto.png` — confirmar que no aparece el botón
flotante de WhatsApp en ninguna captura, que el formulario es el bloque dominante en
Contacto, y que el Hero es de una sola columna sin diagrama animado.

- [ ] **Step 5: Commit final (si quedó algo pendiente de las verificaciones)**

```bash
git add -A
git commit -m "chore: verificación final del reposicionamiento enterprise" --allow-empty
```

(El `--allow-empty` es solo por si esta tarea no generó cambios de archivo — si
Steps 2-4 revelan algo pendiente, corregirlo primero y commitear ese fix
específicamente, no con este mensaje genérico.)
