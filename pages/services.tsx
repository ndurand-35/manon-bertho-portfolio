import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { client } from "../tina/__generated__/client";
import { Layout } from "../components/layout";
import { InferGetStaticPropsType } from "next";
// import { Projets } from "../components/service/services";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const services = props.data.servicesConnection.edges;

  return (
    <Layout>
      <Section className="flex-1">
        <p></p>
          {/* <Projets data={services} /> */}
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
>["data"]["servicesConnection"]["edges"][number];
