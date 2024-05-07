import { tinaField } from "tinacms/dist/react";
import { PortfolioType } from "../../pages/portfolios/[filename]";

export const Portfolio = (props: PortfolioType) => {
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
