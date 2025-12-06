import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "services", title: "Services Section" },
    { name: "about", title: "About Section" },
    { name: "contact", title: "Contact & FAQs Section" },
  ],
  fields: [
    // Hero Section
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      description:
        'The main heading in the hero (e.g., "Sport massage en medische taping voor hardlopers")',
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero CTA Button Label",
      type: "string",
      description: 'Text for the call-to-action button (e.g., "Afspraak maken")',
      group: "hero",
    }),
    defineField({
      name: "heroCtaUrl",
      title: "Hero CTA Button URL",
      type: "url",
      description: "Link for the CTA button",
      group: "hero",
    }),
    defineField({
      name: "heroBackgroundImage",
      title: "Hero Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "hero",
    }),

    // Services Section
    defineField({
      name: "servicesTitle",
      title: "Services Section Title",
      type: "string",
      description: 'Title for the services section (e.g., "Diensten")',
      group: "services",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      group: "services",
    }),

    // About Section
    defineField({
      name: "aboutTitle",
      title: "About Section Title",
      type: "string",
      description: 'Title for the about section (e.g., "Over mij")',
      group: "about",
    }),
    defineField({
      name: "aboutImage",
      title: "About Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "about",
    }),
    defineField({
      name: "aboutBody",
      title: "About Body Text",
      type: "blockContent",
      group: "about",
    }),
    defineField({
      name: "aboutSignature",
      title: "About Signature",
      type: "string",
      description: 'Signature text (e.g., "Remco Vos - Jouw specialist in sportmassage.")',
      group: "about",
    }),
    defineField({
      name: "aboutTagline",
      title: "About Tagline",
      type: "string",
      description: 'Closing tagline (e.g., "Let\'s find the next level")',
      group: "about",
    }),

    // Contact & FAQs Section
    defineField({
      name: "contactFaqTitle",
      title: "Contact & FAQs Section Title",
      type: "string",
      description: 'Title for the contact section (e.g., "Contact & FAQs")',
      group: "contact",
    }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faqItem" }] }],
      group: "contact",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Home Page",
      };
    },
  },
});
