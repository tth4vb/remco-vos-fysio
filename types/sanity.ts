import type { PortableTextBlock } from "@portabletext/types";

// Sanity image type
export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Navigation item type
export interface NavigationItem {
  _id: string;
  label: string;
  targetId: string;
  order?: number;
}

// Service type
export interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
  description?: PortableTextBlock[];
  order?: number;
}

// FAQ item type
export interface FaqItem {
  _id: string;
  category: "contact" | "tarieven" | "openingstijden" | "contra-indicaties";
  title: string;
  answer?: PortableTextBlock[];
  order?: number;
}

// Site settings type
export interface SiteSettings {
  title: string;
  logoText: string;
  logoSubtext: string;
  phone?: string;
  email?: string;
  address?: string;
  whatsappUrl?: string;
  footerNote?: string;
  navigation?: NavigationItem[];
}

// Home page type
export interface HomePage {
  heroTitle: string;
  heroCtaLabel?: string;
  heroCtaUrl?: string;
  heroBackgroundImage?: SanityImage;
  servicesTitle?: string;
  services?: Service[];
  aboutTitle?: string;
  aboutImage?: SanityImage;
  aboutBody?: PortableTextBlock[];
  aboutSignature?: string;
  aboutTagline?: string;
  contactFaqTitle?: string;
  faqs?: FaqItem[];
}

// Combined page data type
export interface PageData {
  homePage: HomePage;
  siteSettings: SiteSettings;
}
