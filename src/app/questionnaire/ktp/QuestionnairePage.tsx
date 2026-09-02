"use client"

import QuestionnaireWrapper from "@/app/questionnaire/shared/components/QuestionnaireWrapper"
import { questionsConfig } from "./config/questions"
import { stages } from "./config/stages"

interface QuestionnairePageProps {
  title: string
  subtitle: string
  breadcrumbLabel: string
}

export default function QuestionnairePage({
  title,
  subtitle,
  breadcrumbLabel,
}: QuestionnairePageProps) {
  return (
    <QuestionnaireWrapper
      questions={questionsConfig}
      stages={stages}
      questionnaireType="ktp"
      title={title}
      subtitle={subtitle}
      breadcrumbLabel={breadcrumbLabel}
    />
  )
}
