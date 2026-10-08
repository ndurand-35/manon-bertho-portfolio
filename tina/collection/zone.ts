import { Collection } from "tinacms";
import { seoField } from "../fields/seo";
import { ctaBlockSchema } from "../../components/blocks/cta";

// Pages d'atterrissage locales (« photographe mariage à Saint-Malo »…) : absentes du menu,
// elles servent de portes d'entrée depuis Google et renvoient vers les services.
// Servies à la racine du site par pages/[filename].tsx.
const Zone: Collection = {
  label: "Pages locales (Google)",
  name: "zones",
  path: "content/zones",
  format: "mdx",
  ui: {
    router: ({ document }) => `/${document._sys.filename}`,
    filename: {
      description:
        "Devient l'adresse de la page, avec les mots que les gens tapent dans Google : photographe-mariage-saint-malo → /photographe-mariage-saint-malo. En minuscules, sans accents, mots séparés par des tirets.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre de la page",
      name: "title",
      isTitle: true,
      required: true,
      description: "Le grand titre visible. Exemple : Photographe à Saint-Malo",
    },
    {
      type: "string",
      label: "Ville",
      name: "ville",
      required: true,
      description: "Nom de la ville seul, utilisé pour Google. Exemple : Saint-Malo",
    },
    {
      type: "string",
      label: "Sur-titre",
      name: "surtitle",
    },
    {
      type: "rich-text",
      label: "Introduction",
      name: "intro",
      description:
        "Un texte propre à cette ville : vos séances sur place, l'ambiance, ce qui la rend unique. Évitez de copier le texte d'une autre ville.",
    },
    {
      type: "object",
      label: "Image principale",
      name: "img",
      fields: [
        { name: "src", label: "Image", type: "image" },
        { name: "alt", label: "Description de l'image", type: "string" },
      ],
    },
    {
      type: "object",
      label: "Lieux de séance",
      name: "lieux",
      fields: [
        { type: "string", label: "Titre", name: "title" },
        {
          type: "object",
          label: "Lieux",
          name: "items",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.name }) },
          fields: [
            { type: "string", label: "Nom du lieu", name: "name" },
            {
              type: "string",
              label: "Description",
              name: "text",
              ui: { component: "textarea" },
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Prestations proposées",
      name: "prestations",
      fields: [
        { type: "string", label: "Titre", name: "title" },
        {
          type: "object",
          label: "Prestations",
          name: "items",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.title }) },
          fields: [
            { type: "string", label: "Titre", name: "title" },
            {
              type: "string",
              label: "Texte",
              name: "text",
              ui: { component: "textarea" },
            },
            {
              type: "reference",
              label: "Page service liée",
              name: "service",
              collections: ["services"],
            },
          ],
        },
      ],
    },
    {
      type: "rich-text",
      label: "Infos pratiques",
      name: "pratique",
      description: "Déplacement, meilleure saison ou heure, accès…",
    },
    {
      type: "object",
      label: "Galerie",
      name: "gallery",
      fields: [
        { type: "string", label: "Titre", name: "title" },
        {
          type: "object",
          list: true,
          name: "img",
          label: "Image",
          fields: [
            { name: "src", label: "Image", type: "image" },
            { name: "alt", label: "Description de l'image", type: "string" },
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
    {
      type: "object",
      label: "Questions fréquentes",
      name: "faq",
      fields: [
        { type: "string", label: "Titre", name: "title" },
        {
          type: "object",
          label: "Questions",
          name: "items",
          list: true,
          ui: { itemProps: (item) => ({ label: item?.question }) },
          fields: [
            { type: "string", label: "Question", name: "question" },
            {
              type: "string",
              label: "Réponse",
              name: "answer",
              ui: { component: "textarea" },
            },
          ],
        },
      ],
    },
    { ...ctaBlockSchema, type: "object" },
    seoField,
  ],
};
export default Zone;
