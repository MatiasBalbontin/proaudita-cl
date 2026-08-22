# Guía de Ejecución — Auditoría de Procesos Contables

Servicio 1 de 5. Revisar antes de iniciar cada proyecto de este tipo.

---

## Qué se entrega

- Diagnóstico de brechas entre operación y registro contable
- Mapa de riesgos por proceso
- Informe de hallazgos con severidad y recomendaciones
- Plan de acción priorizado

---

## Fases de ejecución

### Fase 1 — Levantamiento (días 1-5)

**Documentos a solicitar al cliente:**

```
[ ] Libro diario últimos 3 meses (Excel o exportación del software)
[ ] Registro de compras y ventas (últimos 3 períodos F29)
[ ] Plan de cuentas actual
[ ] Organigrama del área contable/administrativa
[ ] Lista de softwares usados (ERP, facturación, remuneraciones)
[ ] Flujo actual del ciclo de facturación (aunque sea en texto)
[ ] Últimas liquidaciones de remuneraciones (3 meses)
[ ] Últimos 3 estados de cuenta bancarios conciliados
```

**Entrevistas:**
- Contador/a principal: 60 min
- Gerente general o dueño: 30 min (foco en contexto del negocio)
- Persona de operaciones si aplica: 30 min

**Preguntas clave para el contador:**
1. ¿Cómo llega la información de las operaciones al registro contable?
2. ¿Qué pasa cuando hay una factura sin respaldo?
3. ¿Cuánto demora hacer la conciliación bancaria mensual?
4. ¿Hay procesos que dependen de una sola persona?
5. ¿Cómo se controlan los gastos de caja chica y tarjetas corporativas?

---

### Fase 2 — Análisis (días 6-12)

**Revisiones obligatorias:**

**A. Cuadratura del libro diario**
- Verificar que Debe = Haber en cada asiento
- Identificar asientos sin descripción o con descripción genérica
- Buscar asientos duplicados (mismo monto, misma cuenta, misma fecha)

**B. Revisión de cuentas de control**
- CxC vs facturas emitidas pendientes de pago
- CxP vs facturas recibidas pendientes de pago
- IVA CF vs registro de compras
- IVA DF vs registro de ventas
- Comparar IVA declarado en F29 vs lo que muestran los libros

**C. Análisis de gastos**
- Identificar gastos sin documento de respaldo (estimados o "internos")
- Revisar si los gastos de socios/dueños están separados de los de la empresa
- Verificar que los gastos del período corresponden al período (devengo vs caja)

**D. Ciclo de remuneraciones**
- Liquidaciones cuadran con las retenciones declaradas en F29
- Cotizaciones previsionales pagadas en fecha
- Finiquitos emitidos correctamente si hay desvinculaciones

**E. Mapeo de riesgos**
```
Nivel ALTO   → impacto directo en declaraciones SII o estados financieros
Nivel MEDIO  → genera ineficiencias o errores potenciales
Nivel BAJO   → oportunidades de mejora sin riesgo inmediato
```

---

### Fase 3 — Informe y presentación (días 13-15)

Ver template completo en `../template-informe-hallazgos.md`.

**Estructura del informe:**
1. Resumen ejecutivo (1 página)
2. Hallazgos por área (ordenados por severidad)
3. Plan de acción recomendado (con plazos y responsables)
4. Anexos: tablas de análisis, ejemplos de asientos revisados

**Presentación al cliente:**
- Duración: 60 min
- Formato: PDF del informe + presentación simple (máx 10 slides)
- Tono: hallazgos como oportunidades, no como críticas
- Cerrar con: "¿Quieren que acompañemos la implementación?"

---

## Señales de alerta durante el proyecto

- El cliente tarda más de 5 días en entregar documentos → escalar, no esperar
- El contador se pone defensivo → abordar directamente: "no auditamos personas, auditamos procesos"
- Hay documentos que "no existen" → documentar en el informe como hallazgo
- El alcance crece durante el proyecto → parar y renegociar antes de continuar

---

## Precio de referencia

| Tamaño empresa | Alcance típico | Rango precio |
|---|---|---|
| Pequeña (< 50 empleados) | 1 área, 3 meses | $800.000 – $1.500.000 CLP |
| Mediana (50-200 empleados) | 2-3 áreas, 6 meses | $2.000.000 – $4.000.000 CLP |
| Grande (> 200 empleados) | Full scope | Cotizar por proyecto |
