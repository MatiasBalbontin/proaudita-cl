# Firma de correo — Proaudita

Contenido de esta carpeta:

| Archivo | Qué es |
|---|---|
| firma-1A-banda-gradiente.html | Variante 1A, banda de gradiente a la izquierda |
| firma-1B-linea-clara.html | Variante 1B, mínima sobre fondo blanco |
| firma-1C-placa-oscura.html | Variante 1C, placa completa en gradiente |
| proaudita-gradient.png | Logo con gradiente #0019FF → #191970 (1170×280) |
| proaudita-white.png | Logo en blanco, para fondos oscuros |
| proaudita-blue.png | Logo en azul plano #0019FF |
| band-gradient.png | Fondo de la banda de 1A |
| plate-gradient.png | Fondo de la placa de 1C |
| rule-h.png | Filete horizontal con gradiente |
| rule-v.png | Filete vertical con gradiente |

## Cómo instalarla

1. Sube los PNG de esta carpeta a proaudita.cl (por ejemplo `https://proaudita.cl/firma/`).
2. Abre el .html de la variante elegida y reemplaza cada `src="proaudita-white.png"` y `url(band-gradient.png)` por la URL absoluta: `src="https://proaudita.cl/firma/proaudita-white.png"`.
3. Abre el archivo en el navegador, selecciona la firma completa, cópiala y pégala en Gmail (Configuración → Firma) o Outlook.

Si el logo aparece cortado o roto, es porque el cliente de correo no pudo cargar la imagen: el paso 1 es obligatorio, no funciona con rutas locales.

## Notas técnicas

- Ancho fijo 540 px, tablas HTML y Arial: se ve igual en Gmail, Outlook y Apple Mail.
- El gradiente va como imagen PNG porque los clientes de correo no soportan `linear-gradient`.
- Las celdas con gradiente llevan `bgcolor` navy de respaldo para Outlook de escritorio, que ignora las imágenes de fondo.
- El logo y el texto proaudita.cl enlazan a https://proaudita.cl.
