import dynamic from "next/dynamic"
import CatalogHeader from "@/app/catalog/screens/CatalogHeader"
import type { CatalogTextNode } from "@/types/catalog-text.types"

const CatalogSection = dynamic(
  () => import("@/app/catalog/screens/CatalogScreen"),
)
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

type CatalogPageViewProps = {
  content?: CatalogTextNode | null
}

export default function CatalogPageView({
  content = null,
}: CatalogPageViewProps) {
  return (
    <main>
      <CatalogHeader />
      <CatalogSection content={content} />
      <ContactUsScreen />
    </main>
  )
}
