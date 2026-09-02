import type { Metadata } from "next"
import dynamic from "next/dynamic"
import CatalogHeader from "@/app/catalog/screens/CatalogHeader"
import seoService from "@/services/seo/seo.service"

const CatalogSection = dynamic(
  () => import("@/app/catalog/screens/CatalogScreen"),
)
// const CatalogSliderSection = dynamic(
//   () => import("@/app/catalog/screens/CatalogSliderSection"),
// )
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/catalog", { next: { revalidate: 60 } })
}

export default function CatalogPage() {
  return (
    <main>
      <CatalogHeader />
      <CatalogSection />
      {/* <CatalogSliderSection /> */}
      <ContactUsScreen />
    </main>
  )
}
