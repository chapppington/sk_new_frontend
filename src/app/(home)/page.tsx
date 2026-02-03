import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import Home from "./Home"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/", { next: { revalidate: 60 } })
}

export default function HomePage() {
  return <Home />
}
