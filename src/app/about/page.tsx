import dynamic from "next/dynamic"
import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import FirstScreen from "./screens/FirstScreen"

const HistoryScreen = dynamic(() => import("./screens/HistoryScreen"))
const OwnerCommentScreen = dynamic(() => import("./screens/OwnerCommentScreen"))
const TeamScreen = dynamic(() => import("./screens/TeamScreen"))
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/about", { next: { revalidate: 60 } })
}

export default function AboutPage() {
  return (
    <main>
      <FirstScreen />
      <HistoryScreen />
      <OwnerCommentScreen />
      <TeamScreen />
      <ContactUsScreen />
    </main>
  )
}
