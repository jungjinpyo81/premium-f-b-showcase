export type Locale = "ko" | "en" | "ja" | "zh";

export const LOCALES: { code: Locale; label: string; htmlLang: string }[] = [
  { code: "ko", label: "KO", htmlLang: "ko" },
  { code: "en", label: "EN", htmlLang: "en" },
  { code: "ja", label: "日", htmlLang: "ja" },
  { code: "zh", label: "中", htmlLang: "zh-Hans" },
];

export const DEFAULT_LOCALE: Locale = "ko";

export function isLocale(value: unknown): value is Locale {
  return value === "ko" || value === "en" || value === "ja" || value === "zh";
}

export type PageMeta = {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
};

export type ServiceItem = { no: string; title: string; body: string };

export type CollectionBrand = {
  name: string;
  nameLocal: string;
  origin: string;
  note: string;
  /** slug in `brands` when a full brand page exists */
  brandSlug?: string;
};

export type Collection = {
  slug: string;
  title: string;
  titleLocal: string;
  lead: string;
  intro: string;
  brands: CollectionBrand[];
};

export type Brand = {
  slug: string;
  name: string;
  nameEn: string;
  origin: string;
  category: string;
  tagline: string;
  intro: string;
  highlights: { title: string; body: string }[];
};

export type NewsItem = {
  slug: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  body: string[];
};

export type SiteCopy = {
  meta: {
    home: PageMeta;
    brands: PageMeta;
    news: PageMeta;
  };
  nav: {
    tasteJourney: string;
    sourcing: string;
    logistics: string;
    brands: string;
    news: string;
    contact: string;
  };
  hero: {
    eyebrow: string;
    titleLines: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  figures: { value: string; label: string }[];
  role: {
    eyebrow: string;
    titleLines: string[];
    paragraphs: string[];
  };
  services: {
    sourcing: { title: string; subtitle: string; items: ServiceItem[] };
    logistics: { title: string; subtitle: string; items: ServiceItem[] };
  };
  framework: {
    eyebrow: string;
    titleLines: string[];
    paragraphs: string[];
  };
  collectionsSection: {
    eyebrow: string;
    titleLines: string[];
  };
  gift: {
    eyebrow: string;
    titleLines: string[];
    lead: string;
    cards: { title: string; body: string }[];
    cta: string;
  };
  inquiry: {
    eyebrow: string;
    title: string;
    lead: string;
  };
  form: {
    company: string;
    name: string;
    email: string;
    phone: string;
    purposeLabel: string;
    purposes: string[];
    stageLabel: string;
    stages: string[];
    messagePlaceholder: string;
    submit: string;
    /** supports {purpose} and {stage} */
    note: string;
    errorRequired: string;
    success: string;
  };
  footer: {
    about: string;
    tasteJourney: string;
    partnership: string;
    partner: string;
    inquiryOnly: string;
  };
  pages: {
    brands: { eyebrow: string; titleLines: string[]; lead: string; cta: string };
    brandDetail: { back: string; cta: string; notFound: string; backToList: string };
    news: { eyebrow: string; title: string; lead: string };
    newsDetail: { back: string; notFound: string; backToList: string };
    collection: { other: string; viewBrand: string; requestInfo: string };
  };
  collections: Collection[];
  brands: Brand[];
  news: NewsItem[];
};
