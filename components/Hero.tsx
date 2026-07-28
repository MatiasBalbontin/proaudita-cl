import Reveal from './Reveal'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden bg-white pt-24 pb-16"
    >
      {/* Background layers */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[60%] h-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(ellipse at 85% 15%, #0019FF 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 opacity-[0.05] rounded-full"
          style={{
            background: 'radial-gradient(circle, #1A1A5E 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="#0019FF" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Oversized ghost numeral — editorial anchor, kept clear of the navbar */}
        <span
          className="hidden sm:block absolute top-28 -left-6 select-none font-grotesk font-semibold text-[13rem] leading-none text-navy/[0.035] tracking-tighter"
          aria-hidden="true"
        >
          pa
        </span>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          {/* Left — copy */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-surface text-sm font-medium text-navy px-4 py-1.5 rounded-full mb-8 border border-navy/10">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                Contador Auditor · Ingeniería en Informática · Transformación Digital
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
                El perfil que cruza contabilidad, procesos, gestión y tecnología
                para que tu organización opere mejor y crezca con menos fricción.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.cal.com/matiasbalbontin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold text-base px-7 py-3.5 rounded-xl hover:bg-navy transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Agendar diagnóstico gratuito
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
                30 minutos, sin costo, sin compromiso.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Contador Auditor titulado — UdeC
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Transformación Digital — UNAB + Arizona State
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right — three disciplines converging into one result */}
          <Reveal delay={200} className="hidden lg:block">
            <div className="relative w-full aspect-square max-w-md mx-auto" aria-hidden="true">
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 400"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M90,90 Q145,145 200,200" fill="none" stroke="#1A1A5E" strokeOpacity="0.15" strokeWidth="2" />
                <path d="M310,90 Q255,145 200,200" fill="none" stroke="#1A1A5E" strokeOpacity="0.15" strokeWidth="2" />
                <path d="M90,310 Q145,255 200,200" fill="none" stroke="#1A1A5E" strokeOpacity="0.15" strokeWidth="2" />
                <path d="M310,310 Q255,255 200,200" fill="none" stroke="#1A1A5E" strokeOpacity="0.15" strokeWidth="2" />

                <circle r="4" fill="#0019FF">
                  <animateMotion dur="3.6s" begin="0s" repeatCount="indefinite" path="M90,90 Q145,145 200,200" />
                </circle>
                <circle r="4" fill="#0019FF">
                  <animateMotion dur="3.6s" begin="0.9s" repeatCount="indefinite" path="M310,90 Q255,145 200,200" />
                </circle>
                <circle r="4" fill="#0019FF">
                  <animateMotion dur="3.6s" begin="1.8s" repeatCount="indefinite" path="M90,310 Q145,255 200,200" />
                </circle>
                <circle r="4" fill="#0019FF">
                  <animateMotion dur="3.6s" begin="2.7s" repeatCount="indefinite" path="M310,310 Q255,255 200,200" />
                </circle>
              </svg>

              {/* Satellite nodes */}
              <div className="absolute flex flex-col items-center gap-2" style={{ left: '22.5%', top: '22.5%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-14 h-14 rounded-2xl bg-white border border-navy/10 shadow-md flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-grotesk font-semibold text-xs text-navy bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-navy/10 shadow-sm whitespace-nowrap">
                  Contabilidad
                </span>
              </div>

              <div className="absolute flex flex-col items-center gap-2" style={{ left: '77.5%', top: '22.5%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-14 h-14 rounded-2xl bg-white border border-navy/10 shadow-md flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <span className="font-grotesk font-semibold text-xs text-navy bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-navy/10 shadow-sm whitespace-nowrap">
                  Tecnología
                </span>
              </div>

              <div className="absolute flex flex-col items-center gap-2" style={{ left: '22.5%', top: '77.5%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-14 h-14 rounded-2xl bg-white border border-navy/10 shadow-md flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </div>
                <span className="font-grotesk font-semibold text-xs text-navy bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-navy/10 shadow-sm whitespace-nowrap">
                  Gestión
                </span>
              </div>

              <div className="absolute flex flex-col items-center gap-2" style={{ left: '77.5%', top: '77.5%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-14 h-14 rounded-2xl bg-white border border-navy/10 shadow-md flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <span className="font-grotesk font-semibold text-xs text-navy bg-white/90 backdrop-blur px-2.5 py-1 rounded-full border border-navy/10 shadow-sm whitespace-nowrap">
                  Procesos
                </span>
              </div>

              {/* Center — the result the four disciplines converge into */}
              <div className="absolute flex flex-col items-center gap-2" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-navy shadow-xl shadow-primary/25 flex items-center justify-center animate-float">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="font-grotesk font-semibold text-xs text-primary bg-white shadow-md shadow-primary/10 px-3 py-1.5 rounded-full border border-primary/15 whitespace-nowrap">
                  Resultado medible
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
