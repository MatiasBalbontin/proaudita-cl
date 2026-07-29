'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Reveal from './Reveal'

type FormData = {
  nombre: string
  empresa: string
  email: string
  mensaje: string
}

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setStatus('sent')
      reset()
    } catch {
      setStatus('error')
    }
  }

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
