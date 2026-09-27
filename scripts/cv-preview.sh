#!/usr/bin/env bash
# Regenerate the CV preview images from the resume PDF.
# Run after replacing the PDF:  npm run cv:preview   (needs poppler-utils: pdftoppm)
# Output: src/assets/cv/page-1.png, page-2.png, … (Astro optimizes them to WebP).
set -euo pipefail
PDF="public/cv/Juan-Pablo-Espinosa-CV.pdf"
OUT="src/assets/cv"
command -v pdftoppm >/dev/null || { echo "pdftoppm not found (sudo apt install poppler-utils)"; exit 1; }
[ -f "$PDF" ] || { echo "No PDF at $PDF"; exit 1; }
mkdir -p "$OUT"
rm -f "$OUT"/page-*.png
pdftoppm -r 180 -png "$PDF" "$OUT/page"
# pdftoppm pads page numbers for multi-page files (page-01); normalize to page-1, page-2…
for f in "$OUT"/page-*.png; do
  n=$(basename "$f" .png | sed 's/^page-0*//')
  [ "$f" = "$OUT/page-$n.png" ] || mv "$f" "$OUT/page-$n.png"
done
ls -1 "$OUT"
