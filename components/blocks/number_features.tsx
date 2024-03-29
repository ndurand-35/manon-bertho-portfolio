import type { TinaTemplate } from "tinacms";

export const NumberFeatures = ({ data }: { data: any }) => {
  return (
    <div className="space-y-16 bg-primary-300 px-4 py-16 sm:px-8 md:px-16 xl:px-32">
      <h2 className="text-center font-title text-4xl font-semibold text-white">
        {data.title}
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {data.items &&
          data.items.map((block, i) => (
            <div
              key={i}
              className="flex flex-col items-center space-y-8 text-white"
            >
              <div className="relative">
                <img src={"/" + block.image} className="h-48 w-48	" />
                <p
                  className={`absolute left-[42%] top-[37%] font-title text-6xl font-black`}
                >
                  {i + 1}
                </p>
              </div>
              <div
                className="whitespace-pre-line px-4 text-center text-white"
                dangerouslySetInnerHTML={{ __html: block.text }}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

const defaultFeature = {
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
};

export const numberFeatureBlockSchema: TinaTemplate = {
  name: "number_features",
  label: "Number Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "string",
      label: "Titre",
      name: "title",
    },
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      //   ui: {
      //     itemProps: (item) => {
      //       return {
      //         label: item?.title,
      //       };
      //     },
      //   },
      fields: [
        {
          type: "string",
          label: "Text",
          name: "text",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
};
