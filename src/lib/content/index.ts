import { useSearch } from "@tanstack/react-router";

import { BUSINESS, type BusinessCopy } from "./business";
import { ko } from "./ko";
import { en } from "./en";
import { ja } from "./ja";
import { zh } from "./zh";
import { DEFAULT_LOCALE, isLocale, type Locale, type SiteCopy } from "./types";

export * from "./types";

export const CONTENT: Record<Locale, SiteCopy> = { ko, en, ja, zh };

export function useLocale(): Locale {
  const search = useSearch({ strict: false }) as { lang?: unknown };
  return isLocale(search?.lang) ? search.lang : DEFAULT_LOCALE;
}

export function useCopy(): SiteCopy {
  return CONTENT[useLocale()];
}

export function useBusiness(): BusinessCopy {
  return BUSINESS[useLocale()];
}

export function getCopy(locale: unknown): SiteCopy {
  return CONTENT[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

export function getCollection(copy: SiteCopy, slug: string) {
  return copy.collections.find((c) => c.slug === slug);
}

export function getBrand(copy: SiteCopy, slug: string) {
  return copy.brands.find((b) => b.slug === slug);
}

export function getNews(copy: SiteCopy, slug: string) {
  return copy.news.find((n) => n.slug === slug);
}
