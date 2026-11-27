"""One-off: cut out backgrounds and export web-sized assets for the 2027 site.
Sources: design/2027 (web-quality copies; true masters stay with the designer).
Usage (needs Pillow, e.g. in a throwaway venv):
  python -I scripts/assets/build_2027_assets.py design/2027 src/assets/2027 public
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

src, out, public = map(Path, sys.argv[1:4])
out.mkdir(parents=True, exist_ok=True)
SENTINEL = (255, 0, 255)


def cutout(path: Path, bg: tuple, thresh: int) -> Image.Image:
    """Flood-fill the background from every border pixel close to `bg`, return RGBA."""
    img = Image.open(path).convert("RGB")
    work = img.copy()
    w, h = work.size
    px = work.load()
    border = [(x, 0) for x in range(0, w, 8)] + [(x, h - 1) for x in range(0, w, 8)]
    border += [(0, y) for y in range(0, h, 8)] + [(w - 1, y) for y in range(0, h, 8)]
    for xy in border:
        p = px[xy]
        if p != SENTINEL and sum(abs(p[i] - bg[i]) for i in range(3)) <= thresh:
            ImageDraw.floodfill(work, xy, SENTINEL, thresh=thresh)
    mask = Image.new("L", (w, h), 0)
    mpx, wpx = mask.load(), work.load()
    for y in range(h):
        for x in range(w):
            if wpx[x, y] != SENTINEL:
                mpx[x, y] = 255
    # shrink 1px to drop the JPEG halo, then soften the edge
    mask = mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.7))
    rgba = img.convert("RGBA")
    rgba.putalpha(mask)
    return rgba.crop(rgba.getbbox())


def save_webp(img: Image.Image, name: str, widths, quality=82):
    for wd in widths:
        im = img if img.width <= wd else img.resize((wd, round(img.height * wd / img.width)), Image.LANCZOS)
        im.save(out / f"{name}-{wd}.webp", "WEBP", quality=quality, method=6)


mascot = cutout(src / "mascot-thumbsup.jpg", (255, 255, 255), 60)
save_webp(mascot, "mascot", [480, 960])

wordmark = cutout(src / "logo-land.jpg", (0, 0, 0), 45)
save_webp(wordmark, "logo-land", [640, 1280])

badge = cutout(src / "badge-2027.jpg", (0, 0, 0), 45)
save_webp(badge, "badge", [128, 512])
badge.resize((180, 180), Image.LANCZOS).save(public / "apple-touch-icon.png")
badge.resize((64, 64), Image.LANCZOS).save(public / "favicon.png")

scene = Image.open(src / "scene-hero.jpg").convert("RGB")
save_webp(scene, "scene", [640, 1024, 1600], quality=78)

# og:image 1200x630, centre crop
og = scene.resize((1200, round(scene.height * 1200 / scene.width)), Image.LANCZOS)
top = (og.height - 630) // 2
og.crop((0, top, 1200, top + 630)).save(public / "og-2027.jpg", "JPEG", quality=85, optimize=True)
scene.save(public / "teaser-poster.jpg", "JPEG", quality=80, optimize=True)

for f in sorted(out.iterdir()):
    print(f.name, f.stat().st_size // 1024, "KB")
