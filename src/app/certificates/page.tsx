import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import CertificatesScreen from "./screens/CertificatesScreen"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/certificates", { next: { revalidate: 60 } })
}

export default function CertificatesPage() {
  return <CertificatesScreen />
}
