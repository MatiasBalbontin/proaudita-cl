# Manual de Procedimiento — Integración de Clientes (Onboarding Tributario)

**Proaudita** · Versión 1.0 · Uso interno
Aplica a: todo cliente nuevo que contrata auditoría de procesos, auditoría externa, planificación tributaria o automatización contable.

> Este manual define **cómo** se incorpora un cliente desde que firma hasta que queda operativo con diagnóstico tributario entregado. Usa la terminología de las skills `contador-cl`, `sii-api` e `informe-auditoria`. No inventar términos: régimen 14A/14D, F29/F22/F1887, DTE, etc.

---

## 0. Índice

1. Roles y principios
2. Fases del onboarding (checklist maestro)
3. Documentación a solicitar al cliente
4. Administración segura de credenciales y accesos
5. Ruta de planificación tributaria (5 etapas)
6. Planillas de salida para NotebookLM
7. Prompts NotebookLM (presentaciones, mapas mentales, informes, briefs)
8. Criterios de cierre del onboarding

---

## 1. Roles y principios

| Rol | Responsable | Qué hace en el onboarding |
|---|---|---|
| Líder de cuenta | Matías | Firma, kickoff, relación con el cliente, valida entregables |
| Analista tributario | Consultor Proaudita | Recolecta docs, revisa F29/F22, arma diagnóstico |
| Agente Claude | Skills del repo | Estructura datos, redacta borradores, genera planillas y prompts |

**Principios:**
- **Consentimiento explícito por escrito** antes de acceder a cualquier plataforma del cliente (SII, banco, ERP). Sin correo/mandato firmado, no se accede.
- **Mínimo privilegio.** Se pide solo el acceso necesario para la fase actual, no acceso total "por si acaso".
- **Trazabilidad.** Cada documento recibido y cada acceso otorgado queda registrado en la planilla `registro-accesos.csv`.
- **Datos del cliente ≠ repo público.** Nada de RUT, claves, ni estados financieros se sube al repositorio ni a servicios sin control. Ver §4.

---

## 2. Fases del onboarding — checklist maestro

| Fase | Objetivo | Salida | Plazo objetivo |
|---|---|---|---|
| **F1. Kickoff** | Alinear alcance y expectativas | Acta de kickoff + accesos autorizados | Día 0 |
| **F2. Recolección** | Reunir documentación (§3) | Carpeta cliente completa + `checklist-documentos.csv` | Día 1–5 |
| **F3. Carga de datos** | Estructurar info para análisis | Planillas §6 llenas + notebook en NotebookLM | Día 5–7 |
| **F4. Diagnóstico** | Detectar riesgos/obligaciones/oportunidades | Informe de hallazgos (skill `informe-auditoria`) | Día 7–14 |
| **F5. Ruta tributaria** | Plan de optimización legal | Ruta de planificación (§5) + tareas/alertas | Día 14–21 |
| **F6. Entrega** | Presentar al cliente | Presentación + informe + mapa mental (§7) | Día 21 |

**Regla de avance:** no se pasa de fase sin la salida de la anterior. F3 no arranca hasta que `checklist-documentos.csv` esté ≥ 90% completo.

---

## 3. Documentación a solicitar al cliente

Se solicita por correo con la firma de Proaudita, referenciando este listado. El cliente confirma cada ítem en `checklist-documentos.csv`.

### 3.1 Identificación y societario
- [ ] RUT de la empresa (e-RUT / cédula RUT).
- [ ] Escritura de constitución y modificaciones vigentes.
- [ ] Inicio de actividades ante el SII (fecha y códigos de actividad económica).
- [ ] Composición societaria actual (socios, % participación, RUT de cada socio).
- [ ] Poderes vigentes (quién puede firmar / representar).

### 3.2 Régimen y situación tributaria
- [ ] **Régimen tributario vigente** (14A, 14D N°3, 14D N°8, 14E). Confirmar en Carpeta Tributaria SII.
- [ ] Carpeta Tributaria Electrónica del SII (para créditos / general) — PDF descargado.
- [ ] Últimas **12 declaraciones F29** (IVA + PPM + retenciones).
- [ ] Últimas **2 declaraciones anuales F22** con sus recuadros.
- [ ] Declaraciones juradas presentadas (F1887 honorarios, F1879, F1847, etc. según aplique).
- [ ] Situación de deuda / convenios con Tesorería (TGR), si existe.
- [ ] Observaciones, requerimientos o fiscalizaciones del SII vigentes o pasadas (últimos 3 años).

### 3.3 Contabilidad y estados financieros
- [ ] Balance clasificado y Estado de Resultados de los **2 últimos ejercicios**.
- [ ] Balance de comprobación y saldos (8 columnas) del período en curso.
- [ ] Libro Mayor y Libro Diario (o export del ERP: Nubox / Defontana / Bsale).
- [ ] Libro de compras y ventas (o registro de DTE) últimos 12 meses.
- [ ] Detalle de activos fijos y su depreciación.
- [ ] Provisiones y pasivos contingentes conocidos.

