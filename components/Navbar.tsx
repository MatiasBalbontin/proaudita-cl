'use client'

import { useState, useEffect } from 'react'
import Logo from './Logo'

const links = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#perfil', label: 'Liderazgo' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" aria-label="Proaudita — inicio" onClick={closeMenu}>
          <Logo className="h-8 w-auto" />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-sm font-medium text-ink/85 hover:text-primary transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy transition-colors shadow-sm shadow-primary/20"
          >
            Contacto
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-base"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className="sr-only">{menuOpen ? 'Cerrar menú' : 'Menú'}</span>
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-current transition-all duration-200 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-200 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition-all duration-200 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              className="block py-3 text-sm font-medium text-ink/85 hover:text-primary border-b border-gray-100 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contacto"
            className="mt-4 w-full inline-flex justify-center items-center bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-navy transition-colors"
            onClick={closeMenu}
          >
            Contacto
          </a>
        </div>
      )}
    </header>
  )
}
