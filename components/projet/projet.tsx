import { tinaField } from "tinacms/dist/react";
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";
import React from "react";
import { CTA } from "../blocks/cta";
import { ProjetType } from "../../pages/projets/[filename]";

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
      <img src={props.url} alt={props.alt} />
    </span>
  ),
};

export const Projet = (props: ProjetType) => {
  return (
    <div className="mt-0 md:mt-16 space-y-16">
      <div className="space-y-16 py-16">
        <div className="text-center">
          <p
            className="text-sm text-ternary"
            data-tina-field={tinaField(props, "type")}
          >
            {props.type.name}
          </p>
          <h1
            data-tina-field={tinaField(props, "title")}
            className="font-title text-6xl font-semibold"
          >
            {props.title}
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-3 md:px-16 lg:px-32 xl:px-72">
          <div
            key={`image-${props.mainImg?.imgGauche?.alt}`}
            className="flex justify-center"
          >
            <img
              className="max-h-auto rounded-lg md:max-h-96"
              src={props.mainImg?.imgGauche?.src}
              alt={props.mainImg?.imgGauche?.alt}
            />
          </div>
          <div
            key={`image-${props.mainImg?.imgCentre?.alt}`}
            className="flex justify-center"
          >
            <img
              className="max-h-auto rounded-lg md:max-h-96"
              src={props.mainImg?.imgCentre?.src}
              alt={props.mainImg?.imgCentre?.alt}
            />
          </div>
          <div
            key={`image-${props.mainImg?.imgDroite?.alt}`}
            className="flex justify-center"
          >
            <img
              className="max-h-auto rounded-lg md:max-h-96"
              src={props.mainImg?.imgDroite?.src}
              alt={props.mainImg?.imgDroite?.alt}
            />
          </div>
        </div>
        <div className="space-y-4 px-8 text-center md:px-16 lg:px-32 xl:px-64">
          <h4 className="font-title text-3xl">{props?.brief?.title}</h4>
          <div
            data-tina-field={tinaField(props, "brief")}
            className="prose dark:prose-dark w-full max-w-none space-y-4"
          >
            <TinaMarkdown content={props?.brief?.description} />
          </div>
        </div>
      </div>

      {props.other && (
        <div>
          <div className="space-y-4 px-8 text-center">
            <h4 className="font-title text-3xl">{props?.other?.title}</h4>
            {/* <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-3 md:px-16 lg:px-32 xl:px-72">
            {portfolio.other.imageList
              .sort((a: IProjetImg, b: IProjetImg) => a.order - b.order)
              .map((imgObj: IProjetImg) => (
                <div
                  key={`other-image-${imgObj.ID}`}
                  className="flex justify-center"
                >
                  <img
                    className="max-h-auto rounded-lg md:max-h-96"
                    src={`/${imgObj.img}`}
                  />
                </div>
              ))}
          </div> */}
            <div
              data-tina-field={tinaField(props, "other")}
              className="space-y-4 px-8 text-center md:px-16 lg:px-32 xl:px-64"
            >
              <TinaMarkdown
                components={components}
                content={props.other.description}
              />
            </div>
          </div>
        </div>
      )}
      {/* {portfolio.mansonery && <Mansonery data={portfolio.mansonery} />} */}
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
