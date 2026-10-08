import { Img } from "../util/img";
import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksTestimonial } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { BUSINESS_ID } from "../util/seo";

const stripHtml = (html: string) =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

// Données structurées Review pour que Google et les outils d'audit identifient ces textes comme des avis.
const reviewsJsonLd = (data: PageBlocksTestimonial) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@graph": (data.testimonials || [])
      .filter((t) => t?.description && t?.author)
      .map((t) => ({
        "@type": "Review",
        itemReviewed: { "@id": BUSINESS_ID },
        author: { "@type": "Person", name: t.author },
        reviewBody: stripHtml(t.description),
        inLanguage: "fr-FR",
      })),
  }).replace(/</g, "\\u003c");

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section color={data.color}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: reviewsJsonLd(data) }}
      />
      <div className="py-8 space-y-8">
        <h3
          className="font-title text-3xl text-center font-semibold"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h3>
        <div className="grid grid-cols-1 gap-8 px-16 sm:px-32 md:grid-cols-12">
          {data.testimonials &&
            data.testimonials.map((testimonial, i) => (
              <figure
                className="col-span-1 space-y-4 md:col-span-3 flex flex-col items-center"
                key={`testimonial_${i}`}
              >
                <Img loading="lazy"
                  className="rounded-xl"
                  data-tina-field={tinaField(testimonial, "image")}
                  src={testimonial.image?.src}
                  alt={testimonial.image?.alt || (testimonial.author ? `Photo de ${testimonial.author}` : "")}
                />
                <div className="h-full space-y-4 flex flex-col justify-between">
                  <blockquote
                    className="text-center"
                    data-tina-field={tinaField(testimonial, "description")}
                    dangerouslySetInnerHTML={{
                      __html: testimonial.description,
                    }}
                  ></blockquote>
                  <figcaption
                    className="text-end text-gray-400 "
                    style={{ fontVariant: "small-caps" }}
                    data-tina-field={tinaField(testimonial, "author")}
                  >
                    {testimonial.author}
                  </figcaption>
                </div>
              </figure>
            ))}
        </div>
      </div>
    </Section>
  );
};

export const testimonialBlockSchema: TinaTemplate = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      quote:
        "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton",
      color: "primary",
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre",
      name: "title",
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Lunar", value: "lunar-green" },
        { label: "Water", value: "link-water" },
      ],
    },
    {
      type: "object",
      label: "Testimonial",
      name: "testimonials",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
      },
      fields: [
        {
          type: "string",
          label: "Text",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          label: "Auteur",
          name: "author",
        },
        {
          type: "object",
          label: "Image",
          name: "image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image",
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
