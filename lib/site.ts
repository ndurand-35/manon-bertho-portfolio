export const SITE_URL = "https://www.manonbertho-studio.fr";
export const SITE_NAME = "Manon Bertho Studio";

export const DEFAULT_TITLE =
  "Manon Bertho Studio – Graphiste et photographe freelance à Rennes";
export const DEFAULT_DESCRIPTION =
  "Manon Bertho, graphiste et photographe freelance à Rennes : séances photos, photos d'événements, photos commerciales, identité visuelle et papeterie.";
export const DEFAULT_IMAGE =
  "/uploads/Homepage/SEANCE_COUPLE_B&B_ST_MALO_(62) home test (1).webp";

export const CONTACT_EMAIL = "contact@manonbertho-studio.fr";
export const SOCIAL = {
  instagram: "https://www.instagram.com/manonberthostudio/",
  linkedin: "https://www.linkedin.com/in/manon-bertho-nicolas-342648151/",
  shop: "https://manonberthostudio.bigcartel.com/",
};
export const SOCIAL_LINKS = Object.values(SOCIAL);
// Fiche Google Business Profile : hors de SOCIAL pour ne pas apparaître dans les icônes réseaux.
export const GOOGLE_BUSINESS_URL = "https://maps.app.goo.gl/izXroc2uyoTGCKY6A";

type RichTextNode = { type?: string; text?: string; children?: RichTextNode[] };

/** Texte brut d'un champ rich-text Tina, tronqué pour une meta description. */
export const richTextToDescription = (input: unknown, max = 155): string | undefined => {
  const node: RichTextNode =
    typeof input === "string"
      ? { children: [{ text: input.replace(/[*_#>`]/g, "") }] }
      : (input as RichTextNode);
  const parts: string[] = [];
  const walk = (n: RichTextNode | undefined) => {
    if (!n) return;
    if (typeof n.text === "string") parts.push(n.text);
    if (Array.isArray(n.children)) {
      n.children.forEach(walk);
      if (n.type && n.type !== "root") parts.push(" ");
    }
  };
  walk(node);
  const text = parts.join("").replace(/\s+/g, " ").trim();
  if (!text) return undefined;
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
};
