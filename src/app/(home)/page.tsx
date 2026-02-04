import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import HomeClientComponent from "./Home"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/", { next: { revalidate: 60 } })
}

export default function HomePage() {
  return <HomeClientComponent />
}
