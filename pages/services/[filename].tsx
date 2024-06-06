import { Service } from "../../components/service";
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
  if (data && data.services) {
    return (
      <Layout rawData={data} data={data.global}>
        <Section className="flex-1">
          <Service {...data.services} />
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
  const tinaProps = await client.queries.serviceQuery({
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
  const serviceListData = await client.queries.servicesConnection();
  return {
    paths: serviceListData.data.servicesConnection.edges.map((post) => ({
      params: { filename: post.node._sys.filename },
    })),
    fallback: "blocking",
  };
};

export type ServiceType = InferGetStaticPropsType<
  typeof getStaticProps
>["data"]["services"];
