"""Generate optimized WebP images for hero slides, portfolio, and team photos without modifying originals."""
from pathlib import Path
from PIL import Image, ImageOps
import re

# 1. Hero slides at 960w, 1600w, 2200w with high visual fidelity WebP
hero_sources = [
    'cover/cover-1.jpeg',
    'residential/living-marble-luxury-hall.jpg',
    'cover/cover-3.jpeg',
    'residential/living-dining-wine-chandelier.jpg',
    'cover/cover-2.jpeg',
    'cover/cover-4.jpeg',
]
hero_output = Path('public/optimized/hero')
hero_output.mkdir(parents=True, exist_ok=True)

for index, source in enumerate(hero_sources, 1):
    with Image.open(Path('public/portfolio') / source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        for width in (960, 1600, 2200):
            copy = image.copy()
            if copy.width > width:
                copy.thumbnail((width, round(width * image.height / image.width)), Image.Resampling.LANCZOS)
            target = hero_output / f'slide-{index}-{width}.webp'
            q = 82 if width == 960 else 86
            copy.save(target, 'WEBP', quality=q, method=6)
            print(f'{target}: {target.stat().st_size // 1024} KB')

# 2. Convert all referenced /portfolio/ and /team/ images into .webp alongside originals
files = list(Path('src').rglob('*.js*')) + list(Path('src').rglob('*.css'))
referenced = set()
for f in files:
    text = f.read_text()
    for m in re.findall(r'/(?:portfolio|team)/[a-zA-Z0-9_./ -]+\.(?:jpg|jpeg|png|webp)', text):
        base = re.sub(r'\.(?:jpg|jpeg|png|webp)$', '', m)
        for ext in ('.jpg', '.jpeg', '.png'):
            if (Path('public') / (base.lstrip('/') + ext)).exists():
                referenced.add(base + ext)
                break

for rel_path in sorted(referenced):
    src_path = Path('public' + rel_path)
    if not src_path.exists():
        continue
    webp_path = src_path.with_suffix('.webp')
    with Image.open(src_path) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        max_w = 800 if rel_path.startswith('/team/') else 1600
        if image.width > max_w:
            image.thumbnail((max_w, round(max_w * image.height / image.width)), Image.Resampling.LANCZOS)
        q = 88 if rel_path.startswith('/team/') else 85
        image.save(webp_path, 'WEBP', quality=q, method=6)
        print(f'{webp_path}: {src_path.stat().st_size // 1024} KB -> {webp_path.stat().st_size // 1024} KB')
