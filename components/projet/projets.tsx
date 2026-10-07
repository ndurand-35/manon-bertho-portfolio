import { Img } from "../util/img";
import { ProjetType } from "../../pages/projets";
import Link from "next/link";

export const Projets = ({ data }: { data: ProjetType[] }) => {
  return (
    <div className="mt-0 md:mt-16">
      <div className="py-16 flex flex-col items-center mx-auto">
        <h1 className="text-center font-title text-4xl">Mes réalisations</h1>
        <p className="text-center">
          Découvrez ici une partie de mes réalisations
        </p>
        <p
          className="text-center mt-8 max-w-xl"
          dangerouslySetInnerHTML={{
            __html:
              "J'accompagne mes différents clients tout au long du processus créatif en mettant mon savoir-faire au service de leurs projets",
          }}
        ></p>
      </div>
      {data.length === 0 && (
        <p className="text-center pb-16 mx-8">
          Les projets arrivent bientôt. En attendant, retrouvez mes réalisations
          sur{" "}
          <a
            className="text-primary underline"
            href="https://www.instagram.com/manonberthostudio/"
            target="_blank"
            rel="noopener"
          >
            Instagram
          </a>{" "}
          ou <Link className="text-primary underline" href="/contact">contactez-moi</Link>.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16 mx-8 md:mx-24">
        {data.map((projetData) => {
          const projet = projetData.node;

          return (
            <Link
              key={projet._sys.filename}
              href={`/projets/` + projet._sys.filename}
            >
              <p className="text-sm text-ternary">{projet.type?.name}</p>
              <h2 className="font-title text-3xl font-semibold">
                {projet.title}
              </h2>
              <Img
                loading="lazy"
                className="rounded-lg"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                src={projet?.mainImg?.imgCentre?.src}
                alt={projet?.mainImg?.imgCentre?.alt || projet.title}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
