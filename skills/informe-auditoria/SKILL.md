---
name: informe-auditoria
description: Skill para redactar informes de hallazgos de auditoría de Proaudita. Toma las notas del análisis y produce el informe completo siguiendo el template estándar, con el tono y estructura correctos.
---

# Skill: informe-auditoria

Cuando esta skill está activa, redactas informes de hallazgos de auditoría para Proaudita. El informe es el entregable principal del proyecto — su calidad es lo que el cliente recuerda.

## Principios del buen informe de hallazgos

### Tono
- **Objetivo, no acusatorio.** Los hallazgos describen situaciones del proceso, no errores de personas.
- **Directo, no evasivo.** Si algo está mal, decirlo con claridad. No esconder severidad con eufemismos.
- **Propositivo, no solo crítico.** Cada hallazgo lleva una recomendación concreta.
- **Ejecutivo, no técnico en exceso.** El lector es el gerente o dueño, no solo el contador.

### Estructura de un hallazgo bien escrito

**Mal:**
> "Se detectaron inconsistencias en los registros contables relacionados con el proceso de facturación que podrían generar eventuales situaciones de no conformidad ante la autoridad tributaria."

**Bien:**
> "Las facturas de proveedores se registran contablemente antes de ser aprobadas por el área de administración. En 23 de los 140 casos revisados, el registro se hizo sobre facturas que luego fueron rechazadas — pero el ajuste nunca se anotó. Esto genera IVA crédito fiscal que no corresponde: $4.2M en el período revisado."

La diferencia: el segundo dice qué pasó, cuánto ocurrió, y cuál es el impacto en números reales.

---

## Cómo clasificar la severidad

### 🔴 ALTO — impacto directo y verificable

Usar cuando:
- Hay riesgo de multa o recargo del SII ya materializado o muy probable
- Los estados financieros muestran cifras incorrectas que afectan decisiones
- Hay potencial de fraude o mal uso de recursos (sin acusar — describir la exposición)
- El problema existe hace más de 3 meses y nadie lo detectó

Ejemplos:
- IVA crédito fiscal registrado de facturas rechazadas
- Gastos sin respaldo declarados como necesarios para producir la renta
- Retenciones de segunda categoría no declaradas

### 🟡 MEDIO — riesgo latente o ineficiencia significativa

Usar cuando:
- El problema no genera consecuencias inmediatas pero podría en el próximo ejercicio
- Hay duplicación de trabajo o demoras que tienen costo operacional medible
- Los controles existen pero no se aplican consistentemente

Ejemplos:
- Conciliaciones bancarias con 2+ meses de retraso
- Documentos de respaldo incompletos pero presentes
- Procesos que dependen de una sola persona sin backup

### 🟢 BAJO — oportunidad de mejora

Usar cuando:
- El riesgo es mínimo pero hay espacio para hacer las cosas mejor
- La mejora genera eficiencia pero no es urgente
- Son buenas prácticas que el cliente debería conocer

Ejemplos:
- Nomenclatura inconsistente en los asientos contables
- Falta de política escrita para algo que se hace bien en la práctica
- Software con funcionalidades no utilizadas que ahorrarían tiempo

---

## Cómo escribir recomendaciones que se implementan

Una recomendación que no se implementa no tiene valor. Para que sean accionables:

1. **Especificar quién** (cargo, no nombre — los nombres cambian)
2. **Especificar qué exactamente** (no "mejorar el proceso" — "agregar un paso de validación antes de registrar contablemente la factura")
3. **Especificar cuándo** (fecha concreta o plazo desde la entrega del informe)
4. **Especificar cómo verificar** que se implementó (qué evidencia existe)

**Mal:** "Se recomienda mejorar el control de facturas de proveedores."

**Bien:** "El área de administración debe aprobar (firma o aprobación digital) cada factura de proveedor antes de que el contador la registre contablemente. Plazo de implementación: 30 días. Evidencia: flujo de trabajo en el software contable o registro de aprobaciones."

---

## Cómo calcular impactos en CLP

Siempre que sea posible, cuantificar:

- **IVA en riesgo:** suma de IVA CF de facturas con problemas
- **Gastos rechazados potenciales:** monto de gastos sin respaldo × tasa de impuesto (25% o 27%)
- **Costo de ineficiencia:** horas estimadas × costo hora de la persona que hace el trabajo manual
- **Multa potencial SII:** consultar tabla de multas en Código Tributario (art. 97) según el tipo de infracción

---

## Resumen ejecutivo — estructura interna

El resumen ejecutivo lo lee alguien que no tiene tiempo para leer el resto. Debe responder:

1. ¿Qué se revisó? (alcance en 1 oración)
2. ¿Qué tan grave es la situación? (número de hallazgos por severidad)
3. ¿Cuál es el más importante y por qué? (1 párrafo)
4. ¿Qué tiene que pasar ahora? (1-2 acciones prioritarias)

No repetir todos los hallazgos en el resumen. El resumen orienta, el cuerpo del informe detalla.
