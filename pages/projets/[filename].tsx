import { Projet } from "../../components/projet";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { Section } from "../../components/util/section";

// Use the props returned by get static props
export default function BlogPostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  if (data && data.projets) {
    return (
      <Layout rawData={data} data={data.global}>
        <Section className="flex-1">
          <Projet {...data.projets} />
        </Section>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>No data</div>;
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.projetQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

/**
 * To build the blog post pages we just iterate through the list of
 * posts and provide their "filename" as part of the URL path
 *
 * So a blog post at "content/posts/hello.md" would
 * be viewable at http://localhost:3000/posts/hello
 */
export const getStaticPaths = async () => {
  const projetListData = await client.queries.projetsConnection();
  return {
    paths: projetListData.data.projetsConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type ProjetType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["projets"];
