import type { Metadata } from "next"
import type { ISeoSettings } from "@/types/seo.types"

export function toMetadata(seo: ISeoSettings | null): Metadata {
  if (!seo) return {}

  const hasOg = seo.og_title ?? seo.og_description ?? seo.og_image
  const openGraph = hasOg
    ? {
        title: seo.og_title ?? undefined,
        description: seo.og_description ?? undefined,
        images: seo.og_image ? [seo.og_image] : undefined,
      }
    : undefined

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ?? undefined,
    openGraph,
    alternates: seo.canonical_url
      ? { canonical: seo.canonical_url }
      : undefined,
  }
}

export function normalizePath(pagePath: string): string {
  if (!pagePath || pagePath === "/") return "/"
  return pagePath.startsWith("/") ? pagePath : `/${pagePath}`
}
