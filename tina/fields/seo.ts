import type { TinaField } from "tinacms";

/** Champs SEO communs : titre Google, description Google, image de partage. */
export const seoField: TinaField = {
  type: "object",
  label: "SEO (Google & réseaux sociaux)",
  name: "seo",
  fields: [
    {
      type: "string",
      label: "Titre Google",
      name: "title",
      description:
        "Environ 40 à 60 caractères. « | Manon Bertho Studio » est ajouté automatiquement quand il reste de la place. Exemple : Photographe mariage à Rennes",
    },
    {
      type: "string",
      label: "Description Google",
      name: "description",
      description:
        "Environ 140 à 155 caractères : le texte affiché sous le titre dans Google.",
      ui: { component: "textarea" },
    },
    {
      type: "image",
      label: "Image de partage",
      name: "image",
      description:
        "Image affichée quand la page est partagée (Facebook, WhatsApp, LinkedIn…).",
    },
    {
      type: "boolean",
      label: "Masquer de Google",
      name: "noindex",
      description: "À cocher pour les pages qui ne doivent pas apparaître dans Google (CGV…).",
    },
  ],
};
