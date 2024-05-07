import { Collection } from "tinacms";

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
  name: "projet",
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
};

export default Projet;
