// Per-project social card → /og/projects/<id>.png
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg, pngResponse } from '../../../lib/og';
import { getProjects, statusLabel, type Project } from '../../../lib/content';

export const getStaticPaths: GetStaticPaths = async () =>
  (await getProjects()).map((project) => ({ params: { id: project.id }, props: { project } }));

export const GET: APIRoute = async ({ props }) => {
  const { data } = (props as { project: Project }).project;
  return pngResponse(
    await renderOg({
      label: `// PROJECT · [${statusLabel[data.status]}]`,
      title: data.title,
      subtitle: data.summary.length > 140 ? `${data.summary.slice(0, 137)}…` : data.summary,
      footer: 'JUAN PABLO ESPINOSA',
    }),
  );
};
