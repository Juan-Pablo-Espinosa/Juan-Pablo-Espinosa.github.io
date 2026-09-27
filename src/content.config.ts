/**
 * Content collections — the typed "database" for the whole site.
 *
 * Each collection is a folder (or YAML file) in `src/content/`. The Zod schemas
 * below validate frontmatter at build time, so a typo in a Markdown file fails
 * the build with a clear message instead of silently breaking a page.
 *
 * Files whose name starts with `_` (e.g. `_template.md`) are ignored — use them
 * as copy-paste starting points.
 */
import { defineCollection, reference } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';
import type { Loader } from 'astro/loaders';

/**
 * Markdown folder loader that tolerates an empty folder.
 * Astro's glob loader warns when nothing matches; for this site an empty
 * collection is a normal state (the section simply hides), so we silence only
 * that one warning and keep every other log + file watching intact.
 */
function mdFolder(name: string): Loader {
  const inner = glob({ pattern: '**/[!_]*.md', base: `./src/content/${name}` });
  return {
    name: `md-folder:${name}`,
    load: (ctx) => {
      const logger = new Proxy(ctx.logger, {
        get(target, prop, receiver) {
          if (prop === 'warn') {
            return (msg: string) => {
              if (!msg.startsWith('No files found matching')) target.warn(msg);
            };
          }
          const value = Reflect.get(target, prop, receiver);
          return typeof value === 'function' ? value.bind(target) : value;
        },
      });
      return inner.load({ ...ctx, logger });
    },
  };
}

/** `{ label, url }` pairs rendered as buttons on detail pages. */
const link = z.object({ label: z.string(), url: z.string() });

const projects = defineCollection({
  loader: mdFolder('projects'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** Short name used on placeholder covers and telemetry, e.g. "GR0X". */
      codename: z.string().optional(),
      /** One or two sentences for cards and meta description. */
      summary: z.string(),
      /** Your role in a few words, e.g. "Lead engineer". */
      role: z.string(),
      date: z.coerce.date(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      /** Lower numbers sort first; ties fall back to newest date. */
      order: z.number().default(100),
      status: z
        .enum(['active', 'in-development', 'complete', 'coursework', 'archived'])
        .default('active'),
      /** Image in src/assets (relative path from this file). Optional → blueprint placeholder. */
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Path in /public (e.g. /media/gr0x-loop.mp4) or a YouTube URL. */
      video: z.string().optional(),
      gallery: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      repo: z.string().optional(),
      links: z.array(link).default([]),
      /** Extra "spec sheet" rows on the case-study page, e.g. { Team: "12 engineers" }. */
      specs: z.record(z.string(), z.string()).default({}),
      draft: z.boolean().default(false),
    }),
});

const publications = defineCollection({
  loader: mdFolder('publications'),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    status: z.enum(['published', 'submitted', 'in-prep']),
    /** Free-text note shown after the status, e.g. "Finalist". */
    note: z.string().optional(),
    pdf: z.string().optional(),
    bibtex: z.string().optional(),
    links: z.array(link).default([]),
  }),
});

const patents = defineCollection({
  loader: mdFolder('patents'),
  schema: z.object({
    title: z.string(),
    type: z.enum(['provisional', 'utility', 'design']),
    status: z.enum(['filed', 'pending', 'granted', 'abandoned']),
    /** Application / patent number. Leave unset to keep it private. */
    number: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

const awards = defineCollection({
  loader: mdFolder('awards'),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
  }),
});

const news = defineCollection({
  loader: mdFolder('news'),
  schema: z.object({
    date: z.coerce.date(),
    text: z.string(),
    link: z.string().optional(),
  }),
});

/** Research groups / labs you belong to (shown on /research). */
const research = defineCollection({
  loader: mdFolder('research'),
  schema: z.object({
    name: z.string(),
    institution: z.string(),
    role: z.string(),
    advisor: z.string().optional(),
    url: z.string().optional(),
    since: z.string().optional(),
    order: z.number().default(100),
  }),
});

// ---- About page data (YAML lists) ----------------------------------------

const education = defineCollection({
  loader: file('src/content/education.yaml'),
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    detail: z.string().optional(),
    period: z.string().optional(),
    order: z.number().default(100),
  }),
});

const organizations = defineCollection({
  loader: file('src/content/organizations.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    url: z.string().optional(),
    order: z.number().default(100),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills.yaml'),
  schema: z.object({
    group: z.string(),
    items: z.array(z.string()),
    /** Project file names (without .md) that prove this skill. Checked at build time. */
    proof: z.array(reference('projects')).default([]),
    order: z.number().default(100),
  }),
});

export const collections = {
  projects,
  publications,
  patents,
  awards,
  news,
  research,
  education,
  organizations,
  skills,
};
