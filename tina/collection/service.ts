import { Collection } from "tinacms";

export const ServiceType: Collection = {
  label: "Type de Service",
  name: "serviceType",
  path: "content/serviceType",
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

const Service: Collection = {
  label: "Service",
  name: "service",
  path: "content/services",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/services/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "reference",
      label: "Type",
      name: "type",
      collections: ["serviceType"],
    },
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "rich-text",
    },
  ],
};
export default Service;
