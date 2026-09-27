/**
 * Data helpers: every page gets content through these functions so sorting,
 * draft-filtering and "is this section empty?" logic lives in one place.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

type FolderCollection = 'projects' | 'publications' | 'patents' | 'awards' | 'news' | 'research';

/**
 * getCollection() logs a warning for an empty collection. Empty is a normal
 * state here (the section just hides), so check the folder for real entries
 * first — files starting with `_` are templates and don't count.
 */
async function collection<C extends FolderCollection>(
  name: C,
  filter?: (entry: CollectionEntry<C>) => boolean,
): Promise<CollectionEntry<C>[]> {
  const dir = join(process.cwd(), 'src/content', name);
  const hasEntries =
    existsSync(dir) &&
    readdirSync(dir, { recursive: true }).some((f) => /(^|[\\/])[^_\\/][^\\/]*\.md$/.test(String(f)));
  if (!hasEntries) return [];
  return filter ? getCollection(name, filter) : getCollection(name);
}

export type Project = CollectionEntry<'projects'>;

const byOrderThenDate = (a: Project, b: Project) =>
  a.data.order - b.data.order || b.data.date.valueOf() - a.data.date.valueOf();

/** Published projects (drafts hidden in production builds). */
export async function getProjects() {
  const all = await collection('projects', (p) => !(import.meta.env.PROD && p.data.draft));
  return all.sort(byOrderThenDate);
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.data.featured);
}

export async function getPublications() {
  const order = { published: 0, submitted: 1, 'in-prep': 2 } as const;
  return (await collection('publications')).sort(
    (a, b) => b.data.year - a.data.year || order[a.data.status] - order[b.data.status],
  );
}

export async function getPatents() {
  return (await collection('patents')).sort(
    (a, b) => (b.data.date?.valueOf() ?? 0) - (a.data.date?.valueOf() ?? 0),
  );
}

export async function getAwards() {
  // Newest first; entries with no date/year go last.
  const when = (a: CollectionEntry<'awards'>) => a.data.date?.getUTCFullYear() ?? a.data.year ?? 0;
  return (await collection('awards')).sort((a, b) => when(b) - when(a));
}

export async function getNews() {
  return (await collection('news')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getResearchGroups() {
  return (await collection('research')).sort((a, b) => a.data.order - b.data.order);
}

/**
 * Which top-level nav items have something to show.
 * A nav item whose content is empty is not rendered at all.
 */
export async function getNavAvailability() {
  const [projects, pubs, patents, groups, awards] = await Promise.all([
    getProjects(),
    getPublications(),
    getPatents(),
    getResearchGroups(),
    getAwards(),
  ]);
  return {
    projects: projects.length > 0,
    research: pubs.length + patents.length + groups.length > 0,
    awards: awards.length > 0,
  };
}

// ---- formatting --------------------------------------------------------

const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
const dayFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "SEP 2025" — telemetry style. */
export const fmtMonth = (d: Date) => monthFmt.format(d).toUpperCase();
/** "Sep 3, 2025". */
export const fmtDay = (d: Date) => dayFmt.format(d);
/** ISO date for <time datetime>. */
export const iso = (d: Date) => d.toISOString().slice(0, 10);

/** Status → bracket label. */
export const statusLabel: Record<Project['data']['status'], string> = {
  active: 'ACTIVE',
  'in-development': 'IN DEVELOPMENT',
  complete: 'COMPLETE',
  coursework: 'COURSEWORK',
  archived: 'ARCHIVED',
};

/** Two-digit section index: 1 → "01". */
export const pad2 = (n: number) => String(n).padStart(2, '0');

/** True for YouTube links (rendered as a click-to-load embed). */
export function youTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
