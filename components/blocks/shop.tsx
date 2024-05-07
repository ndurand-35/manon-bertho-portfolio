import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksShop } from "../../tina/__generated__/types";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";

export const Shop = ({ data }: { data: PageBlocksShop }) => {
  return (
    <Section color={data.color}>
      <div className="space-y-6 flex flex-col justify-center my-10 lg:my-12 px-12 lg:px-32">
        <h3 className="font-title text-4xl font-extrabold leading-tight tracking-tight text-white">
          {data.title}
        </h3>
        <div
          data-tina-field={tinaField(data, "description")}
          className={`space-y-8 mt-4`}
        >
          <TinaMarkdown content={data.description} />
        </div>
        <div>
          <a
            href="https://www.etsy.com/fr/shop/ManonBerthoStudio"
            target="_blank"
            className="mb-2 focus:outline-none mr-2 rounded-lg px-5 border border-white py-2.5 text-sm 
          font-medium text-white hover:bg-white hover:text-primary transition duration-150 ease-in-out "
          >
            {data.button_text}
          </a>
        </div>
      </div>
      <img
        src={data.image?.src}
        alt={data.image?.alt}
        className="w-auto md:w-2/5 object-cover"
      />
      {/* <div className="px-4 py-8 sm:py-16 lg:px-6">
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
      </div> */}
    </Section>
  );
};

export const shopBlockSchema: TinaTemplate = {
  name: "shop",
  label: "Boutique",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      button_text: "Découvrir",
      title: "La boutique",
      description:
        "Vous cherchez des affiches pour embellir votre intérieur ou de la papeterie originale pour vos événements ? Retrouvez mon univers sur ma boutique en ligne !",
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
      label: "Description",
      name: "description",
    },
    {
      type: "string",
      label: "Texte du boutton",
      name: "button_text",
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
