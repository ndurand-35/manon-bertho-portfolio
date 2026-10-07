import { Section } from "../components/util/section";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import { Projets } from "../components/projet/projets";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const projets = props.data.projetsConnection.edges;

  return (
    <Layout
      seo={{
        title: "Réalisations",
        description:
          "Projets de Manon Bertho Studio : identités visuelles, reportages photo et créations graphiques réalisés pour des clients à Rennes et en Bretagne.",
        // Tant qu'aucun projet n'est publié, la page reste hors de Google.
        noindex: projets.length === 0,
      }}
    >
      <Section className="flex-1">
          <Projets data={projets} />
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.pageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type ProjetType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["projetsConnection"]["edges"][number];
