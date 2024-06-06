import React from "react";
import { Section } from "../util/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksPrestation } from "../../tina/__generated__/types";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";

export const Prestation = ({ data }: { data: PageBlocksPrestation }) => {
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
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
            {data?.cardList?.map((card, i) => (
              <Link href={card?.link ?? ""} key={i}>
                <div className="max-w-sm bg-white border border-gray-200 shadow">
                  <a href="#">
                    <img
                      data-tina-field={tinaField(card, "image")}
                      src={card.image?.src}
                      alt={card.image?.alt}
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5
                        className="mb-2 text-2xl font-bold tracking-tight text-gray-900"
                        data-tina-field={tinaField(card, "title")}
                      >
                        {card.title}
                      </h5>
                    </a>
                    <p
                      className="mb-3 font-normal text-gray-700"
                      data-tina-field={tinaField(card, "description")}
                    >
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export const prestationBlockSchema: TinaTemplate = {
  name: "prestation",
  label: "Prestation",
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
      type: "object",
      label: "Carte",
      name: "cardList",
      list: true,
      fields: [
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
          label: "Lien",
          name: "link",
        },
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
