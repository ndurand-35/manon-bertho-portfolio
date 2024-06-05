import { Collection } from "tinacms";
import { ctaBlockSchema } from "../../components/blocks/cta";
import { list } from "postcss";

export const ServiceType: Collection = {
  label: "Type de Service",
  name: "serviceType",
  path: "content/serviceType",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
  ],
};

const Service: Collection = {
  label: "Service",
  name: "service",
  path: "content/services",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/services/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "reference",
      label: "Type",
      name: "type",
      collections: ["serviceType"],
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "rich-text",
    },
    {
      type: "object",
      label: "Image",
      name: "img",
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
      type: "object",
      label: "Déroulé d'une séance",
      name: "seance",
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
    },
    {
      type: "object",
      label: "Tarif",
      name: "pricing",
      fields: [
        {
          type: "string",
          label: "Titre",
          name: "title",
        },
        {
          type: "string",
          label: "Precision",
          name: "subtitle",
        },
        {
          type: "object",
          list: true,
          name: "Type de prix",
          label: "type",
          fields: [
            {
              type: "string",
              label: "Titre",
              name: "title",
            },
            {
              type: "object",
              list: true,
              name: "Prix",
              label: "price",
              fields: [
                {
                  type: "string",
                  label: "Texte",
                  name: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    { ...ctaBlockSchema, type: "object" },
  ],
};
export default Service;
