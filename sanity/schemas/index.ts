import siteSettings from "./siteSettings";
import homePage from "./homePage";
import service from "./service";
import faqItem from "./faqItem";
import navigationItem from "./navigationItem";
import blockContent from "./blockContent";
import pricingItem from "./pricingItem";
import dayHours from "./dayHours";

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  // Documents
  service,
  faqItem,
  navigationItem,
  // Object types
  blockContent,
  pricingItem,
  dayHours,
];
