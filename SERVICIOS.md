# Proaudita — Servicios (fuente de verdad interna)

> **Auditoría estratégica. Resultados medibles.**
>
> Referencia canónica de los servicios de Proaudita para Claude, agentes y equipo.
> **Fuente técnica:** `lib/productos.ts`. Si cambia el código, actualizar este archivo.
> Cada ficha refleja el código palabra por palabra + una capa de posicionamiento comercial.

## Cliente ideal

Empresa mediana chilena (facturación **$500M–$5B CLP**) con procesos contables
desorganizados o sin auditoría reciente, en rubros de alta complejidad contable:
**constructoras, logística, Agrícolas, Empresas contratistas, Retail, empresas de transportes, gran y pequeña minería, etc.**

---

## Mapa de servicios

| Practice area | Producto | Slug / URL | Tagline | Estado |
|---|---|---|---|---|
| **01 — Auditoría & Assurance** | Proaudita Diagnóstico | `/servicios/diagnostico` | Detecta qué está fallando en tu empresa y cuánto te está costando. | Activo |
| **01 — Auditoría & Assurance** | Proaudita Data | `/servicios/data` | Decide con números reales, no con intuición. | Activo |
| **02 — Tax Advisory** | Proaudita Tax | `/servicios/tax` | Paga lo justo. Elimina el riesgo tributario. | Activo |
| **03 — Compliance & Reporting** | Proaudita Control | `/servicios/control` | Cumplimiento contable continuo, sin sorpresas. | Activo |
| **04 — Tecnología & Automatización** | Proaudita Flow | `/servicios/flow` | Elimina el trabajo manual y los errores de proceso. | Activo |
| **04 — Tecnología & Automatización** | Proaudita Toolkit | `/servicios/toolkit` | Herramientas digitales para pymes. | **Próximamente** |

**Posicionamiento (CONTEXT.md):** Compliance & Reporting (Control) aporta ingreso
recurrente estable. Auditoría & Assurance y Tecnología & Automatización son los de
mayor diferenciación y ticket.

---

## 01 — Auditoría & Assurance

### Proaudita Diagnóstico
`slug: diagnostico` · `/servicios/diagnostico`

**Tagline:** Detecta qué está fallando en tu empresa y cuánto te está costando.

**Qué es:** Una revisión independiente y estructurada de los procesos, controles y
estados contable-financieros de tu organización. Entregamos hallazgos priorizados por
impacto económico, no solo una lista de observaciones.

**El problema:** Muchas empresas descubren sus problemas tarde: cuando ya costaron
dinero, cuando los detecta el SII, o cuando un error se acumula durante meses. Proaudita
Diagnóstico anticipa eso.

**Para quién es:**
- Empresas que están creciendo y quieren validar que sus controles aguantan el ritmo
- Organizaciones que sospechan que algo no está funcionando bien pero no saben exactamente dónde
- Gerencias que necesitan una opinión independiente antes de tomar decisiones importantes
- Empresas que acaban de cambiar de administración o de sistema contable

**Qué incluye:**
1. **Revisión de procesos críticos** — Analizamos compras, ventas, caja, inventario, remuneraciones y documentación según el alcance acordado.
2. **Diagnóstico contable-financiero** — Revisión del estado contable, identificación de inconsistencias y brechas de control interno.
3. **Informe de hallazgos priorizados** — Cada hallazgo viene con estimación de impacto económico, causa raíz y recomendación concreta.
4. **Plan de regularización** — Hoja de ruta para corregir los problemas detectados, con plazos y responsables sugeridos.
5. **Presentación ejecutiva** — Resumen para gerencia o directorio con los 3–5 hallazgos de mayor impacto y las acciones inmediatas.

**Resultado:** Al final del proceso tienes claridad: sabes exactamente qué está
fallando, cuánto está costando y qué hacer primero.

**CTA:** Solicitar diagnóstico

**Posicionamiento comercial:**
- Tipo de ingreso: proyecto (puntual, puerta de entrada al resto de servicios)
- Ticket / diferenciación: alto — servicio de mayor diferenciación de la firma
- Precio: `TBD` (rango CLP a definir)

---

### Proaudita Data
`slug: data` · `/servicios/data`

**Tagline:** Decide con números reales, no con intuición.

**Qué es:** Diseño e implementación de reporting gerencial y dashboards de control para
empresas que necesitan más que un balance mensual. Convertimos los datos que ya tienes
en información accionable para la gerencia.

**El problema:** La mayoría de las gerencias toman decisiones con información incompleta,
tardía o difícil de interpretar. El balance llega a fin de mes, los indicadores no están
claros y nadie tiene una visión consolidada del negocio en tiempo real.

**Para quién es:**
- Gerencias que necesitan información confiable para tomar decisiones rápidas
- Empresas con múltiples áreas o sucursales que quieren visibilidad consolidada
- Directivos que reciben reportes contables pero necesitan indicadores de negocio
- Organizaciones que quieren implementar una cultura de decisión basada en datos

