import type { TinaTemplate } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const Presentation = ({ data }: { data: any }) => {
  return (
    <div className="grid min-h-spe-height grid-cols-12 gap-8 overflow-x-hidden py-16 lg:px-32 bg-white">
      <div className=" col-span-12 mx-8 my-auto md:col-span-8 md:mx-16">
        <h4
          className="text-sm text-ternary"
          style={{ fontVariant: "small-caps" }}
        >
          {data.surtitle}
        </h4>
        <h1 className="mt-4 font-title text-3xl font-semibold">{data.title}</h1>
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
          className="rounded-full"
          style={{ boxShadow: "#fff -20px 20px 0px -3px, #3B4F43 -20px 20px" }}
        />
      </div>
    </div>
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
  ],
};
