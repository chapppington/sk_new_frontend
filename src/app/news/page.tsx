import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import seoService from "@/services/seo/seo.service"
import FirstScreen from "@/app/news/screens/FirstScreen"

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
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <NewsGrid />
      </Suspense>
      <ContactUsScreen />
    </>
  )
}
