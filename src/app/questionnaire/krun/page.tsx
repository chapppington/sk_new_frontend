import type { Metadata } from "next"
import questionnaireSettingsService from "@/services/questionnaire-settings.service"
import seoService from "@/services/seo/seo.service"
import QuestionnairePage from "./QuestionnairePage"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/questionnaire/krun", {
    next: { revalidate: 60 },
  })
}

export default async function Page() {
  const settings = await questionnaireSettingsService.getBySlug("krun", {
    next: { revalidate: 60 },
  })

  return (
    <QuestionnairePage
      title={settings?.h1 ?? "Опросный лист"}
      subtitle={
        settings?.subtitle ??
        "на изготовление комплектного распределительного устройства наружной установки (КРУН/ЯКНО), производства ООО «СибКомплект»"
      }
      breadcrumbLabel={settings?.breadcrumb_label ?? "Опросный лист КРУН/ЯКНО"}
    />
  )
}
