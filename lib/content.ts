import fs from "fs";
import path from "path";

// Types for content
export interface NavigationItem {
  id: string;
  label: string;
  targetId: string;
}

export interface SiteSettings {
  title: string;
  logoText: string;
  logoSubtext: string;
  phone: string;
  email: string;
  address: string;
  whatsappUrl: string;
  navigation: NavigationItem[];
}

export interface HeroContent {
  title: string;
  ctaLabel: string;
  ctaUrl: string;
  backgroundImage: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  image: string;
  description: string;
}

export interface ServicesContent {
  title: string;
  items: ServiceItem[];
}

export interface AboutContent {
  title: string;
  image: string;
  body: string;
  signature: string;
  tagline: string;
}

export interface FaqItem {
  id: string;
  title: string;
  answer: string;
}

export interface FaqContent {
  title: string;
  items: FaqItem[];
}

export interface SiteContent {
  siteSettings: SiteSettings;
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  faq: FaqContent;
}

const contentFilePath = path.join(process.cwd(), "data", "content.json");

// Read content from JSON file
export function getContent(): SiteContent {
  try {
    const fileContent = fs.readFileSync(contentFilePath, "utf-8");
    return JSON.parse(fileContent) as SiteContent;
  } catch (error) {
    console.error("Error reading content file:", error);
    throw new Error("Failed to read content");
  }
}

// Write content to JSON file
export function saveContent(content: SiteContent): void {
  try {
    fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing content file:", error);
    throw new Error("Failed to save content");
  }
}

// Update a specific section
export function updateSection<K extends keyof SiteContent>(
  section: K,
  data: SiteContent[K]
): SiteContent {
  const content = getContent();
  content[section] = data;
  saveContent(content);
  return content;
}
