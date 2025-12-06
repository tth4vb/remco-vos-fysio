import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigationItem",
  title: "Navigation Item",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Text displayed in the navigation",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "targetId",
      title: "Target Section ID",
      type: "string",
      description:
        'The ID of the section to scroll to (e.g., "diensten", "over-mij", "contact")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in the navigation (lower numbers first)",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "label",
      targetId: "targetId",
    },
    prepare({ title, targetId }) {
      return {
        title: title,
        subtitle: `#${targetId}`,
      };
    },
  },
});
