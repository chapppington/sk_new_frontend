import { pdf } from "@react-pdf/renderer"
import type { QuestionnaireType } from "@/app/questionnaire/shared/components/Questionnaire/types"
import type { IFormState, IQuestion } from "@/app/questionnaire/shared/types"
import { QuestionnairePdfDocument } from "./QuestionnairePdfDocument"

export interface QuestionnaireClientData {
  name: string
  email: string
  phone: string
}

export async function generateQuestionnairePdf(
  formState: IFormState,
  questions: IQuestion[],
  questionnaireType: QuestionnaireType,
  title: string,
  clientData: QuestionnaireClientData,
): Promise<Blob> {
  const doc = (
    <QuestionnairePdfDocument
      formState={formState}
      questions={questions}
      questionnaireType={questionnaireType}
      title={title}
      clientData={clientData}
    />
  )
  const instance = pdf(doc)
  return instance.toBlob()
}
