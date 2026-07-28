import Reveal from './Reveal'

const faqs = [
  {
    q: '¿El diagnóstico inicial tiene costo?',
    a: 'No. Son 30 minutos sin costo y sin compromiso. Al final te digo honestamente si puedo ayudarte y cómo — si no es el caso, también te lo digo.',
  },
  {
    q: '¿Trabajan solo con empresas grandes o también con pymes?',
    a: 'Trabajo con cualquier organización que quiera optimizar sus recursos — empresas de cualquier tamaño, así como organismos públicos. No hay un mínimo de tamaño para conversar.',
  },
  {
    q: '¿Atienden organizaciones del sector público?',
    a: 'Sí, son parte del espectro de clientes. El estándar de trabajo es el mismo rigor que exige un rol contralor — el que aplica la Contraloría en el sector público — así que encaja de forma natural con esos requisitos.',
  },
  {
    q: '¿Cómo manejan la confidencialidad de la información?',
    a: 'Toda la información compartida en el diagnóstico y durante el trabajo se trata de forma confidencial. Si tu organización requiere un acuerdo de confidencialidad formal antes de compartir datos, se firma sin problema.',
  },
  {
    q: '¿Qué pasa después de recibir la propuesta?',
    a: 'Tienes el tiempo que necesites para revisarla. Si no hay respuesta dentro de 5 días, hago un seguimiento breve por WhatsApp — nada de insistencia excesiva.',
  },
  {
    q: '¿Cuánto dura un proyecto típico?',
    a: 'Depende del alcance: un diagnóstico contable puede resolverse en semanas, mientras que una auditoría de procesos o una automatización compleja toma más tiempo. El plazo queda definido en la propuesta, no después.',
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
