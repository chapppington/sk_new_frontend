import {
  type BreadcrumbItem,
  generateBreadcrumbSchema,
} from "@/utils/breadcrumbSchema"

interface BreadcrumbSchemaScriptProps {
  items: BreadcrumbItem[]
}

export default function BreadcrumbSchemaScript({
  items,
}: BreadcrumbSchemaScriptProps) {
  const schema = generateBreadcrumbSchema(items)
  if (schema === "{}") return null

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schema }}
    />
  )
}
