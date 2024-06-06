import React from "react";
import type { TinaTemplate } from "tinacms";
import { PageBlocksMarquee } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { default as RFMarquee } from "react-fast-marquee";

export const Marquee = ({ data }: { data: PageBlocksMarquee }) => {
  const sectionColor = {
    default: "text-gray-800 bg-white",
    "lunar-green": "text-white bg-lunar-green",
    "link-water": "text-gray-800 bg-link-water",
    tint: "text-gray-900 dark:text-gray-100 bg-gradient-to-br from-gray-100 dark:from-gray-1000 to-transparent",
  };
  const sectionColorCss = sectionColor[data.color]
    ? sectionColor[data.color]
    : sectionColor.default;

  return (
    <div className={sectionColorCss} data-tina-field={tinaField(data)}>
      <RFMarquee>
        {data?.marquee?.text.map((text, i) => (
          <h3
            key={i}
            className={`marquee-content text-gray-300 uppercase font-bold ${data.fontSize}`}
          >
            {text}
            &nbsp;{data.separator}&nbsp;
          </h3>
        ))}
      </RFMarquee>
    </div>
  );
};

export const marqueeBlockSchema: TinaTemplate = {
  name: "marquee",
  label: "Texte Defilant",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      marque: { text: ["Hello"] },
      separator: "&nbsp;·&nbsp;",
      fontSize: "text-6xl",
    },
  },
  fields: [
    {
      type: "object",
      label: "Texte défilant",
      name: "marquee",
      fields: [
        {
          type: "string",
          label: "Texte",
          name: "text",
          list: true,
        },
      ],
    },
    {
      type: "string",
      label: "Séparateur",
      name: "separator",
    },
    {
      type: "string",
      label: "Taille de texte",
      name: "fontSize",
      options: [
        { label: "Large", value: "text-lg" },
        { label: "XL", value: "text-xl" },
        { label: "2 XL", value: "text-2xl" },
        { label: "3 XL", value: "text-3xl" },
        { label: "4 XL", value: "text-4xl" },
        { label: "5 XL", value: "text-5xl" },
        { label: "6 XL", value: "text-6xl" },
      ],
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
