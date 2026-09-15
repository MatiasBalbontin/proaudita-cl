// ────────────────────────────────────────────────────────────────
//  Cinta promocional (barra azul scrolleable arriba del sitio)
//
//  APAGAR:  poné  activa: false   (la cinta desaparece y los
//           espaciados del sitio se ajustan solos).
//  EDITAR:  cambiá los textos / monto / mensaje de WhatsApp acá.
// ────────────────────────────────────────────────────────────────
export const promo = {
  activa: true,

  // Texto que va ANTES del monto destacado
  antes:
    'Por período limitado — agenda una reunión y cotiza tu plan de contabilidad desde',

  // Monto destacado (en negrita)
  monto: '$50.000',

  // Texto que va DESPUÉS del monto
  despues: 'mensuales',

  // Llamado a la acción al final
  cta: 'Escríbenos por WhatsApp',

  // WhatsApp al que deriva la cinta
  whatsappNumero: '56994388261',
  whatsappMensaje:
    'Hola, vengo por la promoción: quiero agendar una reunión y cotizar mi plan de contabilidad desde $50.000 mensuales.',
}
