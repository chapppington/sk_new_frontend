import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useUploadFiles } from "@/components/contact/ContactForm/useUploadFiles"
import { useSubmitForm } from "@/components/contact/ContactForm/useSubmitForm"
import { useVacancies } from "@/hooks/useVacancies"
import type { IVacancy } from "@/types/vacancies.types"

export interface IVacancyContactFormValues {
  name: string
  email: string
  phone: string
  vacancyId: string
  coverLetter: string
  consent: boolean
}

const FORM_TYPE = "Отклик на вакансию" as const

export function useVacancyContactForm() {
  const { vacancies } = useVacancies({ limit: 200 })

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IVacancyContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      vacancyId: "",
      coverLetter: "",
      consent: false,
    },
  })

  const upload = useUploadFiles("submissions")

  const { submitForm, isSubmitting } = useSubmitForm(() => {
    reset()
    upload.resetFiles()
  })

  useEffect(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scrollbar-refresh"))
    })
  }, [errors])

  const vacancyOptions = vacancies.map((v: IVacancy) => ({
    value: v.oid,
    label: v.title,
  }))

  const onSubmit = handleSubmit((data) => {
    const selectedVacancy = vacancies.find((v) => v.oid === data.vacancyId)
    const vacancyLine =
      selectedVacancy != null ? `Вакансия: ${selectedVacancy.title}` : ""
    const coverLetter = data.coverLetter.trim()
    const parts: string[] = []
    if (vacancyLine) parts.push(vacancyLine)
    if (coverLetter) {
      parts.push("Сопроводительное письмо:\n\n" + coverLetter)
    }
    const comments = parts.join("\n\n") || undefined

    submitForm({
      form_type: FORM_TYPE,
      name: data.name.trim(),
      email: data.email.trim(),
      phone:
        data.phone.replace(/\D/g, "").length > 1
          ? `+${data.phone.replace(/\D/g, "")}`
          : undefined,
      comments,
      vacancy_oid: data.vacancyId || undefined,
      files:
        upload.files.length > 0 ? upload.files.map((f) => f.url) : undefined,
    })
  })

  return {
    control,
    errors,
    upload,
    isSubmitting,
    onSubmit,
    vacancyOptions,
  }
}
