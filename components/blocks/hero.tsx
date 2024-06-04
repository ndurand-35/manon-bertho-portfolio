import * as React from "react";
import { Section } from "../util/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section color={data.color} className="overflow-visible">
      <div className="relative flex h-spe-height justify-center overflow-hidden">
        <img
          data-tina-field={tinaField(data, "image_top_left")}
          alt={data.image_top_left?.alt}
          src={data.image_top_left?.src}
          className="absolute -top-16 left-4 w-6/12 md:-left-64"
        />
        <div className="relative m-auto text-center">
          <img
            data-tina-field={tinaField(data, "image")}
            alt={data.image?.alt}
            src={data.image?.src}
            className="mx-auto w-full md:w-8/12"
          />
          <div
            data-tina-field={tinaField(data, "headline")}
            className={`relative mx-auto text-lg md:text-2xl text-primary`}
          >
            <TinaMarkdown content={data.headline} />
          </div>
        </div>
        <img
          data-tina-field={tinaField(data, "image_top_right")}
          alt={data.image_top_right?.alt}
          src={data.image_top_right?.src}
          className="absolute -right-12 w-4/12 rotate-180 sm:-right-24 md:block"
        />
      </div>
      <img
        data-tina-field={tinaField(data, "image_bottom_left")}
        alt={data.image_bottom_left?.alt}
        src={data.image_bottom_left?.src}
        className="absolute -left-12 bottom-8 z-10 md:-bottom-20 w-64 rotate-90 md:left-0 md:w-96 xl:left-32"
      />
      <img
        data-tina-field={tinaField(data, "image_bottom_right")}
        alt={data.image_bottom_right?.alt}
        src={data.image_bottom_right?.src}
        className="absolute -bottom-2 right-8 z-10 w-32 rotate-45 md:-bottom-8 md:right-64"
      />
    </Section>
  );
};

export const heroBlockSchema: TinaTemplate = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "rich-text",
      label: "Headline",
      name: "headline",
    },
    {
      type: "object",
      label: "Image au centre",
      name: "image",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image en haut à gauche",
      name: "image_top_left",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image en haut à droit",
      name: "image_top_right",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image en bas à gauche",
      name: "image_bottom_left",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      label: "Image en bas à droite",
      name: "image_bottom_right",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Lunar", value: "lunar-green" },
        { label: "Water", value: "link-water" },
      ],
    },
  ],
};
