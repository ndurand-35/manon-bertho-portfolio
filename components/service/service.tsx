import { Img } from "../util/img";
import { tinaField } from "tinacms/dist/react";
import {
  TinaMarkdown,
} from "tinacms/dist/rich-text";
import React from "react";
import { CTA } from "../blocks/cta";
import { ServiceType } from "../../pages/services/[filename]";
import { NumberFeatures } from "../blocks/number_features";
import { Gallery } from "../components/gallery";
import { TextImage } from "../components/text_image";
import { Accordion } from "../components/accordion";

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
                  <Img
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
                  {pricingData.subitem && (
                    <Accordion
                      items={pricingData.subitem.map((item) => ({
                        title: item.title,
                        content: (
                          <div
                            data-tina-field={tinaField(item, "description")}
                            className="prose w-full"
                          >
                            <TinaMarkdown content={item?.description} />
                          </div>
                        ),
                      }))}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {props.gallery && <Gallery gallery={props.gallery} altFallback={props.title} />}

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
