"""
Optimiza las fotos fuente (assets/photos/source/*.jpg) a WebP livianos
para uso web en public/photos/. Ejecutar desde la raíz del repo:

    python Scripts/optimize_photos.py

Requiere Pillow (pip install pillow).
"""
import os
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets", "photos", "source")
OUT = os.path.join(ROOT, "public", "photos")

# destino -> (archivo fuente, ancho máximo, calidad)
MAP = {
    # Fundador
    "founder.webp":            ("MB.jpg",                                    900, 88),
    # Hero (Santiago, vertical)
    "hero-santiago.webp":      ("gianni-donato-Np0ddqpdhNc-unsplash.jpg",  1100, 85),
    # Franja identidad Chile
    "chile-santiago.webp":     ("caio-silva-5W8fDb8f89s-unsplash.jpg",     1400, 82),
    "chile-valparaiso.webp":   ("loic-mermilliod-H6KJ2D0LphU-unsplash.jpg", 1400, 82),
    "chile-patagonia.webp":    ("snowscat-EnFQmcTtsjo-unsplash.jpg",       1400, 82),
    "chile-atacama.webp":      ("diego-jimenez-HNOaMthcq0w-unsplash.jpg",  1400, 82),
    "chile-mineria.webp":      ("bruna-fiscuk-sRuz_SXLjCI-unsplash.jpg",   1400, 82),
    # Heros de páginas de servicio (van detrás de capa oscura)
    "servicio-diagnostico.webp": ("dylan-gillis-KdeqA3aTnBY-unsplash.jpg",  1600, 78),
    "servicio-data.webp":        ("stephen-dawson-qwtCeJ5cLYs-unsplash.jpg",1600, 78),
    "servicio-tax.webp":         ("morgan-housel-PcDGGex9-jA-unsplash.jpg", 1600, 80),
    "servicio-control.webp":     ("sean-pollock-PhYq704ffdA-unsplash.jpg",  1600, 78),
    "servicio-flow.webp":        ("startae-team-7tXA8xwe4W4-unsplash.jpg",  1600, 78),
    "servicio-toolkit.webp":     ("deng-xiang--WXQm_NTK0U-unsplash.jpg",    1600, 80),
}


def main():
    os.makedirs(OUT, exist_ok=True)
    total = 0
    for dest, (src_name, max_w, q) in MAP.items():
        src_path = os.path.join(SRC, src_name)
        if not os.path.exists(src_path):
            print(f"  FALTA fuente: {src_name}")
            continue
        img = Image.open(src_path)
        img = ImageOps.exif_transpose(img)  # respeta orientación EXIF
        img = img.convert("RGB")
        if img.width > max_w:
            h = round(img.height * max_w / img.width)
            img = img.resize((max_w, h), Image.LANCZOS)
        dest_path = os.path.join(OUT, dest)
        img.save(dest_path, "WEBP", quality=q, method=6)
        kb = os.path.getsize(dest_path) / 1024
        total += kb
        print(f"  {dest:30s} {img.width}x{img.height}  {kb:6.0f} KB")
    print(f"\n  Total: {total/1024:.2f} MB en {OUT}")


if __name__ == "__main__":
    main()
