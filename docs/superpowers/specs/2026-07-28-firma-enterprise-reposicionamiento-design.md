# Reposicionamiento de Proaudita a firma de auditoría enterprise

## Contexto

Matías consiguió un dominio propio para su marca personal ("Matías Balbontín"). Eso
libera a proaudita.cl de tener que ser, a la vez, sitio personal y sitio de marca.
Proaudita se reposiciona como **firma de auditoría** enfocada en **empresas grandes y
medianas**, con la intención explícita de competir por percepción con Deloitte y PwC.
Esto es un cambio de fondo, no un ajuste de copy: cambia quién habla (firma vs.
persona), a quién le habla (enterprise privado, no pymes/sector público), el tono
(formal-accesible, no cercano/casual) y la composición visual (sobria, no
tech/startup).

Este documento reemplaza, para efectos de este pivot, las secciones de CONTEXT.md que
quedan obsoletas (mercado objetivo, tono, estructura de servicios). CONTEXT.md se
actualiza en la fase de implementación para reflejar estas decisiones como el nuevo
estado "cerrado" del proyecto.

## Decisiones tomadas (con el usuario, en orden)

1. **Rol de Matías:** Socio Fundador y CEO. Visible en una sección de liderazgo, no en
   el centro de la página — la firma es la protagonista.
2. **Contacto:** Formulario corporativo pasa a ser el CTA principal. Cal.com y
   WhatsApp se mantienen pero bajan a opciones secundarias, discretas — no como botón
   flotante gigante.
3. **Servicios:** Se reagrupan los 5 servicios existentes (sin inventar nuevos) en 4
   pilares estilo Big 4 (practice areas).
4. **Sector público:** Se retira por completo. Foco 100% en empresas privadas grandes
   y medianas. El lenguaje de "rigor tipo Contraloría" se elimina (era parte del
   ángulo de sector público, ya no aplica).
5. **Visual:** "Full corporativo serio" — se elimina el diagrama animado de nodos del
   Hero y se reduce el movimiento/decoración general (blobs de gradiente, hover-lift,
   reveals grandes). Sin tocar paleta ni tipografía, que siguen siendo las definidas
   en CONTEXT.md (`#0019FF` / `#1A1A5E` / Space Grotesk + Inter).
