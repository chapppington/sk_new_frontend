import type { RefObject } from "react"
import type { IFormState, IQuestion } from "@/app/questionnaire/shared/types"
import type { FeederData } from "../QuestionDropdown/components/FeederSectionOption/types"

export type QuestionnaireType = "ktp" | "krun" | "kso"

export interface QuestionnaireProps {
  formState: IFormState
  handleStateChange: (
    key: number,
    value: string | number | string[] | Record<string, FeederData[]>,
  ) => void
  stageRefs: RefObject<(HTMLDivElement | null)[]>
  onSuccess?: () => void
  questions: IQuestion[]
  questionnaireType: QuestionnaireType
  title?: string
}
