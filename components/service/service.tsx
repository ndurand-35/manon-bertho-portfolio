import { tinaField } from "tinacms/dist/react";
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";
import React from "react";
import { CTA } from "../blocks/cta";
import { ServiceType } from "../../pages/services/[filename]";
import { NumberFeatures } from "../blocks/number_features";
import Link from "next/link";
import { Accordion, CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { Gallery } from "../components/gallery";
import { TextImage } from "../components/text_image";

const customTheme: CustomFlowbiteTheme = {
  dropdown: {
    arrowIcon: "ml-2 h-4 w-4",
    content: "py-1 px-3 space-y-2 text-white bg-lunar-green focus:outline-none",
    floating: {
      animation: "transition-opacity",
      base: "z-10 w-fit divide-y divide-gray-100 rounded shadow focus:outline-none !border-lunar-green",
      content: "py-1 text-sm text-gray-700 border-lunar-green",
      divider: "my-1 h-px bg-gray-100 dark:bg-gray-600",
      header: "block px-4 py-2 text-sm text-gray-700 dark:text-gray-200",
      hidden: "invisible opacity-0",
      item: {
        container: "",
        base: "flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-white bg-lunar-green hover:bg-lunar-green hover:text-secondary focus:outline-none",
        icon: "mr-2 h-4 w-4",
      },
      style: {
        light:
          "border border-lunar-green bg-lunar-green text-gray-900 hover:text-secondary",
        auto: "border border-lunar-green bg-lunar-green text-gray-900 hover:text-secondary",
      },
      target: "w-fit",
    },
    inlineWrapper: "flex items-center",
  },
  accordion: {
    root: {
      base: "py-2 px-4",
      flush: {
        off: "",
        on: "",
      },
    },
    content: {
      base: "py-5",
    },
    title: {
      arrow: {
        base: "h-6 w-6 shrink-0 transition",
        open: {
          off: "",
          on: "rotate-180",
        },
      },
      base: "flex w-full items-center justify-between text-left font-medium text-gray-500 rounded-none",
      flush: {
        off: "",
        on: "",
      },
      heading: "",
      open: {
        off: "",
        on: "",
      },
    },
  },
};

export const Service = (props: ServiceType) => {
  return (
    <div className="mt-0 md:mt-16 space-y-16">
      <TextImage
        data={{
          surtitle: "",
          title: props.title,
          image: props.img,
          headline: props.description,
        }}
      />
      {props.seance && <NumberFeatures data={props.seance} />}

      {props.pricing && (
        <div className="space-y-4 py-16 px-4 lg:px-32">
          <h3
            className="text-center font-title text-4xl font-semibold text-ternary"
            data-tina-field={tinaField(props.pricing, "title")}
          >
            {props.pricing.title}
          </h3>
          <p
            data-tina-field={tinaField(props.pricing, "subtitle")}
            className="text-center"
          >
            {props.pricing.subtitle}
          </p>
          {props.pricing.column && props.pricing.column.length !== 0 && (
            <div
              className={`md:grid-cols-${props.pricing.column.length} grid grid-cols-1 gap-2`}
            >
              {props.pricing.column.map((pricingData) => (
                <div className="flex flex-col items-center shadow h-fit">
                  <img
                    loading="lazy"
                    data-tina-field={tinaField(pricingData.img, "src")}
                    src={pricingData?.img?.src}
                    alt={pricingData?.img?.alt}
                  />
                  <h4
                    className="whitespace-pre-line px-16 mt-4 text-center text-xl text-ternary"
                    data-tina-field={tinaField(pricingData, "title")}
                  >
                    {pricingData?.title}
                  </h4>
                  <div
                    data-tina-field={tinaField(pricingData, "description")}
                    className="prose w-full px-4 py-4"
                  >
                    <TinaMarkdown content={pricingData?.description} />
                  </div>
                  <Flowbite theme={{ theme: customTheme, mode: "light" }}>
                    {pricingData.subitem && (
                      <Accordion className="w-full" collapseAll>
                        {pricingData.subitem.map((item, i) => (
                          <Accordion.Panel key={i}>
                            <Accordion.Title>{item.title}</Accordion.Title>
                            <Accordion.Content>
                              <div
                                data-tina-field={tinaField(item, "description")}
                                className="prose w-full"
                              >
                                <TinaMarkdown content={item?.description} />
                              </div>
                            </Accordion.Content>
                          </Accordion.Panel>
                        ))}
                      </Accordion>
                    )}
                  </Flowbite>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {props.gallery && <Gallery gallery={props.gallery} />}

      {props.cta && (
        <CTA
          data={{
            title: props.cta.title,
            color: props.cta.color,
            button_text: props.cta.button_text,
            button_link: props.cta.button_link
          }}
        />
      )}
    </div>
  );
};
