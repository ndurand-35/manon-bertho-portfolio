import { Collection } from "tinacms";
import { ctaBlockSchema } from "../../components/blocks/cta";

export const ProjetType: Collection = {
  label: "Type de Projet",
  name: "projetType",
  path: "content/projetType",
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

const Projet: Collection = {
  label: "Projets",
  name: "projets",
  path: "content/projets",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/projet/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "reference",
      label: "Type",
      name: "type",
      collections: ["projetType"],
    },
    {
      type: "object",
      label: "Images Principales",
      name: "mainImg",
      fields: [
        {
          type: "object",
          label: "Image Gauche",
          name: "imgGauche",
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
          label: "Image Centre",
          name: "imgCentre",
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
          label: "Image Droite",
          name: "imgDroite",
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
    {
      type: "object",
      label: "Brief",
      name: "brief",
      fields: [
        {
          name: "title",
          label: "Titre",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "rich-text",
        },
      ],
    },
    {
      type: "object",
      label: "Autre",
      name: "other",
      fields: [
        {
          name: "title",
          label: "Titre",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "rich-text",
          templates: [
            {
              name: "BlockQuote",
              label: "Block Quote",
              fields: [
                {
                  name: "children",
                  label: "Quote",
                  type: "rich-text",
                },
                {
                  name: "authorName",
                  label: "Author",
                  type: "string",
                },
              ],
            },
            {
              name: "Mansonery",
              label: "Mansonery",
              fields: [
                {
                  type: "object",
                  label: "Colonne",
                  name: "column",
                  list: true,
                  fields: [
                    {
                      type: "object",
                      label: "Nav Links",
                      name: "nav",
                      list: true,

                      fields: [
                        {
                          type: "image",
                          label: "Image",
                          name: "image",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: "NewsletterSignup",
              label: "Newsletter Sign Up",
              fields: [
                {
                  name: "children",
                  label: "CTA",
                  type: "rich-text",
                },
                {
                  name: "placeholder",
                  label: "Placeholder",
                  type: "string",
                },
                {
                  name: "buttonText",
                  label: "Button Text",
                  type: "string",
                },
                {
                  name: "disclaimer",
                  label: "Disclaimer",
                  type: "rich-text",
                },
              ],
              ui: {
                defaultItem: {
                  placeholder: "Enter your email",
                  buttonText: "Notify Me",
                },
              },
            },
          ],
        },
      ],
    },
    { ...ctaBlockSchema, type: "object" },
  ],
};

export default Projet;
