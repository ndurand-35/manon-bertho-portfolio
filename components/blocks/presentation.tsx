import type { TinaTemplate } from "tinacms";
import { Section } from "../util/section";
import type { PageBlocksPresentation } from "../../tina/__generated__/types";
import { TextImage } from "../components/text_image";

export const Presentation = ({ data }: { data: PageBlocksPresentation }) => {
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
