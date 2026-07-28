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
    <section id="contacto" className="relative py-28 bg-surface overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-0 w-[28rem] h-[28rem] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #0019FF 0%, transparent 70%)' }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Contacto
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              Conversemos sobre tu organización
            </h2>
            <p className="mt-4 text-muted text-lg leading-relaxed">
              El diagnóstico inicial es gratuito y sin compromiso. En 30
              minutos entiendo tu situación y te digo honestamente si puedo
              ayudarte.
            </p>
          </div>
        </Reveal>

        {/* Dominant CTA — Cal.com */}
        <Reveal delay={80}>
          <a
            href="https://app.cal.com/matiasbalbontin"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-primary p-10 sm:p-12 text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all"
          >
            <div
              aria-hidden="true"
              className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                  Vía Cal.com · 30 minutos · sin costo
                </p>
                <p className="mt-2 font-grotesk font-semibold text-2xl sm:text-3xl">
                  Agendar diagnóstico gratuito
                </p>
                <p className="mt-2 text-white/80 text-sm max-w-md">
                  El camino más directo. Eliges el horario que te acomode y
                  conversamos sin vueltas.
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3.5 rounded-xl group-hover:bg-white/90 transition-colors">
                Ver horarios
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </span>
            </div>
          </a>
        </Reveal>

        {/* Secondary + tertiary */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[minmax(0,20rem)_1fr] items-start gap-6">
          {/* WhatsApp — secondary, compact */}
          <Reveal delay={140}>
            <a
              href="https://wa.me/56994388261?text=Hola%20Mat%C3%ADas%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20servicios%20de%20Proaudita."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 h-full p-5 bg-white rounded-2xl border border-gray-200 hover:border-green-400/50 hover:shadow-sm transition-all"
            >
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="font-grotesk font-semibold text-ink text-sm group-hover:text-green-700 transition-colors">
                  Prefiero escribir por WhatsApp
                </p>
                <p className="text-muted text-xs mt-0.5">+56 9 9438 8261</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-auto text-muted group-hover:text-green-600 transition-colors" aria-hidden="true">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </a>
          </Reveal>

          {/* Form — tertiary */}
          <Reveal delay={200}>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-7">
              <h3 className="font-grotesk font-semibold text-ink text-sm mb-1">
                ¿Prefieres dejar tus datos primero?
              </h3>
              <p className="text-muted text-xs mb-5">
                Te respondo dentro de las próximas 24 horas.
              </p>

              {status === 'sent' ? (
                <div className="text-center py-6">
                  <div className="w-11 h-11 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-grotesk font-semibold text-ink text-sm">¡Mensaje enviado!</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 text-sm text-primary hover:text-navy font-medium transition-colors"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-1">
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

                  <div className="sm:col-span-1">
                    <label htmlFor="empresa" className="block text-sm font-medium text-ink mb-1.5">
                      Empresa u organización
                    </label>
                    <input
                      id="empresa"
                      type="text"
                      autoComplete="organization"
                      {...register('empresa')}
                      className="w-full rounded-xl border border-gray-200 hover:border-gray-300 px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      placeholder="Nombre (opcional)"
                    />
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
                      placeholder="tu@email.cl"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="mensaje" className="block text-sm font-medium text-ink mb-1.5">
                      ¿Cuál es tu desafío? *
                    </label>
                    <textarea
                      id="mensaje"
                      rows={3}
                      {...register('mensaje', { required: 'Cuéntame tu desafío' })}
                      className={`w-full rounded-xl border px-4 py-2.5 text-sm text-ink bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none ${
                        errors.mensaje ? 'border-red-400' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      placeholder="Describe brevemente qué está pasando en tu organización..."
                    />
                    {errors.mensaje && (
                      <p className="mt-1 text-xs text-red-500" role="alert">{errors.mensaje.message}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <p className="sm:col-span-2 text-sm text-red-500 bg-red-50 rounded-xl px-4 py-3" role="alert">
                      Hubo un error al enviar el mensaje. Intenta por WhatsApp o escríbeme directo.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="sm:col-span-2 bg-white text-primary border border-primary/25 font-semibold text-sm px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
