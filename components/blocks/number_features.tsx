import type { TinaTemplate } from "tinacms";
import { Section } from "../util/section";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const NumberFeatures = ({ data }: { data: any }) => {
  return (
    <Section color={data.color}>
      <div className="space-y-16  px-4 py-16 sm:px-8 md:px-16 xl:px-32">
        <h2
          className="text-center font-title text-4xl font-semibold"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {data.items &&
            data.items.map((block, i) => (
              <div key={i} className="flex flex-col items-center space-y-8">
                <div className="relative">
                  <img
                    src={block.image?.src}
                    className="h-48 w-48"
                    data-tina-field={tinaField(block, "image")}
                  />
                  <p
                    className={`absolute left-[42%] top-[37%] font-title text-6xl font-black`}
                  >
                    {i + 1}
                  </p>
                </div>
                <div
                  className="whitespace-pre-line px-4 text-center"
                  data-tina-field={tinaField(block, "text")}
                  dangerouslySetInnerHTML={{ __html: block.text }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    </Section>
  );
};

const defaultFeature = {
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
};

export const numberFeatureBlockSchema: TinaTemplate = {
  name: "numberFeatures",
  label: "Number Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
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
      label: "Feature Items",
      name: "items",
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
          name: "text",
          ui: {
            component: "textarea",
          },
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