### 3.4 Operación y respaldo
- [ ] Nómina de remuneraciones (últimos 3 meses) y contratos vigentes.
- [ ] Contratos relevantes (arriendos, leasing, financiamiento, con partes relacionadas).
- [ ] Detalle de gastos rechazados históricos, si los hay.
- [ ] Facturas de mayor monto del período (muestra para revisión de gasto necesario).

### 3.5 Accesos (ver §4 antes de pedirlos)
- [ ] Acceso o export de la **Carpeta Tributaria SII** (preferir export, no clave).
- [ ] Acceso de solo lectura al ERP contable.
- [ ] Cartola bancaria últimos 3 meses (export, no credenciales de banca).

> **Nunca** solicitar la clave tributaria del SII ni la clave de banca por correo o chat. Si se requiere operar en el SII, se hace vía **mandato / representación electrónica** o con el cliente en pantalla compartida. Ver §4.

---

## 4. Administración segura de credenciales y accesos

**Objetivo:** obtener lo necesario sin custodiar secretos que no debemos custodiar.

### 4.1 Jerarquía de acceso (preferir de arriba hacia abajo)
1. **Export de datos** entregado por el cliente (PDF/CSV). No hay secreto que guardar. **Preferido.**
2. **Representación electrónica SII** (el cliente designa a Proaudita como representante). Acceso auditable, revocable, sin compartir clave.
3. **Usuario de solo lectura** creado por el cliente en su ERP.
4. **Sesión asistida** (pantalla compartida, el cliente teclea su clave). Nada se almacena.
5. **Credencial compartida** — solo si es inevitable y autorizado por escrito. Último recurso.

### 4.2 Reglas
- Credenciales **jamás** en el repositorio, en correo plano, en chat, ni en las planillas de NotebookLM.
- Si hay que guardar un secreto (nivel 5), va en gestor de contraseñas cifrado, con acceso solo del líder de cuenta.
- Toda concesión y revocación de acceso se registra en `registro-accesos.csv` (§6).
- Al cerrar el proyecto o cambiar de fase: **revocar** accesos que ya no se usan.
- RUT y datos personales: tratarlos como dato sensible (Ley 19.628 / actualización de protección de datos). No compartir con terceros sin base legal.

### 4.3 Qué NUNCA hacer
- Pedir clave tributaria o de banca por correo/WhatsApp.
- Reutilizar la credencial de un cliente para consultar datos de otro.
- Dejar sesiones abiertas en equipos compartidos.
- Subir Carpeta Tributaria o estados financieros a servicios de IA sin confirmar tratamiento de datos y sin anonimizar lo que no sea necesario.

---

## 5. Ruta de planificación tributaria

Secuencia estándar tras el diagnóstico (F4). Cada etapa produce entradas para las planillas §6 y para las alertas/tareas.

### Etapa 1 — Fotografía tributaria
- Confirmar régimen vigente y si es el óptimo para el nivel de ingresos (UF 75.000 es el umbral clave 14D).
- Mapear todas las obligaciones periódicas del cliente (F29 mensual, F22 anual, DDJJ, PPM).
- Salida: `calendario-obligaciones.csv`.

### Etapa 2 — Detección de riesgos y contingencias
- Revisar F29 vs libros: descuadres de IVA crédito/débito.
- Gastos rechazados y gastos sin respaldo (riesgo de agregar a la renta).
- Retenciones no declaradas (segunda categoría / honorarios).
- Créditos fiscales de DTE rechazadas o improcedentes.
- Clasificar severidad 🔴/🟡/🟢 según skill `informe-auditoria`.
- Salida: filas en `hallazgos.csv` con tipo = "riesgo".

### Etapa 3 — Detección de oportunidades de optimización (marco legal)
Solo optimización **dentro del marco legal** (planificación, no elusión agresiva):
- ¿El régimen actual es el que minimiza carga? Evaluar cambio 14A ↔ 14D según proyección de ingresos.
- Uso correcto de PPM y créditos disponibles.
- Depreciación acelerada / instantánea cuando aplique.
- Gastos que sí califican como necesarios y no se están deduciendo.
- Postergación de IVA (beneficio pyme) si califica.
- Reorganización societaria solo si hay fundamento económico real.
- Salida: filas en `hallazgos.csv` con tipo = "oportunidad" + estimación de ahorro.

### Etapa 4 — Plan de acción
- Cada riesgo → tarea correctiva con responsable y plazo.
- Cada oportunidad → acción con ahorro estimado y requisito legal.
- Alertas de vencimiento conectadas al `calendario-obligaciones.csv`.
- Salida: `plan-accion.csv`.

### Etapa 5 — Monitoreo continuo
- Seguimiento de Circulares/Resoluciones SII que afecten al cliente (skill `sii-api` / scraping).
- Recalcular ruta si cambian ingresos, normativa o estructura.
- Revisión trimestral mínima.

---

## 6. Planillas de salida para NotebookLM

