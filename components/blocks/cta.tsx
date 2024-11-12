import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksCta } from "../../tina/__generated__/types";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

export const CTA = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section color={data.color}>
      <div className="px-4 py-8 sm:py-16 lg:px-6">
        <div className="text-center">
          <h4
            className="mb-4 font-title text-4xl font-extrabold leading-tight tracking-tight"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h4>
          <Link
            href={data.button_link ?? "/about"}
            data-tina-field={tinaField(data, "button_text")}
            className={
              "mb-2 focus:outline-none mr-2 rounded-lg bg-ternary px-5 py-2.5 text-sm font-medium text-white hover:bg-ternary-500"
            }
            aria-current="page"
          >
            {data.button_text}
          </Link>
        </div>
      </div>
    </Section>
  );
};

export const ctaBlockSchema: TinaTemplate = {
  name: "cta",
  label: "Call to Action",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      button_text: "Contactez-moi",
      title: "Mon univers vous inspire ?",
      button_link: "/about",
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
      label: "Texte du boutton",
      name: "button_text",
    },
    {
      type: "string",
      label: "Lien du boutton",
      name: "button_link",
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
  ],
};
