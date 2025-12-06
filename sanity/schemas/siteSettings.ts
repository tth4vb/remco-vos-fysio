import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: 'The text displayed next to the logo (e.g., "Remco Vos")',
    }),
    defineField({
      name: "logoSubtext",
      title: "Logo Subtext",
      type: "string",
      description: 'The subtext under the logo (e.g., "fysio")',
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp URL",
      type: "url",
      description: "Full WhatsApp link (e.g., https://wa.me/31612345678)",
    }),
    defineField({
      name: "footerNote",
      title: "Footer Note",
      type: "string",
      description: "Optional note displayed in the footer",
    }),
    defineField({
      name: "navigation",
      title: "Navigation Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "navigationItem" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
  },
});
