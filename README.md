# juan-pablo-espinosa.github.io

Personal robotics portfolio of **Juan Pablo Espinosa**, built with [Astro](https://astro.build)
(static output, TypeScript, no UI framework) and deployed to GitHub Pages by GitHub Actions.

Live: https://juan-pablo-espinosa.github.io

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321 (live reload)
npm run build      # type-check (astro check) + static build into dist/
npm run preview    # serve dist/ locally, exactly as GitHub Pages will
```

Pushing to `main` deploys automatically (`.github/workflows/deploy.yml`).
Watch a deploy with `gh run watch`.

---

## Where things live

| What | Where |
| --- | --- |
| Name, identity line, email/LinkedIn/GitHub, location, boot-log text | `src/site.config.ts` |
| Projects (case studies) | `src/content/projects/*.md` |
| Publications / competitions | `src/content/publications/*.md` |
| Patents | `src/content/patents/*.md` |
| Awards | `src/content/awards/*.md` |
| News | `src/content/news/*.md` |
| Research groups | `src/content/research/*.md` |
| Bio (About page) | `src/content/about.md` |
| Education / organizations / skills | `src/content/*.yaml` |
| Headshot | `src/assets/headshot.jpg` (or .png/.webp) — detected automatically |
| Project images | `src/assets/projects/` |
| Resume PDF | `public/cv/Juan-Pablo-Espinosa-CV.pdf`, then run `npm run cv:preview` (see below) |
| Videos | `public/media/` (short, compressed loops only — see below) |
| Colors, fonts, spacing | tokens at the top of `src/styles/global.css` |

**Empty sections hide themselves.** If a collection has no entries (e.g. no awards yet), its
section, heading and nav item are not rendered, and section numbers (`// 01`, `// 02`…)
close up automatically.

Every folder has a `_template.md`. Files starting with `_` are ignored, so copy the template
to a new name (without the underscore) to publish.

Frontmatter is validated at build time (`src/content.config.ts`). If you mistype a field or
use an invalid status, `npm run build` fails with a message pointing at the file and field.

---

## How to…

### Add a project

1. Copy `src/content/projects/_template.md` → `src/content/projects/my-robot.md`.
   The file name becomes the URL: `/projects/my-robot/`.
2. Fill in the frontmatter:
   - `status`: `active` · `in-development` · `complete` · `coursework` · `archived`
   - `featured: true` puts it on the home page (up to 3; `order` controls sequence, lower first).
   - `cover`: put an image in `src/assets/projects/` and reference it relatively,
     e.g. `cover: ../../assets/projects/my-robot.jpg`, plus `coverAlt`. Astro resizes and
     converts it to WebP automatically. No cover → a blueprint placeholder is shown.
   - `video`: `/media/my-robot.mp4` (file in `public/media/`) or a YouTube URL.
   - `specs`: key/value rows for the side "spec sheet".
3. Write the body with these headings (the page adds **Media** and **Links** after them):

   ```md
   ## Problem
   ## My role
   ## Approach
   ## Results
   ```

### Add a publication

Copy `src/content/publications/_template.md`. `status` is `published`, `submitted` or
`in-prep`. Your name is bolded automatically in the author list. Optional: `pdf`
(put the file in `public/papers/`), `bibtex` (multi-line with `|`), `links`, `note`
(e.g. `Finalist`).

### Add a news item

Create `src/content/news/2026-10-01-something.md`:

```md
---
date: 2026-10-01
text: Presented the GR0X prismatic limb at IDETC.
link: /projects/gr0x-humanoid/   # optional
---
```

The four most recent items appear on the home page.

### Add an award / patent / research group

Copy the `_template.md` in `awards/`, `patents/` or `research/`. Patent numbers are only
shown if you set `number`.

### Add a skill group

Add an entry to `src/content/skills.yaml`. `proof` lists project file names (without `.md`)
that demonstrate the skill; a typo fails the build so links never go stale.

### Update your resume

1. Replace `public/cv/Juan-Pablo-Espinosa-CV.pdf` with the new PDF (same file name).
2. Run `npm run cv:preview` — it renders each PDF page to `src/assets/cv/page-N.png`
   (needs `pdftoppm`: `sudo apt install poppler-utils`).
3. Commit both the PDF and the images, then push.

The CV page shows the resume as images (they work on every device — embedded PDF viewers
are blank on Android and in browsers set to download PDFs); clicking a page opens the PDF.

### Change the boot sequence

Edit `boot.lines` in `src/site.config.ts`, or set `boot.enabled: false` to turn it off.
It only runs on the home page, once per browser session, and never for visitors with
reduced motion enabled. It is capped at 2.5 s and any key/click/tap skips it.

### Add the hero video

Put a short, muted loop at `public/media/hero-loop.mp4` (and optionally a poster frame at
`public/media/hero-poster.jpg`). It replaces the animated schematic automatically.

---

## Video guidelines

GitHub Pages serves everything from the repo, so keep media small (aim for **< 3 MB per
clip, < 10 s**). A good ffmpeg recipe:

```bash
ffmpeg -i input.mov -t 8 -an -vf "scale=1280:-2,fps=30" \
  -c:v libx264 -crf 28 -preset slow -pix_fmt yuv420p -movflags +faststart \
  public/media/hero-loop.mp4
ffmpeg -i public/media/hero-loop.mp4 -frames:v 1 -q:v 3 public/media/hero-poster.jpg
```

Longer videos belong on YouTube; use the URL in a project's `video` field (it loads as a
click-to-play facade, so no YouTube scripts load until a visitor asks).

---

## What's generated for you

- `sitemap-index.xml` (via `@astrojs/sitemap`) and `robots.txt`
- Open Graph / Twitter cards: `/og/site.png` plus one per project at `/og/projects/<id>.png`,
  rendered at build time by `satori` + `sharp` (`src/lib/og.ts`)
- Favicons (`public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`)
- Themed `404.html`

## Project structure

```
src/
  site.config.ts       identity, links, boot text
  content.config.ts    typed schemas for all collections
  content/             all editable content (Markdown + YAML)
  assets/              images/fonts processed by Astro
  components/          UI pieces (Frame styles live in global.css)
  layouts/Base.astro   <head> metadata, header/footer, boot overlay, global scripts
  lib/                 content queries, asset detection, OG renderer
  pages/               routes
  styles/global.css    design tokens + base styles
public/                served as-is (favicon, robots.txt, cv/, media/)
```

Fonts: Inter (variable, Latin subset, self-hosted) and JetBrains Mono via Fontsource,
both under the SIL Open Font License.
