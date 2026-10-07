import { Service } from "../../components/service";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { Section } from "../../components/util/section";
import { richTextToDescription } from "../../lib/site";

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
      <Layout
        rawData={data}
        data={data.global}
        seo={{
          title: data.services.seo?.title || data.services.title,
          description:
            data.services.seo?.description ||
            richTextToDescription(data.services.description),
          image: data.services.seo?.image || data.services.img?.src,
          noindex: data.services.seo?.noindex ?? false,
        }}
      >
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
  try {
    const tinaProps = await client.queries.serviceQuery({
      relativePath: `${params.filename}.mdx`,
    });
    return {
      props: {
        ...tinaProps,
      },
    };
  } catch {
    // Document supprimé ou inexistant : vraie 404 plutôt qu'une erreur 500.
    return { notFound: true };
  }
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
