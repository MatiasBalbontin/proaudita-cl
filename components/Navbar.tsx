'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Logo from './Logo'

const servicios = [
  { href: '/servicios/diagnostico', label: 'Proaudita Diagnóstico', desc: 'Detecta qué está fallando' },
  { href: '/servicios/control', label: 'Proaudita Control', desc: 'Contabilidad sin sorpresas' },
  { href: '/servicios/tax', label: 'Proaudita Tax', desc: 'Planificación tributaria' },
  { href: '/servicios/data', label: 'Proaudita Data', desc: 'Reporting gerencial' },
  { href: '/servicios/flow', label: 'Proaudita Flow', desc: 'Automatización de procesos' },
  { href: '/servicios/toolkit', label: 'Proaudita Toolkit', desc: 'Próximamente', badge: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileServiciosOpen, setMobileServiciosOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeAll = () => {
    setMenuOpen(false)
    setDropdownOpen(false)
    setMobileServiciosOpen(false)
  }

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
        <Link href="/" aria-label="Proaudita — inicio" onClick={closeAll}>
          <Logo className="h-8 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {/* Servicios dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1 text-sm font-medium text-ink/85 hover:text-primary transition-colors"
              aria-expanded={dropdownOpen}
            >
              Servicios
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                {servicios.map(({ href, label, desc, badge }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={closeAll}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-surface transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                          {label}
                        </span>
                        {badge && (
                          <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                            Soon
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted">{desc}</span>
                    </div>
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-1 pt-1">
                  <Link
                    href="/#servicios"
                    onClick={closeAll}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-primary hover:text-navy transition-colors"
                  >
                    Ver resumen de servicios
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/#proceso"
            className="text-sm font-medium text-ink/85 hover:text-primary transition-colors"
          >
            Cómo trabajamos
          </Link>
          <Link
            href="/#perfil"
            className="text-sm font-medium text-ink/85 hover:text-primary transition-colors"
          >
            Liderazgo
          </Link>
          <Link
            href="/#contacto"
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy transition-colors shadow-sm shadow-primary/20"
          >
            Contacto
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-ink"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
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
          {/* Servicios accordion */}
          <button
            onClick={() => setMobileServiciosOpen(!mobileServiciosOpen)}
            className="w-full flex items-center justify-between py-3 text-sm font-medium text-ink/85 border-b border-gray-100"
          >
            Servicios
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${mobileServiciosOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileServiciosOpen && (
            <div className="py-2 pl-3 border-b border-gray-100">
              {servicios.map(({ href, label, badge }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeAll}
                  className="flex items-center gap-2 py-2.5 text-sm text-ink/75 hover:text-primary transition-colors"
                >
                  {label}
                  {badge && (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                      Soon
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}

          <Link
            href="/#proceso"
            onClick={closeAll}
            className="block py-3 text-sm font-medium text-ink/85 hover:text-primary border-b border-gray-100 transition-colors"
          >
            Cómo trabajamos
          </Link>
          <Link
            href="/#perfil"
            onClick={closeAll}
            className="block py-3 text-sm font-medium text-ink/85 hover:text-primary border-b border-gray-100 transition-colors"
          >
            Liderazgo
          </Link>
          <Link
            href="/#contacto"
            className="mt-4 w-full inline-flex justify-center items-center bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-navy transition-colors"
            onClick={closeAll}
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  )
}
