import type { TinaTemplate } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../util/section";

export const Presentation = ({ data }: { data: any }) => {
  return (
    <Section color={data.color}>
      <div className="grid min-h-spe-height grid-cols-12 gap-8 overflow-x-hidden py-16 lg:px-32">
        <div className=" col-span-12 mx-8 my-auto md:col-span-8 md:mx-16">
          <h4
            data-tina-field={tinaField(data, "surtitle")}
            className="text-sm text-ternary"
            style={{ fontVariant: "small-caps" }}
          >
            {data.surtitle}
          </h4>
          <h1
            className="mt-4 font-title text-3xl font-semibold"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h1>
          <div
            data-tina-field={tinaField(data, "headline")}
            className={`space-y-8 mt-4`}
          >
            <TinaMarkdown content={data.headline} />
          </div>
        </div>
        <div className="col-span-12 mx-16 md:col-span-4 md:mx-8 flex items-center">
          <img
            src={data.image?.src}
            alt={data.image?.alt}
            data-tina-field={tinaField(data, "image")}
            className="rounded-full"
            style={{
              boxShadow: "#fff -20px 20px 0px -3px, #3B4F43 -20px 20px",
            }}
          />
        </div>
      </div>
    </Section>
  );
};

export const presentationBlockSchema: TinaTemplate = {
  name: "presentation",
  label: "Presentation",
  fields: [
    {
      type: "string",
      label: "SurTitre",
      name: "surtitle",
    },
    {
      type: "string",
      label: "Titre",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Headline",
      name: "headline",
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