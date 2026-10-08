import Head from "next/head";
import { useRouter } from "next/router";
import { optimizedUrl } from "./img";
import {
  CONTACT_EMAIL,
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  SITE_URL,
  GOOGLE_BUSINESS_URL,
  SOCIAL_LINKS,
} from "../../lib/site";

export type SeoProps = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  noindex?: boolean;
  /** Nœuds JSON-LD propres à la page, ajoutés au @graph du site. */
  jsonLd?: JsonLdBlock[];
};

const absolute = (url: string) =>
  url.startsWith("http") ? url : SITE_URL + encodeURI(decodeURI(url));

// Identifiants partagés : les nœuds du graphe (et les avis du bloc testimonial) s'y réfèrent.
export const BUSINESS_ID = SITE_URL + "/#business";
export const PERSON_ID = SITE_URL + "/#person";
export const WEBSITE_ID = SITE_URL + "/#website";

export type JsonLdBlock = Record<string, unknown>;

const siteGraph: JsonLdBlock[] = [
  {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    image: absolute(optimizedUrl(DEFAULT_IMAGE)),
    logo: absolute("/uploads/Homepage/LOGO PRINCIPAL.png"),
    founder: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rennes",
      addressRegion: "Bretagne",
      addressCountry: "FR",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Bretagne" },
    hasMap: GOOGLE_BUSINESS_URL,
    sameAs: [...SOCIAL_LINKS, GOOGLE_BUSINESS_URL],
    knowsAbout: [
      "Photographie",
      "Photographie de mariage",
      "Photographie d'événements",
      "Photographie commerciale",
      "Identité visuelle",
      "Papeterie",
    ],
  },
  {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Manon Bertho",
    jobTitle: "Graphiste et photographe freelance",
    url: SITE_URL,
    worksFor: { "@id": BUSINESS_ID },
    sameAs: SOCIAL_LINKS,
  },
  {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "fr-FR",
    publisher: { "@id": BUSINESS_ID },
  },
];

// "<" échappé pour qu'un texte du CMS ne puisse pas fermer la balise <script>.
const serializeJsonLd = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export const Seo = ({ title, description, image, noindex, jsonLd = [] }: SeoProps) => {
  const router = useRouter();
  const path = (router.asPath || "/").split(/[?#]/)[0];
  const canonical = SITE_URL + (path === "/home" ? "/" : path);
  // Le nom du studio n'est ajouté que s'il tient dans les ~65 caractères affichés par Google.
  const suffixed = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const fullTitle = title && suffixed.length > 65 ? title : suffixed;
  const desc = description || DEFAULT_DESCRIPTION;
  const ogImage = absolute(optimizedUrl(image || DEFAULT_IMAGE));

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex ? (
        <meta name="robots" content="noindex, follow" />
      ) : (
        <link rel="canonical" href={canonical} />
      )}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      {/* Graphe émis sur chaque page : les @id référencés (avis, services) doivent y être résolus. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd({
            "@context": "https://schema.org",
            "@graph": [...siteGraph, ...jsonLd],
          }),
        }}
      />
    </Head>
  );
};
