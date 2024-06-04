import { Instagram, Linkedin } from "iconoir-react";
import { useEffect } from "react";
import { Layout } from "../components/layout";
import { Section } from "../components/util/section";
import { Container } from "../components/util/container";

declare global {
  interface Window {
    hbspt: any;
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
    <Layout>
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
              <a
                className="text-primary"
                href="mailto:contact@manonbertho-studio.fr"
              >
                contact@manonbertho-studio.fr
              </a>
              &nbsp; ou via mes réseaux
            </p>
            <ul className="flex space-x-4 mt-4">
              <li>
                <a
                  href="https://www.instagram.com/manonberthostudio/"
                  className="hover:text-pink-600"
                  target="_blank"
                >
                  <Instagram />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/manon-bertho-nicolas-342648151/"
                  className="hover:text-blue-600"
                  target="_blank"
                >
                  <Linkedin />
                </a>
              </li>
            </ul>
          </div>
          <div id="hubspotForm"></div>
        </div>
      </Section>
    </Layout>
  );
}
