import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import FirstScreen from "@/app/vacancies/screens/FirstScreen"
import seoService from "@/services/seo/seo.service"

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/vacancies", { next: { revalidate: 60 } })
}

const VacanciesScreen = dynamic(
  () => import("@/app/vacancies/screens/VacanciesScreen"),
)
const ValuesScreen = dynamic(
  () => import("@/app/vacancies/screens/ValuesScreen"),
)
const AdvantagesScreen = dynamic(
  () => import("@/app/vacancies/screens/AdvantagesScreen"),
)
const ReviewsScreen = dynamic(
  () => import("@/app/vacancies/screens/ReviewsScreen"),
)
const FaqScreen = dynamic(() => import("@/app/vacancies/screens/FaqScreen"))
const VacancyFormScreen = dynamic(
  () => import("@/app/vacancies/screens/VacancyFormScreen"),
)

export default function VacanciesPage() {
  return (
    <main>
      <FirstScreen />
      <Suspense fallback={<div>Loading...</div>}>
        <VacanciesScreen />
      </Suspense>
      <ValuesScreen />
      <AdvantagesScreen />
      <ReviewsScreen />
      <FaqScreen />
      <VacancyFormScreen />
    </main>
  )
}
