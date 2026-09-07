---
name: propuesta-generator
description: Skill para generar propuestas comerciales completas de Proaudita a partir de las notas del diagnóstico. Toma el formulario de diagnóstico completado y produce el contenido listo para el template de propuesta.
---

# Skill: propuesta-generator

Cuando esta skill está activa, generas propuestas comerciales para Proaudita a partir de las notas del diagnóstico del cliente. No debes pedir más información de la que ya está en el formulario — trabaja con lo que hay.

## Cómo usar esta skill

1. El usuario pega las notas del diagnóstico (formulario de `procedimientos y procesos/formularios/diagnostico-inicial.md`)
2. Tú generas el contenido completo para cada sección del template de propuesta
3. El usuario copia el contenido al template Word/Google Docs y ajusta formato

## Proceso de generación

### Paso 1 — Clasificar el caso

Leer las notas y determinar:
- **Servicio principal:** cuál de los 5 servicios de Proaudita aplica mejor
- **Tamaño del cliente:** pequeño / mediano / grande
- **Urgencia:** alta / media / baja
- **Fit:** alto / medio / bajo (si es bajo, no generar propuesta — avisar)

### Paso 2 — Construir el resumen ejecutivo

Reflejar el problema **en las palabras del cliente**, no en jerga contable. Si el cliente dijo "nuestros números no cuadran con lo que pasa en la operación", usar esa frase como punto de partida.

Estructura del párrafo:
1. El contexto de la empresa (rubro, tamaño)
2. El problema que expresaron
3. El riesgo si no se resuelve
4. Proaudita como solución

### Paso 3 — Definir el alcance

Basarse en el servicio clasificado en el Paso 1. Usar las guías de ejecución para definir qué incluye y qué no.

**Regla de oro del alcance:** ser específico siempre. "Revisión del libro diario de los últimos 6 meses" es mejor que "revisión contable". El cliente sabe exactamente qué va a recibir y el proyecto no crece sin control.

### Paso 4 — Estimar el precio

Usar las tablas de precio de referencia de las guías de ejecución. Si hay duda, ir al rango medio. Si el cliente es grande y complejo, ir al rango alto.

**Nunca dar precio gratis.** Si el diagnóstico revela que el problema es pequeño y no justifica el servicio mínimo, decirlo honestamente y no generar propuesta.

### Paso 5 — Definir el plazo

Basarse en el tamaño del cliente y el alcance. Ser conservador — mejor entregar antes que comprometerse a algo imposible.

---

## Ejemplo de generación

**Input (notas del diagnóstico):**
```
Empresa: Constructora XYZ Ltda.
Rubro: constructora
Tamaño: 80 empleados, facturación ~$1.200M CLP/año
Problema: "Nuestro contador externo dice que todo está bien pero tuvimos un problema con el IVA crédito fiscal el año pasado que costó $8M en multas. No sabemos por qué pasó y no queremos que vuelva a pasar."
Urgencia: media (quieren empezar después de las fiestas)
Fit: alto
```

**Output generado:**

**Resumen ejecutivo:**
> Constructora XYZ es una empresa mediana del sector construcción con 80 personas y facturación anual cercana a $1.200M CLP. En el ejercicio anterior, un problema con el IVA crédito fiscal derivó en multas por $8M, sin que pudiera identificarse la causa raíz. El objetivo de este proyecto es auditar el proceso que genera los registros de IVA — desde la recepción de facturas de proveedores hasta la declaración del F29 — para encontrar el punto de falla y asegurarse de que no vuelva a ocurrir.
>
> Proaudita propone una auditoría de procesos contables enfocada en el ciclo de IVA y el proceso de facturación de proveedores, con entrega de un informe de hallazgos y un plan de acción concreto.

**Alcance:**
- Revisión del ciclo completo de IVA crédito fiscal: recepción, validación, registro y declaración
- Análisis de los 12 meses previos de libro de compras vs F29 declarados
- Identificación del punto de falla del año anterior
- Revisión del proceso de aprobación de facturas de proveedores
- Entrevistas con el contador externo y el área de administración
- Informe de hallazgos con severidad y plan de acción
- Reunión de presentación de resultados (60 min)

**No incluye:**
- Auditoría del área de remuneraciones (puede incluirse en fase 2 si se detectan señales)
- Corrección de declaraciones anteriores (eso requiere proceso separado ante el SII)

**Precio:** $2.200.000 CLP + IVA
**Plazo:** 4 semanas desde firma de contrato y entrega de documentos

---

## Qué NO hacer al generar propuestas

- No inventar problemas que el cliente no mencionó
- No prometer resultados específicos ("te ahorraremos $X") — prometer el proceso, no el resultado
- No usar el precio más bajo si el alcance es amplio — subestimar el precio es peor que perder el cliente
- No incluir más de 5 entregables — las propuestas largas confunden
- No copiar textualmente el formulario de diagnóstico — reescribir con tono propositivo
