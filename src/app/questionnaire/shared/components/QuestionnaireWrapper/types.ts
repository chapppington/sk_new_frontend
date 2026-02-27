import { IQuestion, IStage } from "@/app/questionnaire/shared/types"

export type QuestionnaireType = "ktp" | "krun" | "kso"

export interface QuestionnaireWrapperProps {
  questions: IQuestion[]
  stages: IStage[]
  questionnaireType: QuestionnaireType
  title?: string
  subtitle?: string
  breadcrumbLabel?: string
}
