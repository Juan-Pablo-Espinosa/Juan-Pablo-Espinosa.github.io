/**
 * Build-time asset detection, so you can add files without editing code:
 *  - drop `src/assets/headshot.(jpg|png|webp)` and it appears on /about
 *  - drop the resume PDF / hero video into /public and they appear automatically
 */
import type { ImageMetadata } from 'astro';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const headshots = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/headshot.{jpg,jpeg,png,webp,avif}',
  { eager: true },
);

/** The headshot image, or undefined if none has been added yet. */
export const headshot: ImageMetadata | undefined = Object.values(headshots)[0]?.default;

/** Whether a file exists in /public (checked at build time). */
export function publicFileExists(publicPath: string): boolean {
  return existsSync(join(process.cwd(), 'public', publicPath));
}
