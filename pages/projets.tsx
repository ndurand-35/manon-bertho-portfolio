import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
import { Projets } from "../components/projet/projets";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const projets = props.data.projetConnection.edges;

  return (
    <Layout>
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
>["data"]["projetConnection"]["edges"][number];
