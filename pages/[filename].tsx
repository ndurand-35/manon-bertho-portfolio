import React from "react";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { Section } from "../components/util/section";
import { Zone, ZoneType, zoneJsonLd } from "../components/zone/zone";
import { client } from "../tina/__generated__/client";
import { ContentQueryQuery, ZoneQueryQuery } from "../tina/__generated__/types";
import { richTextToDescription } from "../lib/site";

// Sert à la racine du site les pages construites par blocs (content/pages) et
// les pages locales (content/zones). En cas de nom identique, la page l'emporte.

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina<ContentQueryQuery | ZoneQueryQuery>(props);
  const router = useRouter();

  if ("zones" in data) {
    const zone: ZoneType = data.zones;
    const path = (router.asPath || "/").split(/[?#]/)[0];
    return (
      <Layout
        data={data.global}
        seo={{
          title: zone.seo?.title || zone.title,
          description: zone.seo?.description || richTextToDescription(zone.intro),
          image: zone.seo?.image || zone.img?.src,
          noindex: zone.seo?.noindex ?? false,
          jsonLd: zoneJsonLd(zone, path),
        }}
      >
        <Section className="flex-1">
          <Zone {...zone} />
        </Section>
      </Layout>
    );
  }

  return (
    <Layout
      data={data.global}
      seo={{
        title: data.page.seo?.title,
        description: data.page.seo?.description,
        image: data.page.seo?.image,
        noindex: data.page.seo?.noindex ?? false,
      }}
    >
      <Blocks {...data.page} />
    </Layout>
  );
}

const fetchContent = async (filename: string) => {
  try {
    return await client.queries.contentQuery({ relativePath: `${filename}.md` });
  } catch {
    try {
      return await client.queries.zoneQuery({ relativePath: `${filename}.mdx` });
    } catch {
      return null;
    }
  }
};

export const getStaticProps = async ({ params }) => {
  const tinaProps = await fetchContent(params.filename);
  if (!tinaProps) {
    // Document supprimé ou inexistant : vraie 404 plutôt qu'une erreur 500.
    return { notFound: true };
  }
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview",
  };
  return {
    props: JSON.parse(JSON.stringify(props)) as typeof props,
  };
};

export const getStaticPaths = async () => {
  const [pages, zones] = await Promise.all([
    client.queries.pageConnection(),
    client.queries.zonesConnection(),
  ]);
  const filenames = [
    ...(pages.data.pageConnection?.edges ?? []),
    ...(zones.data.zonesConnection?.edges ?? []),
  ].map((edge) => edge?.node?._sys.filename);
  return {
    paths: filenames.filter(Boolean).map((filename) => ({ params: { filename } })),
    fallback: "blocking",
  };
};
