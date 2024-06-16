import type { TinaTemplate } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Section } from "../util/section";
import { TextImage } from "../components/text_image";

export const Presentation = ({ data }: { data: any }) => {
  return (
    <Section color={data.color}>
      <TextImage data={data} />
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
