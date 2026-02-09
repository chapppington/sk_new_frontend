import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import ContactsScreen from "./screens/ContactsScreen"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/contacts", { next: { revalidate: 60 } })
}

export default function ContactsPage() {
  return <ContactsScreen />
}
