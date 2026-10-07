import type { GetServerSideProps } from "next";
import { client } from "../tina/__generated__/client";
import { SITE_URL } from "../lib/site";

// Sitemap généré à partir du contenu Tina : toute nouvelle page y apparaît
// automatiquement, et les pages cochées « Masquer de Google » en sont exclues.

type Entry = { path: string; priority: string };

const toXml = (entries: Entry[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ path, priority }) => `  <url>
    <loc>${SITE_URL}${encodeURI(path)}</loc>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [pages, services, projets] = await Promise.all([
    client.queries.pageConnection(),
    client.queries.servicesConnection(),
    client.queries.projetsConnection(),
  ]);

  const entries: Entry[] = [
    { path: "/", priority: "1.0" },
    { path: "/contact", priority: "0.6" },
  ];

  for (const edge of services.data.servicesConnection.edges ?? []) {
    if (edge?.node && !edge.node.seo?.noindex) {
      entries.push({ path: `/services/${edge.node._sys.filename}`, priority: "0.9" });
    }
  }

  const visibleProjets = (projets.data.projetsConnection.edges ?? []).filter(
    (edge) => edge?.node && !edge.node.seo?.noindex
  );
  if (visibleProjets.length > 0) {
    entries.push({ path: "/projets", priority: "0.7" });
    for (const edge of visibleProjets) {
      entries.push({ path: `/projets/${edge.node._sys.filename}`, priority: "0.7" });
    }
  }

  for (const edge of pages.data.pageConnection.edges ?? []) {
    const node = edge?.node;
    if (node && node._sys.filename !== "home" && !node.seo?.noindex) {
      entries.push({ path: `/${node._sys.filename}`, priority: "0.3" });
    }
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.write(toXml(entries));
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
