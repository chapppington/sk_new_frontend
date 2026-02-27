import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import QuestionnaireListPage from "./QuestionnaireListPage"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/questionnaire", { next: { revalidate: 60 } })
}

export default function Page() {
  return <QuestionnaireListPage />
}
