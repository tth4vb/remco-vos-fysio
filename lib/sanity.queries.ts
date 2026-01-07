import { groq } from "next-sanity";

// Home page query with all related data
export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    // SEO
    seoTitle,
    seoDescription,
    "ogImage": ogImage.asset->url,
    seoKeywords,

    // Hero
    heroTitle,
    heroCtaLabel,
    heroCtaUrl,
    "heroBackgroundImage": heroBackgroundImage.asset->url,

    // Services
    servicesTitle,
    "services": services[]-> {
      _id,
      title,
      "image": image.asset->url,
      description
    },

    // About
    aboutTitle,
    "aboutImage": aboutImage.asset->url,
    aboutBody,
    aboutSignature,
    aboutTagline,

    // Contact & FAQs
    contactFaqTitle,
    "faqs": faqs[]-> {
      _id,
      title,
      answer
    },

    // Pricing
    pricingTitle,
    pricingItems[] {
      _key,
      service,
      duration,
      price
    },
    pricingNote,

    // Opening Hours
    openingHoursTitle,
    openingHours[] {
      _key,
      day,
      open,
      openTime,
      closeTime,
      openTime2,
      closeTime2,
      byAppointment
    },
    openingHoursNote,

    // Announcement
    announcementEnabled,
    announcementMessage,
    announcementStartDate,
    announcementEndDate,
    announcementBackgroundColor,

    // WhatsApp
    whatsappEnabled,
    whatsappPhoneNumber,
    whatsappPrefilledMessage,
    whatsappPosition
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
      visible
    }
  }
`;

// Combined query to get all content at once
export const allContentQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0] {
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
      visible
    }
  },
  "homePage": *[_type == "homePage"][0] {
    // SEO
    seoTitle,
    seoDescription,
    "ogImage": ogImage.asset->url,
    seoKeywords,
    
    heroTitle,
    heroCtaLabel,
    heroCtaUrl,
    "heroBackgroundImage": heroBackgroundImage.asset->url,
    servicesTitle,
    "services": services[]-> {
      _id,
      title,
      "image": image.asset->url,
      description
    },
    aboutTitle,
    "aboutImage": aboutImage.asset->url,
    aboutBody,
    aboutSignature,
    aboutTagline,
    contactFaqTitle,
    "faqs": faqs[]-> {
      _id,
      title,
      answer
    },
    pricingTitle,
    pricingItems[] {
      _key,
      service,
      duration,
      price
    },
    pricingNote,
    openingHoursTitle,
    openingHours[] {
      _key,
      day,
      open,
      openTime,
      closeTime,
      openTime2,
      closeTime2,
      byAppointment
    },
    openingHoursNote,
    announcementEnabled,
    announcementMessage,
    announcementStartDate,
    announcementEndDate,
    announcementBackgroundColor,
    whatsappEnabled,
    whatsappPhoneNumber,
    whatsappPrefilledMessage,
    whatsappPosition
  }
}`;

// Individual service query (for potential detail pages)
export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "image": image.asset->url,
    description
  }
`;