**Qué incluye:**
1. **Diseño de KPIs** — Identificamos los indicadores clave que realmente importan para tu negocio y los definimos con precisión.
2. **Dashboard gerencial** — Panel de control con los indicadores más importantes, actualizable mensualmente o en tiempo real según el caso.
3. **Reporte ejecutivo mensual** — Informe de gestión con análisis de variaciones, alertas y recomendaciones concretas.
4. **Integración de fuentes de datos** — Consolidamos información contable, operacional y comercial desde tus sistemas actuales.
5. **Capacitación de equipo** — Entrenamos al equipo interno para leer, interpretar y usar los reportes en el día a día.

**Resultado:** La gerencia toma decisiones con información correcta, a tiempo y sin
depender de que alguien prepare un Excel.

**CTA:** Solicitar propuesta Data

**Posicionamiento comercial:**
- Tipo de ingreso: proyecto con potencial de mantención recurrente (actualización de dashboards)
- Ticket / diferenciación: alto — visión tecnológica aplicada a auditoría
- Precio: `TBD` (rango CLP a definir)

---

## 02 — Tax Advisory

### Proaudita Tax
`slug: tax` · `/servicios/tax`

**Tagline:** Paga lo justo. Elimina el riesgo tributario.

**Qué es:** Planificación y asesoría tributaria estratégica para empresas chilenas.
Optimizamos la estructura fiscal dentro del marco legal, identificamos riesgos antes de
que los detecte el SII y alineamos la estrategia tributaria con los objetivos del negocio.

**El problema:** La mayoría de las empresas pagan impuestos reactivamente: declaran lo
que el contador calcula y confían en que está bien. Ese enfoque deja dinero sobre la mesa
y acumula riesgos que pueden aparecer años después en una fiscalización.

**Para quién es:**
- Empresas que quieren revisar si su estructura tributaria es óptima
- Organizaciones con múltiples sociedades o estructuras complejas
- Empresas que han recibido notificaciones del SII o quieren prevenir fiscalizaciones
- Negocios que están creciendo y necesitan planificar el impacto tributario de sus decisiones

**Qué incluye:**
1. **Diagnóstico tributario** — Revisión de la situación tributaria actual: estructura, exposición al riesgo y oportunidades de optimización.
2. **Planificación fiscal** — Estrategia tributaria alineada a los objetivos del negocio, dentro del marco legal chileno vigente.
3. **Revisión de estructura societaria** — Evaluación de si la estructura actual es la más eficiente desde el punto de vista tributario y de control.
4. **Gestión de fiscalizaciones SII** — Representación y soporte ante revisiones, notificaciones y citaciones del Servicio de Impuestos Internos.
5. **Asesoría tributaria continua** — Soporte permanente para decisiones con impacto tributario: inversiones, contratos, distribuciones, etc.

**Resultado:** Una empresa que paga lo que corresponde por ley — ni más, ni menos — con
un riesgo tributario conocido y controlado.

**CTA:** Solicitar diagnóstico tributario

**Posicionamiento comercial:**
- Tipo de ingreso: proyecto (planificación) + asesoría continua (recurrente)
- Ticket / diferenciación: medio-alto
- Precio: `TBD` (rango CLP a definir)

---

## 03 — Compliance & Reporting

### Proaudita Control
`slug: control` · `/servicios/control`

**Tagline:** Cumplimiento contable continuo, sin sorpresas.

**Qué es:** Administración contable externalizada con visibilidad gerencial en tiempo
real. Tu empresa siempre al día con el SII, con reportes claros para tomar decisiones —
no solo para cumplir.

**El problema:** La contabilidad externa muchas veces opera como una caja negra: la
empresa entrega documentos, el contador entrega declaraciones, y nadie sabe realmente qué
está pasando con los números. Proaudita Control cambia eso.

**Para quién es:**
- Empresas medianas que externalizan contabilidad y quieren más visibilidad
- Organizaciones que necesitan reportes gerenciales, no solo balances para el SII
- Empresas en crecimiento que necesitan un área contable sin contratar equipo propio
- Negocios con múltiples sociedades que requieren consolidación y claridad

**Qué incluye:**
1. **Registro y control mensual** — Contabilidad completa conforme a normativa vigente, con cierre mensual y conciliaciones.
2. **Declaraciones SII** — F29, F22, libros de compras y ventas, IVA, impuesto de segunda categoría y todo lo que corresponda.
3. **Remuneraciones y laboral** — Liquidaciones de sueldo, libro de remuneraciones, previsión social y cumplimiento laboral.
4. **Dashboard gerencial mensual** — Reporte ejecutivo con ingresos, costos, márgenes, flujo de caja y alertas relevantes.
5. **Soporte tributario continuo** — Respuesta a consultas del SII, revisión de notificaciones y asesoría tributaria operativa.

