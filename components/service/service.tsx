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

const customTheme: CustomFlowbiteTheme = {
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

const components: Components<{
  BlockQuote: {
    children: TinaMarkdownContent;
    authorName: string;
  };
  Mansonery: { columns: string[] };
  NewsletterSignup: {
    placeholder: string;
    buttonText: string;
    children: TinaMarkdownContent;
    disclaimer?: TinaMarkdownContent;
  };
}> = {
  BlockQuote: (props: {
    children: TinaMarkdownContent;
    authorName: string;
  }) => {
    return (
      <div>
        <blockquote>
          <TinaMarkdown content={props.children} />
          {props.authorName}
        </blockquote>
      </div>
    );
  },
  Mansonery: (props) => {
    return <div></div>;
  },
  NewsletterSignup: (props) => {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="">
            <TinaMarkdown content={props.children} />
          </div>
          <div className="mt-8 ">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:max-w-xs rounded-md"
                placeholder={props.placeholder}
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-5 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {props.buttonText}
                </button>
              </div>
            </form>
            <div className="mt-3 text-sm text-gray-500">
              {props.disclaimer && <TinaMarkdown content={props.disclaimer} />}
            </div>
          </div>
        </div>
      </div>
    );
  },
  img: (props) => (
    <span className="flex items-center justify-center">
      <img loading="lazy" src={props.url} alt={props.alt} />
    </span>
  ),
};

export const Service = (props: ServiceType) => {
  return (
    <div className="mt-0 md:mt-16 space-y-16">
      <div className="py-8 grid grid-cols-12 gap-8 overflow-x-hidden md:gap-4 xl:gap-8 xl:px-32">
        <div className="col-span-12 mx-16 flex items-center md:col-span-6 md:mx-8 xl:col-span-4">
          <img loading="lazy"
            src={props?.img?.src}
            alt={props?.img?.alt}
            className="mx-auto max-w-xs rounded-full"
            style={{
              boxShadow: "#fff -20px 20px 0px -3px, #3B4F43 -20px 20px",
              transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
            }}
          />
        </div>
        <div className="order-last col-span-12 mx-16 my-auto sm:order-none md:col-span-6 md:mx-8 xl:col-span-8">
          <div className="space-y-4">
            <h1
              className="mt-2 font-title text-3xl font-semibold"
              data-tina-field={tinaField(props, "title")}
            >
              {props.title}
            </h1>
            <div
              data-tina-field={tinaField(props, "description")}
              className="prose dark:prose-dark w-full max-w-none space-y-4"
            >
              <TinaMarkdown content={props?.description} />
            </div>
          </div>
        </div>
      </div>
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
                  <img loading="lazy"
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
                      <Accordion className="w-full">
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
          }}
        />
      )}
    </div>
  );
};
