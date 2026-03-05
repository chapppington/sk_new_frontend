import dynamic from "next/dynamic"
import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import FirstScreen from "@/app/production/screens/FirstScreen"

const ProductionStagesScreen = dynamic(
  () => import("@/app/production/screens/ProductionStagesScreen"),
)
const EquipmentGridScreen = dynamic(
  () => import("@/app/production/screens/EquipmentGridScreen"),
)
const CertificatesScreen = dynamic(
  () => import("@/app/production/screens/CertificatesScreen"),
)
const ReadMoreScreen = dynamic(
  () => import("@/components/ReadMoreScreen"),
)
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/production", { next: { revalidate: 60 } })
}

export default function ProductionPage() {
  return (
    <main>
      <FirstScreen />
      <ProductionStagesScreen />
      <EquipmentGridScreen />
      <CertificatesScreen />
      <ReadMoreScreen />
      <ContactUsScreen />
    </main>
  )
}
