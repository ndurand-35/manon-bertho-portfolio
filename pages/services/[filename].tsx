import { Service } from "../../components/service";
import { client } from "../../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";
import { Section } from "../../components/util/section";
import { SITE_URL, richTextToDescription } from "../../lib/site";
import { BUSINESS_ID, JsonLdBlock } from "../../components/util/seo";

const plainText = (input: unknown) => richTextToDescription(input, Infinity) || "";

// Les tarifs sont du texte libre ("A partir de 80€", "5 photos - 120€"…) : on en extrait les montants.
const offerFromText = (name: string, text: string, url: string): JsonLdBlock => {
  const prices = [...text.matchAll(/(\d+(?:[.,]\d+)?)\s*€/g)].map((m) =>
    Number(m[1].replace(",", "."))
  );
  const offer: JsonLdBlock = { "@type": "Offer", name, url };
  if (!prices.length) return offer;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  if (/partir de/i.test(text) || min !== max) {
    offer.priceSpecification = {
      "@type": "PriceSpecification",
      priceCurrency: "EUR",
      minPrice: min,
      ...(/partir de/i.test(text) ? {} : { maxPrice: max }),
    };
  } else {
    offer.price = min;
    offer.priceCurrency = "EUR";
  }
  return offer;
};

const serviceJsonLd = (service: ServiceType, url: string): JsonLdBlock => {
  const columns = (service.pricing?.column || []).filter(Boolean);
  const offers = columns.length
    ? columns.map((col) =>
        offerFromText(
          col.title || service.title,
          [
            col.title,
            plainText(col.description),
            ...(col.subitem || []).flatMap((sub) => [sub?.title, plainText(sub?.description)]),
          ].join(" "),
          url
        )
      )
    : // Pas de colonnes : le tarif est dans la description ou la précision (ex. mini séance Noël).
      [
        offerFromText(
          service.title,
          `${plainText(service.description)} ${service.pricing?.subtitle || ""}`,
          url
        ),
      ].filter((offer) => offer.price || offer.priceSpecification);

  return {
    "@type": "Service",
    "@id": url + "#service",
    name: service.title,
    serviceType: service.title,
    description: richTextToDescription(service.description, 500),
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Bretagne" },
    ...(offers.length ? { offers } : {}),
  };
};

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
    const url = `${SITE_URL}/services/${props.variables.relativePath.replace(/\.mdx$/, "")}`;
    return (
      <Layout
        data={data.global}
        seo={{
          title: data.services.seo?.title || data.services.title,
          description:
            data.services.seo?.description ||
            richTextToDescription(data.services.description),
          image: data.services.seo?.image || data.services.img?.src,
          noindex: data.services.seo?.noindex ?? false,
          jsonLd: [serviceJsonLd(data.services, url)],
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
