import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Contact", value: "contact" },
          { title: "Tarieven", value: "tarieven" },
          { title: "Openingstijden", value: "openingstijden" },
          { title: "Contra indicaties", value: "contra-indicaties" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "blockContent",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which to display this FAQ (lower numbers first)",
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
      title: "title",
      category: "category",
    },
    prepare({ title, category }) {
      return {
        title: title,
        subtitle: category,
      };
    },
  },
});
