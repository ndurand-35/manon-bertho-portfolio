import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const TextImage = ({ data }) => {
  return (
    <div className="px-4 py-8 sm:py-16 md:px-16 lg:px-32">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="my-auto md:col-span-7 lg:col-span-8">
          <h4
            data-tina-field={tinaField(data, "surtitle")}
            className="text-sm text-ternary"
            style={{ fontVariant: "small-caps" }}
          >
            {data.surtitle}
          </h4>
          <h1
            className="mt-4 font-title text-3xl font-semibold"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h1>
          <div
            data-tina-field={tinaField(data, "headline")}
            className={`space-y-8 mt-4`}
          >
            <TinaMarkdown content={data.headline} />
          </div>
        </div>
        <div className="md:col-span-5 lg:col-span-4 mx-16 md:mx-8 flex items-center">
          <img
            loading="lazy"
            src={data.image?.src}
            alt={data.image?.alt}
            data-tina-field={tinaField(data, "image")}
            className="rounded-full"
            style={{
              boxShadow: "#fff -20px 20px 0px -3px, #3B4F43 -20px 20px",
            }}
          />
        </div>
      </div>
    </div>
  );
};
