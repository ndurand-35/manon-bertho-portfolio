import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ProjetType } from "../../pages/projets";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export const Projets = ({ data }: { data: ProjetType[] }) => {
  return (
    <div className="mt-0 md:mt-16">
      <div className="py-16 flex flex-col items-center mx-auto">
        <h1 className="text-center font-title text-4xl">Mes réalisations</h1>
        <p className="text-center">
          Découvrer ici une partie de mes réalisations
        </p>
        <p
          className="text-center mt-8 max-w-xl"
          dangerouslySetInnerHTML={{
            __html:
              "J'accompagne mes différents clients tout au long du processus créatifs en mettant mon savoir-faire au service de leurs projets",
          }}
        ></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16 mx-8">
        {data.map((projetData) => {
          const projet = projetData.node;

          return (
            <Link
              key={projet._sys.filename}
              href={`/projets/` + projet._sys.filename}
            >
              <p className="text-sm text-ternary">{projet.type.name}</p>
              <h1 className="font-title text-3xl font-semibold">
                {projet.title}
              </h1>
              <img
                className="rounded-lg"
                src={`${projet?.mainImg?.imgCentre?.src}`}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};
