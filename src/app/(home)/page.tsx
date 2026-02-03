import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import HomeClientComponent from "./HomeClientComponent"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/", { next: { revalidate: 60 } })
}

export default function Home() {
  return <HomeClientComponent />
}
