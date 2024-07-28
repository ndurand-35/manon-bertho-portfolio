import { tinaField } from "tinacms/dist/react";
import {
  Components,
  TinaMarkdown,
  TinaMarkdownContent,
} from "tinacms/dist/rich-text";
import React from "react";
import { CTA } from "../blocks/cta";
import { ProjetType } from "../../pages/projets/[filename]";
import { Gallery } from "../components/gallery";

export const Projet = (props: ProjetType) => {
  return (
    <div className="mt-0 md:mt-16 space-y-16">
      <div className="space-y-16 py-16">
        <div className="text-center space-y-4">
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
              loading="lazy"
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
              loading="lazy"
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
              loading="lazy"
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
      {props.secondaryImg && (
        <div className="grid grid-cols-1 gap-4 px-8 sm:grid-cols-3 md:px-16 lg:px-32 xl:px-72">
          <div
            key={`image-${props.secondaryImg?.imgGauche?.alt}`}
            className="flex justify-center"
          >
            <img
              loading="lazy"
              className="max-h-auto rounded-lg md:max-h-96"
              src={props.secondaryImg?.imgGauche?.src}
              alt={props.secondaryImg?.imgGauche?.alt}
            />
          </div>
          <div
            key={`image-${props.mainImg?.imgCentre?.alt}`}
            className="flex justify-center"
          >
            <img
              loading="lazy"
              className="max-h-auto rounded-lg md:max-h-96"
              src={props.secondaryImg?.imgCentre?.src}
              alt={props.secondaryImg?.imgCentre?.alt}
            />
          </div>
          <div
            key={`image-${props.secondaryImg?.imgDroite?.alt}`}
            className="flex justify-center"
          >
            <img
              loading="lazy"
              className="max-h-auto rounded-lg md:max-h-96"
              src={props.secondaryImg?.imgDroite?.src}
              alt={props.secondaryImg?.imgDroite?.alt}
            />
          </div>
        </div>
      )}
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
                  <img loading="lazy" 
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
              <TinaMarkdown content={props.other.description} />
            </div>
          </div>
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
