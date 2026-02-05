"use client"

import { usePathname } from "next/navigation"
import {
  type BreadcrumbItem,
  generateBreadcrumbSchema,
} from "@/utils/breadcrumbSchema"

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const pathname = usePathname()

  if (!items?.length) return null

  const normalizedItems = items.map((item) =>
    !item.href || item.href === "#" ? { ...item, href: pathname || "/" } : item,
  )

  const schema = generateBreadcrumbSchema(normalizedItems)
  if (schema === "{}") return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  )
}
