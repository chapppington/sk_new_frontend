import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { QuestionnaireType } from "@/app/questionnaire/shared/components/Questionnaire/types"
import type { IFormState, IQuestion } from "@/app/questionnaire/shared/types"
import { useSubmitForm } from "@/components/contact/ContactForm/useSubmitForm"
import { useUploadFiles } from "@/components/contact/ContactForm/useUploadFiles"
import mediaService from "@/services/media/media.service"
import { generateQuestionnairePdf } from "./generateQuestionnairePdf"

export interface IQuestionnaireContactFormValues {
  name: string
  email: string
  phone: string
  comments: string
  consent: boolean
}

const FORM_TYPE = "Опросный лист" as const

export function useQuestionnaireContactForm(
  formState: IFormState,
  questions: IQuestion[],
  questionnaireType: QuestionnaireType,
  title: string,
  onSuccess?: () => void,
) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IQuestionnaireContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      comments: "",
      consent: false,
    },
  })

  const upload = useUploadFiles("submissions")
  const { submitFormAsync, isSubmitting } = useSubmitForm(() => {
    reset()
    upload.resetFiles()
    onSuccess?.()
  })

  useEffect(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scrollbar-refresh"))
    })
  }, [errors])

  const onSubmit = handleSubmit(async (data) => {
    const pdfBlob = await generateQuestionnairePdf(
      formState,
      questions,
      questionnaireType,
      title,
      {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone,
      },
    )
    const pdfFile = new File(
      [pdfBlob],
      `oprosnyj-list-${questionnaireType}-${Date.now()}.pdf`,
      { type: "application/pdf" },
    )

    let answersFileUrl: string | undefined
    try {
      const result = await mediaService.uploadFile(pdfFile, "submissions")
      answersFileUrl = result?.file_url ?? undefined
    } catch (err) {
      console.error("Ошибка загрузки PDF:", err)
      throw err
    }

    const filesUrls = upload.files.map((f) => f.url)

    await submitFormAsync({
      form_type: FORM_TYPE,
      name: data.name.trim(),
      email: data.email.trim(),
      phone:
        data.phone.replace(/\D/g, "").length > 1
          ? `+${data.phone.replace(/\D/g, "")}`
          : undefined,
      comments: data.comments.trim() || undefined,
      answers_file_url: answersFileUrl,
      files: filesUrls.length > 0 ? filesUrls : undefined,
    })
  })

  return {
    control,
    errors,
    upload,
    isSubmitting,
    onSubmit,
  }
}
