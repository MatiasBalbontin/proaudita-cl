# Skills del Proyecto — Proaudita

Skills específicas para el dominio contable-tributario chileno y las herramientas del stack de Proaudita.

## Qué es una skill

Un archivo SKILL.md que le dice a Claude Code cómo comportarse en contextos específicos del proyecto. Se instala con `/install-skill` o se referencia directamente en conversaciones.

## Skills disponibles

| Skill | Propósito |
|---|---|
| `tributaria-chile` | **Orquestadora** — auditoría tributaria de extremo a extremo: fotografía, riesgos, optimización legal, monitoreo normativa SII. Coordina las demás sin duplicarlas |
| `contador-cl` | Contexto tributario y contable chileno (SII, Contraloría, normativa local) |
| `nubox` | Integración y operación con Nubox (ERP pymes chilenas) |
| `defontana` | Defontana ERP enterprise — módulos, exportaciones, API, diferencias con Nubox |
| `sii-api` | APIs y servicios web del SII — consultas de RUT, DTE, calendario tributario |
| `propuesta-generator` | Genera propuestas comerciales completas desde notas del diagnóstico |
| `informe-auditoria` | Redacción de informes de hallazgos — tono, severidad, recomendaciones accionables |

## Skills por desarrollar (backlog)

- `lead-qualifier` — califica prospectos según criterios de fit de Proaudita
- `bsale` — ERP para retail/gastronómica, frecuente en clientes de ese rubro
- `email-frio-generator` — genera email frío personalizado a partir de datos del lead

## Cómo agregar una skill nueva

1. Crear carpeta: `skills/[nombre]/`
2. Crear `skills/[nombre]/SKILL.md` con el formato estándar
3. Documentar en este README
