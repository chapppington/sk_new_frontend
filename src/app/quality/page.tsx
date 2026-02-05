import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import QualityPolicyScreen from "./screens/QualityPolicyScreen"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/quality", { next: { revalidate: 60 } })
}

export default function QualityPolicyPage() {
  return <QualityPolicyScreen />
}
