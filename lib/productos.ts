export interface Producto {
  slug: string
  nombre: string
  tagline: string
  descripcion: string
  color: string // tailwind bg class for accent
  icono: string // SVG path d=
  problema: string
  paraquien: string[]
  queincluye: { titulo: string; descripcion: string }[]
  resultado: string
  cta: string
  proximamente?: boolean
}

export const productos: Producto[] = [
  {
    slug: 'diagnostico',
    nombre: 'Proaudita Diagnóstico',
    tagline: 'Detecta qué está fallando en tu empresa y cuánto te está costando.',
    descripcion:
      'Una revisión independiente y estructurada de los procesos, controles y estados contable-financieros de tu organización. Entregamos hallazgos priorizados por impacto económico, no solo una lista de observaciones.',
    color: 'bg-primary',
    icono:
      'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    problema:
      'Muchas empresas descubren sus problemas tarde: cuando ya costaron dinero, cuando los detecta el SII, o cuando un error se acumula durante meses. Proaudita Diagnóstico anticipa eso.',
    paraquien: [
      'Empresas que están creciendo y quieren validar que sus controles aguantan el ritmo',
      'Organizaciones que sospechan que algo no está funcionando bien pero no saben exactamente dónde',
      'Gerencias que necesitan una opinión independiente antes de tomar decisiones importantes',
      'Empresas que acaban de cambiar de administración o de sistema contable',
    ],
    queincluye: [
      {
        titulo: 'Revisión de procesos críticos',
        descripcion:
          'Analizamos compras, ventas, caja, inventario, remuneraciones y documentación según el alcance acordado.',
      },
      {
        titulo: 'Diagnóstico contable-financiero',
        descripcion:
          'Revisión del estado contable, identificación de inconsistencias y brechas de control interno.',
      },
      {
        titulo: 'Informe de hallazgos priorizados',
        descripcion:
          'Cada hallazgo viene con estimación de impacto económico, causa raíz y recomendación concreta.',
      },
      {
        titulo: 'Plan de regularización',
        descripcion:
          'Hoja de ruta para corregir los problemas detectados, con plazos y responsables sugeridos.',
      },
      {
        titulo: 'Presentación ejecutiva',
        descripcion:
          'Resumen para gerencia o directorio con los 3–5 hallazgos de mayor impacto y las acciones inmediatas.',
      },
    ],
    resultado:
      'Al final del proceso tienes claridad: sabes exactamente qué está fallando, cuánto está costando y qué hacer primero.',
    cta: 'Solicitar diagnóstico',
  },
  {
    slug: 'control',
    nombre: 'Proaudita Control',
    tagline: 'Cumplimiento contable continuo, sin sorpresas.',
    descripcion:
      'Administración contable externalizada con visibilidad gerencial en tiempo real. Tu empresa siempre al día con el SII, con reportes claros para tomar decisiones — no solo para cumplir.',
    color: 'bg-navy',
    icono:
      'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    problema:
      'La contabilidad externa muchas veces opera como una caja negra: la empresa entrega documentos, el contador entrega declaraciones, y nadie sabe realmente qué está pasando con los números. Proaudita Control cambia eso.',
    paraquien: [
      'Empresas medianas que externalizan contabilidad y quieren más visibilidad',
      'Organizaciones que necesitan reportes gerenciales, no solo balances para el SII',
      'Empresas en crecimiento que necesitan un área contable sin contratar equipo propio',
      'Negocios con múltiples sociedades que requieren consolidación y claridad',
    ],
    queincluye: [
      {
        titulo: 'Registro y control mensual',
        descripcion:
          'Contabilidad completa conforme a normativa vigente, con cierre mensual y conciliaciones.',
      },
      {
        titulo: 'Declaraciones SII',
        descripcion:
          'F29, F22, libros de compras y ventas, IVA, impuesto de segunda categoría y todo lo que corresponda.',
      },
      {
        titulo: 'Remuneraciones y laboral',
        descripcion:
          'Liquidaciones de sueldo, libro de remuneraciones, prevision social y cumplimiento laboral.',
      },
      {
        titulo: 'Dashboard gerencial mensual',
        descripcion:
          'Reporte ejecutivo con ingresos, costos, márgenes, flujo de caja y alertas relevantes.',
      },
      {
        titulo: 'Soporte tributario continuo',
        descripcion:
          'Respuesta a consultas del SII, revisión de notificaciones y asesoría tributaria operativa.',
      },
    ],
    resultado:
      'Tu empresa siempre al día, con un contador que entiende el negocio y te avisa antes de que aparezcan los problemas.',
    cta: 'Solicitar propuesta',
  },
  {
    slug: 'tax',
    nombre: 'Proaudita Tax',
    tagline: 'Paga lo justo. Elimina el riesgo tributario.',
    descripcion:
      'Planificación y asesoría tributaria estratégica para empresas chilenas. Optimizamos la estructura fiscal dentro del marco legal, identificamos riesgos antes de que los detecte el SII y alineamos la estrategia tributaria con los objetivos del negocio.',
    color: 'bg-primary',
    icono:
      'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    problema:
      'La mayoría de las empresas pagan impuestos reactivamente: declaran lo que el contador calcula y confían en que está bien. Ese enfoque deja dinero sobre la mesa y acumula riesgos que pueden aparecer años después en una fiscalización.',
    paraquien: [
      'Empresas que quieren revisar si su estructura tributaria es óptima',
      'Organizaciones con múltiples sociedades o estructuras complejas',
      'Empresas que han recibido notificaciones del SII o quieren prevenir fiscalizaciones',
      'Negocios que están creciendo y necesitan planificar el impacto tributario de sus decisiones',
    ],
    queincluye: [
      {
        titulo: 'Diagnóstico tributario',
        descripcion:
          'Revisión de la situación tributaria actual: estructura, exposición al riesgo y oportunidades de optimización.',
      },
      {
        titulo: 'Planificación fiscal',
        descripcion:
          'Estrategia tributaria alineada a los objetivos del negocio, dentro del marco legal chileno vigente.',
      },
      {
        titulo: 'Revisión de estructura societaria',
        descripcion:
          'Evaluación de si la estructura actual es la más eficiente desde el punto de vista tributario y de control.',
      },
      {
        titulo: 'Gestión de fiscalizaciones SII',
        descripcion:
          'Representación y soporte ante revisiones, notificaciones y citaciones del Servicio de Impuestos Internos.',
      },
      {
        titulo: 'Asesoría tributaria continua',
        descripcion:
          'Soporte permanente para decisiones con impacto tributario: inversiones, contratos, distribuciones, etc.',
      },
    ],
    resultado:
      'Una empresa que paga lo que corresponde por ley — ni más, ni menos — con un riesgo tributario conocido y controlado.',
    cta: 'Solicitar diagnóstico tributario',
  },
  {
    slug: 'data',
    nombre: 'Proaudita Data',
    tagline: 'Decide con números reales, no con intuición.',
    descripcion:
      'Diseño e implementación de reporting gerencial y dashboards de control para empresas que necesitan más que un balance mensual. Convertimos los datos que ya tienes en información accionable para la gerencia.',
    color: 'bg-navy',
    icono:
      'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    problema:
      'La mayoría de las gerencias toman decisiones con información incompleta, tardía o difícil de interpretar. El balance llega a fin de mes, los indicadores no están claros y nadie tiene una visión consolidada del negocio en tiempo real.',
    paraquien: [
      'Gerencias que necesitan información confiable para tomar decisiones rápidas',
      'Empresas con múltiples áreas o sucursales que quieren visibilidad consolidada',
      'Directivos que reciben reportes contables pero necesitan indicadores de negocio',
      'Organizaciones que quieren implementar una cultura de decisión basada en datos',
    ],
    queincluye: [
      {
        titulo: 'Diseño de KPIs',
        descripcion:
          'Identificamos los indicadores clave que realmente importan para tu negocio y los definimos con precisión.',
      },
      {
        titulo: 'Dashboard gerencial',
        descripcion:
          'Panel de control con los indicadores más importantes, actualizable mensualmente o en tiempo real según el caso.',
      },
      {
        titulo: 'Reporte ejecutivo mensual',
        descripcion:
          'Informe de gestión con análisis de variaciones, alertas y recomendaciones concretas.',
      },
      {
        titulo: 'Integración de fuentes de datos',
        descripcion:
          'Consolidamos información contable, operacional y comercial desde tus sistemas actuales.',
      },
      {
        titulo: 'Capacitación de equipo',
        descripcion:
          'Entrenamos al equipo interno para leer, interpretar y usar los reportes en el día a día.',
      },
    ],
    resultado:
      'La gerencia toma decisiones con información correcta, a tiempo y sin depender de que alguien prepare un Excel.',
    cta: 'Solicitar propuesta Data',
  },
  {
    slug: 'flow',
    nombre: 'Proaudita Flow',
    tagline: 'Elimina el trabajo manual y los errores de proceso.',
    descripcion:
      'Diseño e implementación de automatización de procesos administrativos, contables y operacionales. Reducimos los cuellos de botella, eliminamos tareas repetitivas y cerramos los meses más rápido.',
    color: 'bg-primary',
    icono:
      'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
    problema:
      'Muchos procesos administrativos y contables siguen siendo manuales: copiar y pegar entre sistemas, consolidar planillas, ingresar datos dos veces, enviar correos de seguimiento que nadie responde. Cada hora de trabajo manual es un riesgo de error y un costo innecesario.',
    paraquien: [
      'Empresas con procesos administrativos repetitivos que consumen tiempo del equipo',
      'Organizaciones que quieren cerrar sus procesos contables más rápido',
      'Negocios que han crecido y sus procesos manuales ya no escalan',
      'Equipos que quieren implementar automatización sin contratar un departamento de TI',
    ],
    queincluye: [
      {
        titulo: 'Mapeo de procesos',
        descripcion:
          'Identificamos los flujos actuales, los cuellos de botella y los pasos que se pueden eliminar o automatizar.',
      },
      {
        titulo: 'Diseño de la solución',
        descripcion:
          'Proponemos la arquitectura de automatización adecuada para cada proceso: APIs, RPA, integraciones o flujos n8n/Make.',
      },
      {
        titulo: 'Implementación',
        descripcion:
          'Construimos e implementamos la automatización, con pruebas y documentación incluidas.',
      },
      {
        titulo: 'Integración con sistemas existentes',
        descripcion:
          'Conectamos tu ERP, sistema contable, CRM o herramientas actuales sin necesidad de reemplazarlos.',
      },
      {
        titulo: 'Soporte y monitoreo',
        descripcion:
          'Seguimiento post-implementación para asegurar que los flujos funcionen correctamente y evolucionen con el negocio.',
      },
    ],
    resultado:
      'Procesos que antes tomaban horas o días se ejecutan solos, sin errores y sin intervención manual.',
    cta: 'Automatizar mi operación',
  },
  {
    slug: 'toolkit',
    nombre: 'Proaudita Toolkit',
    tagline: 'Herramientas digitales para pymes. Próximamente.',
    descripcion:
      'Un marketplace de herramientas prácticas construidas específicamente para las necesidades de pequeñas y medianas empresas chilenas: desde creadores de documentos hasta kits de gestión digital.',
    color: 'bg-navy',
    icono:
      'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    problema:
      'Las herramientas empresariales están pensadas para grandes corporaciones o son demasiado genéricas. Las pymes terminan usando Excel para todo, o pagando por software que no se adapta a su realidad.',
    paraquien: [
      'Pymes que necesitan herramientas prácticas sin complejidad innecesaria',
      'Emprendedores que quieren digitalizar su operación sin grandes inversiones',
      'Empresas pequeñas que buscan soluciones específicas para el mercado chileno',
    ],
    queincluye: [
      {
        titulo: 'Creador de papeletas de pago',
        descripcion: 'Genera papeletas de pago profesionales en segundos.',
      },
      {
        titulo: 'Libro de asistencia digital',
        descripcion: 'Control de asistencia simple, sin papel y con respaldo.',
      },
      {
        titulo: 'Landing pages para pymes',
        descripcion: 'Presencia digital profesional en 24 horas.',
      },
      {
        titulo: 'Kit NFC para negocios',
        descripcion: 'Tarjetas de visita y menús digitales con tecnología NFC.',
      },
      {
        titulo: 'Horas de consulta',
        descripcion: 'Sesiones de asesoría contable y tributaria a la carta.',
      },
    ],
    resultado:
      'Herramientas simples, prácticas y diseñadas para el contexto chileno — sin complejidad innecesaria.',
    cta: 'Notificarme cuando esté disponible',
    proximamente: true,
  },
]

export function getProducto(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug)
}
