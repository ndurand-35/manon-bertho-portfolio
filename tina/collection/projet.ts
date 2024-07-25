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
      return `/projets/${document._sys.filename}`;
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
      label: "Images Secondaires",
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
      label: "Images Secondaires",
      name: "secondaryImg",
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
        },
      ],
    },
    {
      type: "object",
      label: "Gallery",
      name: "gallery",
      fields: [
        {
          type: "string",
          label: "Titre",
          name: "title",
        },
        {
          type: "object",
          list: true,
          name: "img",
          label: "Image",
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
            {
              name: "colSpan",
              label: "Affichage",
              type: "string",
              options: [
                { label: "1 Colonne", value: "col-span-1" },
                { label: "2 Colonnes", value: "col-span-2" },
              ],
            },
          ],
        },
      ],
    },
    { ...ctaBlockSchema, type: "object" },
  ],
};

export default Projet;
