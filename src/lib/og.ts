/**
 * Build-time Open Graph image renderer (1200×630 PNG).
 * satori lays out the card as SVG (text converted to paths, so output is
 * identical locally and in CI), then sharp — already bundled with Astro for
 * image optimization — rasterizes it to PNG.
 */
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const fontDir = join(process.cwd(), 'node_modules/@fontsource/jetbrains-mono/files');
const mono400 = readFileSync(join(fontDir, 'jetbrains-mono-latin-400-normal.woff'));
const mono700 = readFileSync(join(fontDir, 'jetbrains-mono-latin-700-normal.woff'));

const C = { bg: '#0a0b0d', line: '#1d2127', text: '#e4e7eb', dim: '#a1aab5', accent: '#ffb000' };

// Minimal hyperscript helper so we don't need JSX/React for satori.
type Node = { type: string; props: Record<string, unknown> };
// satori requires display:flex on any div with more than one child, so it's the default.
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type,
  props: {
    style: { display: 'flex', ...style },
    children: children.length === 0 ? undefined : children.length === 1 ? children[0] : children,
  },
});

const bracket = (pos: Record<string, number>) =>
  h('div', {
    position: 'absolute',
    width: 36,
    height: 36,
    borderColor: C.accent,
    borderStyle: 'solid',
    borderWidth: 0,
    ...(pos.top !== undefined ? { borderTopWidth: 2 } : { borderBottomWidth: 2 }),
    ...(pos.left !== undefined ? { borderLeftWidth: 2 } : { borderRightWidth: 2 }),
    ...pos,
  });

interface OgInput {
  /** Small label above the title, e.g. "// PROJECT". */
  label: string;
  title: string;
  subtitle: string;
  /** Bottom-left telemetry line. */
  footer: string;
}

/** The bundled Latin font subset lacks some math symbols; swap them for ASCII. */
const ascii = (s: string) => s.replace(/≈/g, '~').replace(/×/g, 'x');

export async function renderOg(input: OgInput): Promise<Buffer> {
  const [label, title, subtitle, footer] = [input.label, input.title, input.subtitle, input.footer].map(ascii);
  const tree = h(
    'div',
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 72,
      position: 'relative',
      backgroundColor: C.bg,
      backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
      color: C.text,
      fontFamily: 'JetBrains Mono',
    },
    bracket({ top: 32, left: 32 }),
    bracket({ top: 32, right: 32 }),
    bracket({ bottom: 32, left: 32 }),
    bracket({ bottom: 32, right: 32 }),
    h(
      'div',
      { display: 'flex', justifyContent: 'space-between', fontSize: 22, color: C.dim, letterSpacing: 2 },
      h('div', { display: 'flex', color: C.accent }, label),
      h('div', { display: 'flex' }, 'SYS: ONLINE'),
    ),
    h(
      'div',
      { display: 'flex', flexDirection: 'column', gap: 20 },
      h('div', { display: 'flex', fontSize: title.length > 34 ? 56 : 70, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1 }, title),
      h('div', { display: 'flex', fontSize: 28, color: C.dim, lineHeight: 1.4, maxWidth: 980 }, subtitle),
    ),
    h(
      'div',
      { display: 'flex', justifyContent: 'space-between', fontSize: 20, color: C.dim, letterSpacing: 1 },
      h('div', { display: 'flex' }, footer),
      h('div', { display: 'flex', color: C.accent }, 'juan-pablo-espinosa.github.io'),
    ),
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'JetBrains Mono', data: mono400, weight: 400, style: 'normal' },
      { name: 'JetBrains Mono', data: mono700, weight: 700, style: 'normal' },
    ],
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}

/** Wrap a PNG buffer as a static-endpoint Response. */
export const pngResponse = (buf: Buffer) =>
  new Response(new Uint8Array(buf), { headers: { 'Content-Type': 'image/png' } });
