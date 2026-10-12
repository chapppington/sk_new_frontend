import dynamic from "next/dynamic"
import CatalogHeader from "@/app/catalog/screens/CatalogHeader"

const CatalogSection = dynamic(
  () => import("@/app/catalog/screens/CatalogScreen"),
)
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

export default function CatalogPageView() {
  return (
    <main>
      <CatalogHeader />
      <CatalogSection />
      <ContactUsScreen />
    </main>
  )
}