NotebookLM ingiere mejor **CSV plano + Markdown** que PDF. Las planillas viven en `docs/planillas/` y se cargan como *sources* al notebook del cliente. Los prompts (§7) citan los nombres de columna exactos.

| Planilla | Archivo | Para qué |
|---|---|---|
| Checklist de documentos | `planillas/checklist-documentos.csv` | Estado de recolección (F2) |
| Registro de accesos | `planillas/registro-accesos.csv` | Trazabilidad de credenciales (§4) |
| Calendario de obligaciones | `planillas/calendario-obligaciones.csv` | Vencimientos y alertas |
| Hallazgos | `planillas/hallazgos.csv` | Riesgos y oportunidades |
| Plan de acción | `planillas/plan-accion.csv` | Tareas correctivas y de optimización |

Ver plantillas con encabezados y una fila de ejemplo en `docs/planillas/`.

**Regla de anonimización:** antes de cargar a NotebookLM, reemplazar RUT completo por RUT parcial (ej. `76.***.***-K`) salvo que el tratamiento de datos esté cubierto por el mandato del cliente.

---

## 7. Prompts para NotebookLM

Cargar primero las planillas (§6) y el informe de hallazgos como *sources*. Luego usar estos prompts. Citan columnas exactas para que la respuesta sea fiel.

### 7.1 Presentación ejecutiva (para reunión de entrega)
```
Actúa como consultor tributario de Proaudita. Con base EN LAS FUENTES cargadas
(hallazgos.csv, plan-accion.csv, calendario-obligaciones.csv), genera el guion de
una presentación ejecutiva de 8–10 láminas para el gerente/dueño (no técnico).
Estructura:
1. Situación tributaria actual (régimen, obligaciones)
2. Riesgos detectados — ordenados por severidad (columna 'severidad': ALTO>MEDIO>BAJO),
   con el impacto en $ de la columna 'impacto_clp'
3. Oportunidades de ahorro legal (filas tipo='oportunidad') con 'ahorro_estimado_clp'
4. Plan de acción con responsables y plazos (de plan-accion.csv)
5. Próximos pasos y calendario
Tono: ejecutivo, directo, propositivo. Sin jerga contable innecesaria.
No inventes cifras que no estén en las fuentes.
```

### 7.2 Mapa mental
```
Genera un mapa mental en formato Markdown (lista jerárquica anidada) del diagnóstico
tributario del cliente, usando SOLO las fuentes. Nodo raíz = nombre del cliente.
Ramas nivel 1: Régimen y obligaciones | Riesgos | Oportunidades | Plan de acción.
Bajo Riesgos y Oportunidades, un nodo por cada fila de hallazgos.csv, etiquetado con
'titulo' y su 'severidad' o 'ahorro_estimado_clp'. Formato listo para Markmap/XMind.
```

### 7.3 Informe de hallazgos (borrador)
```
Redacta el informe de hallazgos siguiendo el estilo Proaudita: cada hallazgo describe
QUÉ pasó, CUÁNTO ocurrió (magnitud/frecuencia) y el IMPACTO en cifras reales. Tono
objetivo, no acusatorio; directo; cada hallazgo con una recomendación concreta.
Usa hallazgos.csv: agrupa por 'severidad' (🔴 ALTO, 🟡 MEDIO, 🟢 BAJO) y para cada uno
toma 'titulo', 'descripcion', 'impacto_clp' y 'recomendacion'. Cierra con un resumen
ejecutivo de 5 líneas. No suavices la severidad con eufemismos.
```

### 7.4 Brief de calendario / alertas
```
Con calendario-obligaciones.csv, arma un brief de cumplimiento para los próximos 90 días.
Lista cada obligación con 'formulario', 'periodicidad' y 'proxima_fecha', ordenada por
fecha ascendente. Marca 🔴 las que vencen en < 15 días. Al final, sugiere qué alertas
programar.
```

### 7.5 Resumen para el cliente (audio/podcast NotebookLM)
```
Genera un resumen conversacional de 3 minutos del diagnóstico tributario, apto para el
"Audio Overview" de NotebookLM, dirigido al dueño de la empresa. Prioriza: 2 riesgos más
graves (mayor 'impacto_clp') y las 2 oportunidades de mayor 'ahorro_estimado_clp'.
Lenguaje simple, sin tecnicismos. Cierra con la única acción más urgente.
```

---

## 8. Criterios de cierre del onboarding

El onboarding se considera completo cuando:
- [ ] `checklist-documentos.csv` ≥ 90% en estado "recibido".
- [ ] Accesos otorgados y registrados; los innecesarios, revocados.
- [ ] Planillas §6 cargadas al notebook del cliente en NotebookLM.
- [ ] Informe de hallazgos entregado y presentado.
- [ ] Ruta de planificación tributaria (§5) con plan de acción y alertas activas.
- [ ] Revisión trimestral agendada.

---

_Fin del manual. Mantener alineado con las skills `contador-cl`, `sii-api`, `informe-auditoria`. Cualquier cambio de régimen tributario o normativa SII se refleja aquí._