6. **Tagline:** Se mantiene "Auditoría estratégica. Resultados medibles." sin cambios.
7. **Tono:** Formal pero accesible — lenguaje de firma ("Nuestro equipo evalúa su
   caso", "Solicite una reunión inicial"), sin coloquialismos ("te digo
   honestamente", "sin vueltas") ni jerga corporativa vacía.

## Mapeo de servicios a pilares

No se inventa contenido nuevo — se reagrupa y se reformula el copy existente.

| Pilar | Contiene (servicio original) |
|---|---|
| **Auditoría & Assurance** | Auditoría de procesos y gestión + Diagnóstico y ordenamiento contable-financiero |
| **Tax Advisory** | Planificación tributaria |
| **Compliance & Reporting** | Contabilidades completas |
| **Consultoría Tecnológica** | Automatización de flujos de trabajo |

## Cambios por sección

### Hero (`components/Hero.tsx`)
- Badge: de credenciales personales → badge de firma (p. ej. "Auditoría & Consultoría
  Estratégica para Empresas").
- Tagline: sin cambios.
- Subtítulo: reescrito a nivel firma/empresa, sin lenguaje personal en primera
  persona.
- CTA principal: "Agendar diagnóstico gratuito" → "Solicitar una reunión" (vincula al
  formulario de contacto, no directo a Cal.com).
- CTA secundario: "Ver servicios" se mantiene.
- Trust markers personales (credenciales de Matías) se retiran del Hero — se mueven a
  la sección de liderazgo.
- Visual: se elimina el diagrama de nodos animado (SVG + animateMotion). Se reemplaza
  por una composición estática, editorial, coherente con "full corporativo serio" —
  sin inventar métricas falsas.

### Servicios (`components/Services.tsx`)
- Se reestructura de 3 grupos / 5 servicios sueltos a 4 pilares (ver mapeo arriba).
- Copy formalizado: se retira el ángulo "rol contralor / Contraloría" (era del
  posicionamiento de sector público). El copy de cada servicio se reescribe en tono
  de firma.
- Encabezado de sección se reescribe para hablar de practice areas / capacidades de
  la firma, no de "una sola mesa" (lenguaje muy informal/independiente).

### Perfil → Liderazgo (`components/Profile.tsx`)
- Se renombra conceptualmente a sección de liderazgo ejecutivo. El anchor
  `#perfil` se mantiene sin cambios (menor riesgo, ya está enlazado desde
  Navbar/Footer); lo que cambia es el label visible en la navegación
  ("Perfil" → "Liderazgo") y el kicker de la sección.
- Bio de Matías se acorta y se vuelve más ejecutiva: "Socio Fundador y CEO", trayectoria
  y formación como respaldo de la firma, no como marca personal.
- El bloque "Capacidades técnicas" (Python, IBM Granite, etc.) se retira o se resume
  en una frase — no calza con el tono enterprise como grid de skills individuales.
- Las credenciales formales (Contador Auditor UdeC, etc.) se mantienen como respaldo
  de la firma.

### Proceso (`components/Process.tsx`)
- Mismo esqueleto de 4 pasos. Copy formalizado (ej. "Conversamos sobre tu
  organización. Salgo con una lectura honesta..." → "Evaluación preliminar de la
  organización. El equipo entrega un diagnóstico objetivo del alcance.").
- Sin cambios estructurales.

### FAQ (`components/FAQ.tsx`)
- Se retira la pregunta/respuesta sobre sector público y Contraloría.
- Resto de preguntas se reformulan en tono formal, manteniendo las respuestas
  honestas (sin inventar garantías o compromisos que no existen).

### Contacto (`components/Contact.tsx`)
- El formulario pasa a ser el bloque dominante (antes era Cal.com).
- Cal.com y WhatsApp se muestran como opciones secundarias compactas, no como bloque
  destacado con gradiente a pantalla completa.
- Se retira el botón flotante de WhatsApp (`components/WhatsAppButton.tsx`) del
  layout global — deja de aparecer en todas las páginas; si se conserva el canal,
  vive solo dentro de la sección de contacto.
- CTA principal se renombra a algo como "Solicitar una reunión" o "Contactar a
  nuestro equipo".

### Navbar / Footer
- Botón "Agendar" → "Contacto" (ancla al formulario, no directo a Cal.com).
- Resto de la navegación sin cambios estructurales.

### Visual general (todas las secciones)
- Se elimina o reduce fuertemente: `animate-float`, `animate-pulse` decorativo,
  hover-lift (`hover:-translate-y-*`) en tarjetas, blobs de gradiente de fondo
  (`radial-gradient` decorativos), ghost numerals grandes.
- Reveals (`components/Reveal.tsx`) se mantienen mecánicamente iguales (siguen
  siendo visibles por defecto sin JS — eso no cambia) pero se reduce la distancia de
  `translateY` para que la animación sea más sutil.
- Bordes y líneas finas ganan protagonismo sobre sombras/gradientes como recurso de
  jerarquía visual.
- Paleta y tipografía: sin cambios (siguen siendo las de CONTEXT.md).

## Fuera de alcance de este pivot

- No se cambia el dominio, hosting, ni la infraestructura de envío del formulario
  (sigue usando `app/api/contact/route.ts` con Resend).
- No se fabrican casos de éxito, clientes, ni métricas — sigue la decisión ya
  registrada ("Ninguno en fase 1").
- No se cambia paleta de colores ni tipografía.
- No se define aún la infraestructura de contacto corporativo "real" (email de
  dominio propio, agenda de equipo) — el formulario sigue enviando al mismo correo de
  Matías por ahora; eso es un pendiente de infraestructura, no de este pivot de
  copy/diseño.

## Verificación

- `npm run build` sin errores.
- Revisión visual con capturas (Playwright vía `playwright-core`, como se usó en
  sesiones anteriores) de Hero, Servicios, Liderazgo, Proceso, FAQ, Contacto en
  desktop y mobile.
- Confirmar que ninguna sección menciona sector público / municipios / Contraloría
  como mercado.
- Confirmar que el WhatsApp flotante ya no aparece fuera de la sección de contacto.
