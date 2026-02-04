import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/privacy", { next: { revalidate: 60 } })
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyScreen />
}
