import Reveal from './Reveal'

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

export default function FAQ() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Preguntas frecuentes
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              Antes de agendar
            </h2>
          </div>
        </Reveal>

        <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 50}>
              <details className="group py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                  <span className="font-grotesk font-semibold text-ink text-base">
                    {item.q}
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-7 h-7 rounded-full border border-navy/15 flex items-center justify-center text-navy transition-transform duration-300 group-open:rotate-45"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-muted text-sm leading-relaxed pr-10">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
