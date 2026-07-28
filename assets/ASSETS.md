# Assets — qué imágenes necesita el sitio

## Estado actual

Todo lo visual del sitio hoy es **código** (SVG inline + CSS): el logo, el ícono/favicon,
la imagen OG, el mark de "tres disciplinas" en el Hero, los patrones de fondo. No hay
ninguna imagen rasterizada (JPG/PNG) en el proyecto todavía. Eso es intencional — evita
el look "stock photo genérico" — pero hay dos puntos donde una imagen real sube
sustancialmente la percepción de calidad y no se puede resolver con código: la foto de
Matías y el logo definitivo.

Esta carpeta (`assets/`) es un área de trabajo, **no se sirve en el sitio**. Las imágenes
finales optimizadas van a `public/` una vez procesadas. Dentro de `assets/`:

```
assets/
  logos/source/    ← deja aquí tus logos preliminares (cualquier formato)
  photos/source/   ← deja aquí la foto profesional cuando la tengas
```

---

## 1. Foto profesional (perfil) — mayor impacto, pendiente

| | |
|---|---|
| **Dónde se usa** | `components/Profile.tsx` — hoy es un placeholder con iniciales "MB" en gradiente |
| **Qué se necesita** | Foto profesional de Matías, fondo neutro o desenfocado, buena luz |
| **Formato/specs** | JPG o WEBP, mínimo 800×800px (cuadrada) o 800×1000 (retrato), &lt;300KB |
| **Estado** | Pendiente — ya listado en CLAUDE.md como pendiente del usuario |
| **Acción** | Cuando la tengas, colócala en `assets/photos/source/` y la integro con `next/image` (recorte, `alt` descriptivo, optimización automática) |

Sin esto, el placeholder de iniciales queda como fallback razonable — no es un bloqueador
para lanzar, pero es la imagen de mayor impacto en confianza/conversión de todo el sitio.

## 2. Logo definitivo — resuelto

| | |
|---|---|
| **Dónde se usa** | `components/Logo.tsx` (wordmark, navbar/footer), `components/Monogram.tsx` (ícono "pa"), `app/icon.tsx` (favicon), `app/opengraph-image.tsx` |
| **Estado actual** | Las capturas en `assets/logos/source/` se vectorizaron (potrace) y quedaron como paths SVG reales en `lib/brand-marks.ts` — no son las imágenes originales, son curvas vectoriales fieles a esas formas, con el gradiente `#0019FF → #1A1A5E` aplicado |
| **Decisión tomada** | Se evaluaron como "solo inspiración" en un principio; al revisarlas se confirmó que el diseño (tipografía geométrica a medida, corte diagonal en ascendentes de "d"/"t") es sólido y se formalizó como el logo oficial |
| **Pendiente real** | Ninguno — el logo actual ya es la versión definitiva en todos los puntos de uso del sitio |

## 3. Lo que NO necesita imágenes (ya resuelto en código, a propósito)

- Favicon e ícono de app → generados con `next/og` (`app/icon.tsx`)
- Imagen Open Graph / redes sociales → generada con `next/og` (`app/opengraph-image.tsx`)
- Iconografía de servicios → SVG inline (Heroicons-style, ya en `components/Services.tsx`)
- Texturas y fondos (grain, grid, blobs) → CSS puro (`app/globals.css`, `tailwind.config.ts`)

Mantener esto en código (no imágenes) es deliberado: pesa menos, escala mejor, y es
consistente en todos los tamaños de pantalla sin exportar múltiples resoluciones.

## 4. Opcional / fase 2 (no bloquea nada ahora)

- Imagen o ilustración de apoyo para el blog/insights cuando exista (fase 2 de CONTEXT.md)
- Fotos de contexto si en algún momento se agregan casos de éxito documentados (hoy
  explícitamente descartado — "Ninguno en fase 1" según CONTEXT.md)

---

## Decisión de marca actualizada

CONTEXT.md tenía registrado que el logo se construye "nuevo desde cero" porque las
referencias compartidas antes no eran el logo oficial. Con las nuevas capturas en
`assets/logos/source/` eso cambió: se revisaron, el diseño resultó sólido (tipografía
geométrica a medida con corte diagonal en "d"/"t", gradiente ya alineado a la paleta)
y se vectorizó como el logo oficial — sigue siendo "construido en SVG/código" (no una
imagen pegada), solo que ahora la forma de las letras viene de esa dirección de marca
en vez de Space Grotesk genérico. Vale la pena reflejar este cambio en CONTEXT.md la
próxima vez que se actualice ese documento.
