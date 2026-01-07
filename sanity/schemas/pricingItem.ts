import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricingItem",
  title: "Pricing Item",
  type: "object",
  fields: [
    defineField({
      name: "service",
      title: "Service Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g., '30 min' or leave empty",
    }),
    defineField({
      name: "price",
      title: "Price (€)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      service: "service",
      duration: "duration",
      price: "price",
    },
    prepare({ service, duration, price }) {
      return {
        title: service,
        subtitle: `€${price}${duration ? ` - ${duration}` : ""}`,
      };
    },
  },
});
