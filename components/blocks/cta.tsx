import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksCTA } from "../../tina/__generated__/types";
import Link from "next/link";

export const CTA = ({ data }: { data: PageBlocksCTA }) => {
  return (
    <Section color={data.color}>
      <div className="px-4 py-8 sm:py-16 lg:px-6">
        <div className="text-center">
          <h4 className="mb-4 font-title text-4xl font-extrabold leading-tight tracking-tight text-gray-900 ">
            {data.title}
          </h4>
          <Link
            href={`/about`}
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
      label: "Color",
      name: "color",
      options: [
        { label: "Lunar", value: "lunar-green" },
        { label: "Water", value: "link-water" },
      ],
    },
  ],
};
