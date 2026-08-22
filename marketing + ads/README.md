# Marketing + Ads — Proaudita

Automatización de captación, contenido y publicidad para Proaudita.

## Objetivo

Construir una máquina de captación que opere en gran medida de forma autónoma:
- **Inbound** → LinkedIn + SEO + blog → prospectos que llegan solos
- **Outbound** → email frío + WhatsApp → prospectos que buscamos nosotros
- **Pago** → Google Ads / LinkedIn Ads cuando el flujo orgánico esté validado

## Estructura

```
marketing + ads/
├── calendario-editorial/    → plan de contenido semana a semana
├── linkedin/                → plantillas, posts, hooks, carruseles
├── email-frio/              → templates de prospección outbound
└── google-ads/              → copys de anuncios, audiencias, estrategia
```

## Canales prioritarios (en orden)

| Prioridad | Canal | Objetivo | Herramienta |
|---|---|---|---|
| 1 | LinkedIn orgánico | Autoridad + inbound | Buffer / n8n |
| 2 | Email frío | Prospectos directos | Scripts/ |
| 3 | WhatsApp | Seguimiento leads | Manual + plantillas |
| 4 | Google Ads | Escalar (fase 2) | Google Ads |
| 5 | LinkedIn Ads | Retargeting (fase 3) | LinkedIn Ads |

## Métricas que importan

- Visitas al sitio referidas desde LinkedIn → semana
- Formularios enviados desde el sitio → semana
- Agendamientos desde Cal.com → mes
- Tasa apertura emails fríos → > 30% es buen número
- Costo por lead (cuando se activen Ads)

## Reglas de marca para todo contenido

- Tagline exacto: "Auditoría estratégica. Resultados medibles."
- Tono: directo, técnico sin ser aburrido, confianza sin arrogancia
- No usar: "recursos energéticos", testimonios fabricados, jerga tributaria pesada
- Siempre CTA claro: agendar en Cal.com o escribir al WhatsApp
- Evitar posts motivacionales genéricos — todo debe aportar valor técnico real
