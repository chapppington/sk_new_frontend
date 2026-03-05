import type { Metadata } from "next"
import dynamic from "next/dynamic"
import FirstScreen from "@/app/catalog/screens/FirstScreen"
import seoService from "@/services/seo/seo.service"

const CatalogSection = dynamic(
  () => import("@/app/catalog/screens/CatalogScreen"),
)
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/catalog", { next: { revalidate: 60 } })
}

export default function CatalogPage() {
  return (
    <main>
      <FirstScreen />
      <CatalogSection />
      <ContactUsScreen />
    </main>
  )
}
