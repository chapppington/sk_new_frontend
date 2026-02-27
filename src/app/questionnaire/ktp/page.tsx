import type { Metadata } from "next"
import seoService from "@/services/seo/seo.service"
import QuestionnairePage from "./QuestionnairePage"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/questionnaire/ktp", {
    next: { revalidate: 60 },
  })
}

export default function Page() {
  return <QuestionnairePage />
}
