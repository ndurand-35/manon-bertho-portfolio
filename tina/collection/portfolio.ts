import { Collection } from "tinacms";

export const PortfolioType: Collection = {
  label: "Type de Portfolio",
  name: "portfolioType",
  path: "content/portfolioType",
  format: "md",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
  ],
};

const Portfolio: Collection = {
  label: "Portfolio Project",
  name: "portfolio",
  path: "content/portfolios",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/portfolio/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      type: "reference",
      label: "Type",
      name: "type",
      collections: ["portfolioType"],
    },
  ],
};

export default Portfolio;
