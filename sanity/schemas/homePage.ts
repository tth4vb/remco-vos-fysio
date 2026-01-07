import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO & Metadata" },
    { name: "hero", title: "Hero Section" },
    { name: "services", title: "Services Section" },
    { name: "pricing", title: "Pricing & Hours" },
    { name: "about", title: "About Section" },
    { name: "contact", title: "Contact & FAQs Section" },
    { name: "settings", title: "Extra Settings" },
  ],
  fields: [
    // SEO & Metadata
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Title tag for search engines and social sharing (max 60 characters recommended)",
      group: "seo",
      validation: (Rule) => Rule.max(60).warning("Titles over 60 characters may be truncated in search results"),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Meta description for search engines and social sharing (max 160 characters recommended)",
      group: "seo",
      validation: (Rule) => Rule.max(160).warning("Descriptions over 160 characters may be truncated"),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social media sharing (1200x630px recommended)",
      options: {
        hotspot: true,
      },
      group: "seo",
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "Keywords for search engines (optional)",
      group: "seo",
    }),

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
      type: "string",
      description: "Link for the CTA button (e.g., #contact, mailto:email@example.com, or https://...)",
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
      type: "text",
      rows: 10,
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

    // Pricing Section
    defineField({
      name: "pricingTitle",
      title: "Pricing Section Title",
      type: "string",
      description: 'Title for the pricing section (e.g., "Tarieven")',
      group: "pricing",
    }),
    defineField({
      name: "pricingItems",
      title: "Pricing Items",
      type: "array",
      of: [{ type: "pricingItem" }],
      group: "pricing",
    }),
    defineField({
      name: "pricingNote",
      title: "Pricing Note",
      type: "string",
      description: "Optional note under pricing (e.g., special conditions)",
      group: "pricing",
    }),

    // Opening Hours Section
    defineField({
      name: "openingHoursTitle",
      title: "Opening Hours Title",
      type: "string",
      description: 'Title for opening hours (e.g., "Openingstijden")',
      group: "pricing",
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "array",
      of: [{ type: "dayHours" }],
      group: "pricing",
    }),
    defineField({
      name: "openingHoursNote",
      title: "Opening Hours Note",
      type: "string",
      description: "Optional note under opening hours",
      group: "pricing",
    }),

    // Announcement Banner
    defineField({
      name: "announcementEnabled",
      title: "Show Announcement Banner",
      type: "boolean",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "announcementMessage",
      title: "Announcement Message",
      type: "string",
      hidden: ({ parent }) => !parent?.announcementEnabled,
      group: "settings",
    }),
    defineField({
      name: "announcementStartDate",
      title: "Announcement Start Date",
      type: "date",
      hidden: ({ parent }) => !parent?.announcementEnabled,
      group: "settings",
    }),
    defineField({
      name: "announcementEndDate",
      title: "Announcement End Date",
      type: "date",
      hidden: ({ parent }) => !parent?.announcementEnabled,
      group: "settings",
    }),
    defineField({
      name: "announcementBackgroundColor",
      title: "Announcement Background Color",
      type: "string",
      options: {
        list: [
          { title: "Orange", value: "orange" },
          { title: "Green", value: "green" },
          { title: "Blue", value: "blue" },
          { title: "Red", value: "red" },
        ],
      },
      initialValue: "orange",
      hidden: ({ parent }) => !parent?.announcementEnabled,
      group: "settings",
    }),

    // WhatsApp Button
    defineField({
      name: "whatsappEnabled",
      title: "Show WhatsApp Button",
      type: "boolean",
      initialValue: true,
      group: "settings",
    }),
    defineField({
      name: "whatsappPhoneNumber",
      title: "WhatsApp Phone Number",
      type: "string",
      description: "Without + or spaces (e.g., 31611097182)",
      hidden: ({ parent }) => !parent?.whatsappEnabled,
      group: "settings",
    }),
    defineField({
      name: "whatsappPrefilledMessage",
      title: "WhatsApp Prefilled Message",
      type: "string",
      hidden: ({ parent }) => !parent?.whatsappEnabled,
      group: "settings",
    }),
    defineField({
      name: "whatsappPosition",
      title: "WhatsApp Button Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "right",
      hidden: ({ parent }) => !parent?.whatsappEnabled,
      group: "settings",
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
