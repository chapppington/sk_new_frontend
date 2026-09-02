import type { Metadata } from "next"
import { BACKEND_MAIN } from "@/constants"
import type { ISeoSettings } from "@/types/seo.types"

export function buildCanonical(pagePath: string): string {
  const path = normalizePath(pagePath)
  return `${BACKEND_MAIN}${path}`
}

export function toMetadata(
  seo: ISeoSettings | null,
  pagePath?: string,
): Metadata {
  if (!seo && !pagePath) return {}

  const hasOg = seo?.og_title ?? seo?.og_description ?? seo?.og_image
  const openGraph = hasOg
    ? {
        title: seo?.og_title ?? undefined,
        description: seo?.og_description ?? undefined,
        images: seo?.og_image ? [seo.og_image] : undefined,
      }
    : undefined

  const canonical =
    seo?.canonical_url ?? (pagePath ? buildCanonical(pagePath) : undefined)

  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords ?? undefined,
    openGraph,
    alternates: canonical ? { canonical } : undefined,
  }
}

export function normalizePath(pagePath: string): string {
  if (!pagePath || pagePath === "/") return "/"
  return pagePath.startsWith("/") ? pagePath : `/${pagePath}`
}