**Resultado:** Tu empresa siempre al día, con un contador que entiende el negocio y te
avisa antes de que aparezcan los problemas.

**CTA:** Solicitar propuesta

**Posicionamiento comercial:**
- Tipo de ingreso: **recurrente mensual** — aporta el ingreso estable de la firma
- Ticket / diferenciación: medio — ancla de retención y base para venta cruzada
- Precio: `TBD` (fee mensual CLP a definir)

---

## 04 — Tecnología & Automatización

### Proaudita Flow
`slug: flow` · `/servicios/flow`

**Tagline:** Elimina el trabajo manual y los errores de proceso.

**Qué es:** Diseño e implementación de automatización de procesos administrativos,
contables y operacionales. Reducimos los cuellos de botella, eliminamos tareas
repetitivas y cerramos los meses más rápido.

**El problema:** Muchos procesos administrativos y contables siguen siendo manuales:
copiar y pegar entre sistemas, consolidar planillas, ingresar datos dos veces, enviar
correos de seguimiento que nadie responde. Cada hora de trabajo manual es un riesgo de
error y un costo innecesario.

**Para quién es:**
- Empresas con procesos administrativos repetitivos que consumen tiempo del equipo
- Organizaciones que quieren cerrar sus procesos contables más rápido
- Negocios que han crecido y sus procesos manuales ya no escalan
- Equipos que quieren implementar automatización sin contratar un departamento de TI

**Qué incluye:**
1. **Mapeo de procesos** — Identificamos los flujos actuales, los cuellos de botella y los pasos que se pueden eliminar o automatizar.
2. **Diseño de la solución** — Proponemos la arquitectura de automatización adecuada para cada proceso: APIs, RPA, integraciones o flujos n8n/Make.
3. **Implementación** — Construimos e implementamos la automatización, con pruebas y documentación incluidas.
4. **Integración con sistemas existentes** — Conectamos tu ERP, sistema contable, CRM o herramientas actuales sin necesidad de reemplazarlos.
5. **Soporte y monitoreo** — Seguimiento post-implementación para asegurar que los flujos funcionen correctamente y evolucionen con el negocio.

**Resultado:** Procesos que antes tomaban horas o días se ejecutan solos, sin errores y
sin intervención manual.

**CTA:** Automatizar mi operación

**Posicionamiento comercial:**
- Tipo de ingreso: proyecto + soporte/monitoreo recurrente
- Ticket / diferenciación: alto — mayor diferenciación tecnológica de la firma
- Precio: `TBD` (rango CLP a definir)

---

### Proaudita Toolkit — **Próximamente**
`slug: toolkit` · `/servicios/toolkit`

**Tagline:** Herramientas digitales para pymes. Próximamente.

**Qué es:** Un marketplace de herramientas prácticas construidas específicamente para las
necesidades de pequeñas y medianas empresas chilenas: desde creadores de documentos hasta
kits de gestión digital.

**El problema:** Las herramientas empresariales están pensadas para grandes corporaciones
o son demasiado genéricas. Las pymes terminan usando Excel para todo, o pagando por
software que no se adapta a su realidad.

**Para quién es:**
- Pymes que necesitan herramientas prácticas sin complejidad innecesaria
- Emprendedores que quieren digitalizar su operación sin grandes inversiones
- Empresas pequeñas que buscan soluciones específicas para el mercado chileno

**Qué incluye:**
1. **Creador de papeletas de pago** — Genera papeletas de pago profesionales en segundos.
2. **Libro de asistencia digital** — Control de asistencia simple, sin papel y con respaldo.
3. **Landing pages para pymes** — Presencia digital profesional en 24 horas.
4. **Kit NFC para negocios** — Tarjetas de visita y menús digitales con tecnología NFC.
5. **Horas de consulta** — Sesiones de asesoría contable y tributaria a la carta.

**Resultado:** Herramientas simples, prácticas y diseñadas para el contexto chileno — sin
complejidad innecesaria.

**CTA:** Notificarme cuando esté disponible

**Posicionamiento comercial:**
- Tipo de ingreso: transaccional / marketplace (a futuro)
- Estado: **no lanzado** — línea de producto pyma, menor ticket, mayor volumen
- Precio: `TBD` (por herramienta, a definir)

---

## Contacto y conversión

| Canal | Valor |
|---|---|
| WhatsApp | +56 9 9438 8261 — `https://wa.me/56994388261` |
| Agenda | Cal.com — `https://app.cal.com/matiasbalbontin` |
| Email (leads) | matiasrbalbontin@gmail.com |

Flujo de conversión: diagnóstico inicial gratuito (30 min por Cal.com) → propuesta en
menos de 48h → contrato antes de iniciar trabajo.
