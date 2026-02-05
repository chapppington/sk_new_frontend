export interface BreadcrumbItem {
  label: string
  href: string
  current?: boolean
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sibkomplekt.ru"

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const validItems = items.filter((item) => item.label && item.href)

  if (validItems.length === 0) return "{}"

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href.startsWith("/") ? item.href : `/${item.href}`}`,
    })),
  }

  return JSON.stringify(schema)
}
