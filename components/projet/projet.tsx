import { tinaField } from "tinacms/dist/react";
import { ProjetType } from "../../pages/projets/[filename]";

export const Projet = (props: ProjetType) => {
  return (
    <div className="bg-lunar-green">
      <h2
        data-tina-field={tinaField(props, "title")}
        className={`w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
      >
        <span className={`bg-clip-text text-transparent bg-gradient-to-r`}>
          {props.title}
        </span>
      </h2>
    </div>
  );
};
