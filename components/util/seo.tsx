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
  SOCIAL_LINKS,
} from "../../lib/site";

export type SeoProps = {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  noindex?: boolean;
};

const absolute = (url: string) =>
  url.startsWith("http") ? url : SITE_URL + encodeURI(decodeURI(url));

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description: DEFAULT_DESCRIPTION,
  url: SITE_URL,
  email: CONTACT_EMAIL,
  image: absolute(optimizedUrl(DEFAULT_IMAGE)),
  logo: absolute("/uploads/Homepage/LOGO PRINCIPAL.png"),
  founder: { "@type": "Person", name: "Manon Bertho" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rennes",
    addressRegion: "Bretagne",
    addressCountry: "FR",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Bretagne" },
  sameAs: SOCIAL_LINKS,
  knowsAbout: [
    "Photographie",
    "Photographie de mariage",
    "Photographie d'événements",
    "Photographie commerciale",
    "Identité visuelle",
    "Papeterie",
  ],
};

export const Seo = ({ title, description, image, noindex }: SeoProps) => {
  const router = useRouter();
  const path = (router.asPath || "/").split(/[?#]/)[0];
  const canonical = SITE_URL + (path === "/home" ? "/" : path);
  // Le nom du studio n'est ajouté que s'il tient dans les ~65 caractères affichés par Google.
  const suffixed = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const fullTitle = title && suffixed.length > 65 ? title : suffixed;
  const desc = description || DEFAULT_DESCRIPTION;
  const ogImage = absolute(optimizedUrl(image || DEFAULT_IMAGE));
  const isHome = canonical === SITE_URL + "/";

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
      {isHome && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
        />
      )}
    </Head>
  );
};
