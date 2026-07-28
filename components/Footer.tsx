import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-base text-white py-14 overflow-hidden bg-grain">
      <span
        aria-hidden="true"
        className="absolute -bottom-10 right-0 select-none font-grotesk font-semibold text-[10rem] leading-none text-white/[0.04] tracking-tighter"
      >
        pa
      </span>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pb-8 border-b border-white/10">
          <div>
            <Logo className="h-7 w-auto brightness-0 invert" />
            <p className="mt-3 text-sm text-white/65 max-w-xs">
              Auditoría estratégica. Resultados medibles.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <a href="#servicios" className="hover:text-white transition-colors">Servicios</a>
            <a href="#proceso" className="hover:text-white transition-colors">Cómo trabajamos</a>
            <a href="#perfil" className="hover:text-white transition-colors">Perfil</a>
            <a
              href="https://app.cal.com/matiasbalbontin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Agendar reunión
            </a>
            <a
              href="https://wa.me/56994388261"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </nav>
        </div>

        <p className="pt-6 text-sm text-white/55">
          © {year} Proaudita · Matías Balbontín · Chile
        </p>
      </div>
    </footer>
  )
}
