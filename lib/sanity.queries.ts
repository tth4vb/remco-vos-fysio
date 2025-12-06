import { groq } from "next-sanity";

// Home page query with all related data
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroTitle,
    heroCtaLabel,
    heroCtaUrl,
    heroBackgroundImage {
      asset->,
      hotspot,
      crop
    },
    servicesTitle,
    "services": services[]-> {
      _id,
      title,
      slug,
      image {
        asset->,
        hotspot,
        crop
      },
      description,
      order
    } | order(order asc),
    aboutTitle,
    aboutImage {
      asset->,
      hotspot,
      crop
    },
    aboutBody,
    aboutSignature,
    aboutTagline,
    contactFaqTitle,
    "faqs": faqs[]-> {
      _id,
      category,
      title,
      answer,
      order
    } | order(order asc)
  }
`;

// Site settings query
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    logoText,
    logoSubtext,
    phone,
    email,
    address,
    whatsappUrl,
    footerNote,
    "navigation": navigation[]-> {
      _id,
      label,
      targetId,
      order
    } | order(order asc)
  }
`;

// Individual service query (for potential detail pages)
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    image {
      asset->,
      hotspot,
      crop
    },
    description
  }
`;
