import type { Metadata } from "next"
import dynamic from "next/dynamic"
import FirstScreen from "@/app/news/screens/FirstScreen"
import seoService from "@/services/seo/seo.service"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/news", { next: { revalidate: 60 } })
}

const NewsGrid = dynamic(() => import("@/app/news/screens/NewsGridScreen"))
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

export default function News() {
  return (
    <>
      <FirstScreen />
      <NewsGrid />
      <ContactUsScreen />
    </>
  )
}
