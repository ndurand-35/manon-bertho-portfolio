import { useEffect } from "react";
import { Layout } from "../components/layout";
import { Section } from "../components/util/section";
import { SocialLinks } from "../components/util/social_links";
import { CONTACT_EMAIL, SITE_URL } from "../lib/site";
import { BUSINESS_ID, WEBSITE_ID } from "../components/util/seo";

declare global {
  interface Window {
    hbspt?: {
      forms: { create: (options: Record<string, string>) => void };
    };
  }
}

export default function Contact() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "eu1",
          portalId: "143624250",
          formId: "c0fba5fc-23bc-44dd-9db7-96d5cba2da58",
          target: "#hubspotForm",
        });
      }
    });
  }, []);

  return (
    <Layout
      seo={{
        title: "Contact – Photographe et graphiste à Rennes",
        description:
          "Un projet photo, une identité visuelle ou une papeterie ? Contactez Manon Bertho Studio, photographe et graphiste freelance à Rennes, pour en discuter.",
        jsonLd: [
          {
            "@type": "ContactPage",
            "@id": SITE_URL + "/contact#webpage",
            url: SITE_URL + "/contact",
            name: "Contact – Manon Bertho Studio",
            inLanguage: "fr-FR",
            isPartOf: { "@id": WEBSITE_ID },
            about: { "@id": BUSINESS_ID },
          },
        ],
      }}
    >
      <Section className="">
        <div className="grid grid-cols-1 gap-8 px-8 py-16 md:grid-cols-2 md:px-16 lg:px-32 mt-24">
          <div className="flex flex-col justify-center">
            <h1
              className="text-sm text-ternary"
              style={{ fontVariant: "small-caps" }}
            >
              Contact
            </h1>
            <h4 className="mt-4 font-title text-3xl font-semibold">
              Un projet, une collaboration&nbsp;? Contactez-moi si vous
              souhaitez que l'on en discute&nbsp;!
            </h4>
            <p>
              Vous pouvez également me contacter par mail à&nbsp;:&nbsp;
              <a className="text-primary" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              &nbsp; ou via mes réseaux
            </p>
            <SocialLinks className="mt-4" />
          </div>
          <div id="hubspotForm"></div>
        </div>
      </Section>
    </Layout>
  );
}
