import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, empresa, email, mensaje } = body

    // Validación básica server-side
    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido.' },
        { status: 400 }
      )
    }

    const resendKey = process.env.RESEND_API_KEY
    const contactEmail = process.env.CONTACT_EMAIL || 'matiasrbalbontin@gmail.com'

    if (!resendKey) {
      // Modo desarrollo: loguea a consola en lugar de enviar
      console.log('[contact form]', { nombre, empresa, email, mensaje })
      return NextResponse.json({ ok: true, dev: true })
    }

    // Envío real vía Resend
    const { Resend } = await import('resend')
    const resend = new Resend(resendKey)

    const subject = `[Proaudita] Nuevo mensaje de ${nombre}${empresa ? ` — ${empresa}` : ''}`
    const text = [
      `Nombre: ${nombre}`,
      `Empresa: ${empresa || '—'}`,
      `Email: ${email}`,
      '',
      `Mensaje:`,
      mensaje,
      '',
      `---`,
      `Enviado desde proaudita.cl`,
    ].join('\n')

    await resend.emails.send({
      from: 'Proaudita Contacto <contacto@proaudita.cl>',
      to: contactEmail,
      replyTo: email,
      subject,
      text,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Error:', err)
    return NextResponse.json(
      { error: 'Error interno al procesar el mensaje.' },
      { status: 500 }
    )
  }
}
