import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksTestimonial } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section color={data.color}>
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
              <div
                className="col-span-1 space-y-4 md:col-span-3 flex flex-col items-center"
                key={`testimonial_${i}`}
              >
                <img loading="lazy"
                  className="rounded-xl"
                  data-tina-field={tinaField(testimonial, "image")}
                  src={testimonial.image?.src}
                  alt={testimonial.image?.alt}
                />
                <div className="h-full space-y-4 flex flex-col justify-between">
                  <p
                    className="text-center"
                    data-tina-field={tinaField(testimonial, "description")}
                    dangerouslySetInnerHTML={{
                      __html: testimonial.description,
                    }}
                  ></p>
                  <p
                    className="text-end text-gray-400 "
                    style={{ fontVariant: "small-caps" }}
                    data-tina-field={tinaField(testimonial, "author")}
                  >
                    {testimonial.author}
                  </p>
                </div>
              </div>
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
