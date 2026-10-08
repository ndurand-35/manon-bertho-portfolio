import Link from "next/link";
import { Layout } from "../components/layout";
import { Section } from "../components/util/section";

export default function PageIntrouvable() {
  return (
    <Layout
      seo={{
        title: "Page introuvable",
        description:
          "Cette page n'existe pas ou a été déplacée. Retrouvez les services photo et graphisme de Manon Bertho Studio depuis l'accueil.",
        noindex: true,
      }}
    >
      <Section className="">
        <div className="mx-auto mt-24 flex max-w-2xl flex-col items-center px-8 py-16 text-center">
          <p
            className="text-sm text-ternary"
            style={{ fontVariant: "small-caps" }}
          >
            Erreur 404
          </p>
          <h1 className="mt-4 font-title text-3xl font-semibold">
            Cette page est introuvable
          </h1>
          <p className="mt-4">
            Le lien est peut-être erroné, ou la page a été déplacée.
            Pas d'inquiétude, le reste du site vous attend&nbsp;!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <Link
              href="/"
              className="rounded-lg bg-ternary px-5 py-2.5 text-sm font-medium text-white hover:bg-ternary-500 focus:outline-none"
            >
              Retour à l'accueil
            </Link>
            <Link
              href="/contact"
              className="rounded-lg px-5 py-2.5 text-sm font-medium text-ternary hover:underline focus:outline-none"
            >
              Me contacter
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
