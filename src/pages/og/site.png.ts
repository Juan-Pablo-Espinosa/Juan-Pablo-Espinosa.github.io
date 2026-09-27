// Default social card → /og/site.png
import type { APIRoute } from 'astro';
import { renderOg, pngResponse } from '../../lib/og';
import { site } from '../../site.config';

export const GET: APIRoute = async () =>
  pngResponse(
    await renderOg({
      label: '// GR0X-OS · PORTFOLIO',
      title: site.name,
      subtitle: site.identity,
      footer: `LOC: ${site.location.toUpperCase()}`,
    }),
  );
