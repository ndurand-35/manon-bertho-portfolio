import React from "react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ZoneQueryQuery } from "../../tina/__generated__/types";
import { TextImage } from "../components/text_image";
import { Gallery } from "../components/gallery";
import { Accordion } from "../components/accordion";
import { CTA } from "../blocks/cta";
import { Section } from "../util/section";
import { BUSINESS_ID, JsonLdBlock } from "../util/seo";
import { SITE_URL } from "../../lib/site";

export type ZoneType = ZoneQueryQuery["zones"];

/** Nœuds JSON-LD de la page : la prestation dans la ville, et la FAQ si elle existe. */
export const zoneJsonLd = (zone: ZoneType, path: string): JsonLdBlock[] => {
  const url = SITE_URL + path;
  const nodes: JsonLdBlock[] = [
    {
      "@type": "Service",
      "@id": url + "#service",
      name: zone.title,
      url,
      provider: { "@id": BUSINESS_ID },
      areaServed: { "@type": "City", name: zone.ville },
      ...(zone.seo?.description ? { description: zone.seo.description } : {}),
    },
  ];
  const faq = (zone.faq?.items ?? []).filter((q) => q?.question && q?.answer);
  if (faq.length > 0) {
    nodes.push({
      "@type": "FAQPage",
      "@id": url + "#faq",
      mainEntity: faq.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      })),
    });
  }
  return nodes;
};

export const Zone = (props: ZoneType) => {
  const lieux = props.lieux?.items?.filter(Boolean) ?? [];
  const prestations = props.prestations?.items?.filter(Boolean) ?? [];
  const faq = props.faq?.items?.filter((q) => q?.question) ?? [];

  return (
    <div className="mt-0 md:mt-16 space-y-16">
      <TextImage
        data={{
          surtitle: props.surtitle,
          title: props.title,
          image: props.img,
          headline: props.intro,
        }}
      />

      {lieux.length > 0 && (
        <div className="space-y-8 px-4 md:px-16 lg:px-32">
          {props.lieux?.title && (
            <h2
              className="text-center font-title text-3xl font-semibold"
              data-tina-field={tinaField(props.lieux, "title")}
            >
              {props.lieux.title}
            </h2>
          )}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {lieux.map((lieu, i) => (
              <div key={i} className="space-y-2">
                <h3
                  className="font-title text-xl font-semibold text-ternary"
                  data-tina-field={tinaField(lieu, "name")}
                >
                  {lieu.name}
                </h3>
                <p data-tina-field={tinaField(lieu, "text")}>{lieu.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {prestations.length > 0 && (
        <Section color="link-water">
          <div className="space-y-8 px-4 py-16 md:px-16 lg:px-32">
            {props.prestations?.title && (
              <h2
                className="text-center font-title text-3xl font-semibold"
                data-tina-field={tinaField(props.prestations, "title")}
              >
                {props.prestations.title}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {prestations.map((prestation, i) => (
                <div key={i} className="flex flex-col space-y-2 bg-white p-6 shadow">
                  <h3
                    className="font-title text-xl font-semibold text-ternary"
                    data-tina-field={tinaField(prestation, "title")}
                  >
                    {prestation.title}
                  </h3>
                  <p className="flex-1" data-tina-field={tinaField(prestation, "text")}>
                    {prestation.text}
                  </p>
                  {prestation.service?.__typename === "Services" && (
                    <Link
                      href={`/services/${prestation.service._sys.filename}`}
                      className="pt-2 font-medium text-ternary underline underline-offset-4 hover:text-ternary-500"
                      data-tina-field={tinaField(prestation, "service")}
                    >
                      Découvrir : {prestation.service.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {props.pratique && (
        <div
          className="prose mx-auto max-w-3xl px-4 prose-headings:font-title prose-headings:font-semibold prose-h2:text-center prose-h2:text-3xl"
          data-tina-field={tinaField(props, "pratique")}
        >
          <TinaMarkdown content={props.pratique} />
        </div>
      )}

      {props.gallery && <Gallery gallery={props.gallery} altFallback={props.title} />}

      {faq.length > 0 && (
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          {props.faq?.title && (
            <h2
              className="text-center font-title text-3xl font-semibold"
              data-tina-field={tinaField(props.faq, "title")}
            >
              {props.faq.title}
            </h2>
          )}
          <Accordion
            items={faq.map((q) => ({
              title: <span data-tina-field={tinaField(q, "question")}>{q.question}</span>,
              content: (
                <p className="whitespace-pre-line" data-tina-field={tinaField(q, "answer")}>
                  {q.answer}
                </p>
              ),
            }))}
          />
        </div>
      )}

      {props.cta && (
        <CTA
          data={{
            title: props.cta.title,
            color: props.cta.color,
            button_text: props.cta.button_text,
            button_link: props.cta.button_link,
          }}
        />
      )}
    </div>
  );
};
