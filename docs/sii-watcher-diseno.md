# SII Normativa Watcher — Diseño v0

**Proaudita** · Estado: diseño (no implementado) · Card: `sii-normativa-watcher`
Alcance: SOLO diseño. Sin código que corra, sin scheduler, sin scrapers ejecutados, sin credenciales, sin gasto.

> Objetivo: watcher **semanal** que detecte publicaciones nuevas de normativa SII (Circulares, Resoluciones, reajustes UF/UTM) y las resuma como **alertas accionables por cliente/régimen**. Este doc define fuentes, cadencia, formato de alerta y esquema de deduplicación. Alineado con skills `sii-api` y `contador-cl`.

---

## 1. Fuentes oficiales (solo contenido público, sin login)

| Fuente | URL | Qué trae | Frecuencia real |
|---|---|---|---|
| Circulares SII | `https://www.sii.cl/normativa_legislacion/circulares/` (índice por año) | Interpretación oficial de normas, instrucciones | Irregular, varias/mes |
| Resoluciones SII | `https://www.sii.cl/normativa_legislacion/resoluciones/` | Obligaciones formales, DDJJ, plazos, DTE | Irregular, alta en marzo/abril |
| Jurisprudencia administrativa (Oficios) | `https://www.sii.cl/normativa_legislacion/jurisprudencia_administrativa/` | Criterios ante consultas | Semanal |
| Valores UF | `https://www.sii.cl/valores_y_fechas/uf/uf2026.htm` | UF diaria | Diaria |
| Valores UTM / UTA | `https://www.sii.cl/valores_y_fechas/utm/utm2026.htm` | UTM mensual, UTA anual | Mensual |
| Reajustes / tasas de interés y multas | `https://www.sii.cl/valores_y_fechas/` (índice) | Reajuste art.53, tasas | Mensual |

Notas:
- Todo lo anterior es **público**; NO requiere clave tributaria ni certificado. El watcher NUNCA toca portales con login (RCV, MiSII).
- El SII bloquea IPs con muchas requests: **delay ≥ 2s** entre páginas, máx ~6 URLs/corrida (skill `sii-api`, §Limitaciones).
- URLs de índice pueden cambiar de estructura sin aviso → el diseño trata el parseo como frágil y lo aísla (§5).

---

## 2. Cadencia

- **Corrida principal:** semanal, lunes 08:00 CLT. Cubre Circulares, Resoluciones, Oficios.
- **Corrida ligera:** mensual (día 1) para UTM/UTA y reajustes; UF solo se captura si un cálculo la necesita, no como alerta.
- Fuera de alcance v0: tiempo real / diario. Se puede subir cadencia si Matías lo pide (implica más requests → confirmar antes).

---

## 3. Esquema de deduplicación (cómo detectar "nuevo")

Sin dedup, cada corrida re-alertaría todo. Diseño:

1. **Identidad estable por ítem.** Clave natural = `tipo` + `numero` + `anio` (ej. `circular-40-2026`). Si el índice no expone número, fallback a hash SHA-1 de `titulo|fecha|url`.
2. **Índice persistente** `data/sii-watcher/seen.json`: mapa `clave -> {fecha_deteccion, titulo, url, hash}`. (Ruta de datos, NO el repo público; nunca contiene datos de cliente.)
3. **Algoritmo por corrida:**
   - Descargar índice → extraer lista de ítems `{tipo, numero, anio, titulo, fecha, url}`.
   - Para cada ítem: si `clave` no está en `seen.json` → **NUEVO** → generar alerta.
   - Si `clave` existe pero `hash` cambió → **MODIFICADO** → alerta de cambio.
   - Actualizar `seen.json` al final (escritura atómica: temp + rename).
4. **Arranque en frío:** primera corrida marca todo como visto SIN alertar (evita avalancha). Solo desde la 2ª corrida se emiten alertas.
5. **Ventana de gracia:** ignorar ítems con `fecha` > 18 meses (histórico), salvo modificación.

---

## 4. Formato de alerta (accionable por cliente/régimen)

Cada ítem nuevo/modificado produce una alerta. Salida sugerida: fila CSV `data/sii-watcher/alertas.csv` + resumen Markdown para revisión humana.

Campos:

| Campo | Descripción |
|---|---|
| `id` | clave del ítem (ej. `resolucion-95-2026`) |
| `tipo` | Circular / Resolucion / Oficio / Reajuste |
| `fecha_publicacion` | del SII |
| `titulo` | textual del SII |
| `url` | enlace oficial |
| `resumen` | 2–3 líneas, lenguaje ejecutivo (skill `contador-cl`) |
| `afecta_regimenes` | 14A / 14D N°3 / 14D N°8 / 14E / todos |
| `afecta_obligacion` | F29 / F22 / F1887 / DTE / otra |
| `severidad` | 🔴 acción requerida · 🟡 revisar · 🟢 informativo |
| `accion_sugerida` | qué hacer y para qué clientes |
| `clientes_impactados` | (post-cruce con cartera; vacío en v0) |

**Regla de clasificación (borrador):** una Resolución que crea/modifica una DDJJ o plazo → 🔴 para los regímenes que la presentan. Una Circular interpretativa → 🟡. Reajuste UTM/UF → 🟢 salvo que cambie un umbral (ej. UF 75.000 del límite 14D) → 🟡.

Ejemplo:
```
id: resolucion-95-2026
tipo: Resolucion
titulo: Modifica plazo declaración jurada F1887
afecta_regimenes: todos
afecta_obligacion: F1887
severidad: 🔴
accion_sugerida: Avisar a clientes con honorarios; ajustar calendario-obligaciones.csv
```

---

## 5. Arquitectura lógica (para implementación futura, NO ahora)

```
[fetch índice público] --2s delay--> [parse frágil, aislado] --> [dedup vs seen.json]
   --> [clasificar régimen/obligación/severidad] --> [alertas.csv + resumen.md] --> [revisión humana]
```

- **Parseo aislado:** un módulo por fuente; si el SII cambia el HTML, falla solo esa fuente, no todo el watcher. Falla ruidosa (log), nunca silenciosa.
- **Cruce con cartera** (`clientes_impactados`): fase posterior, requiere la lista de clientes y su régimen → NO en v0.
- **Sin credenciales, sin captcha.** Todo lo que requiera login/captcha (RCV, verificación DTE) queda EXCLUIDO por diseño.

---

## 6. Riesgos y puntos que requieren decisión (escalar antes de implementar)

- **Gasto:** si se decide correr scraping real recurrente (infra/scheduler), hay costo → escalar a god/Matías antes de implementar.
- **Robustez legal del scraping:** SII permite consulta pública, pero conviene respetar rate limits y no cargar. Sin credenciales de terceros.
- **Cruce con datos de cliente:** activar `clientes_impactados` toca datos de cartera → tratar como sensible (§4 manual onboarding, Ley 19.628).

---

## 7. Definición de done (v0)

- [x] Doc entregado con fuentes, cadencia, formato de alerta y esquema de dedup.
- [ ] Implementación → fase siguiente, requiere OK explícito (gasto/credenciales).

_Fin diseño v0. No implementar hasta aprobación. Mantener fuentes verificadas — las URLs del SII cambian sin aviso._
