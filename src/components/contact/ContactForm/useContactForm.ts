import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useUploadFiles } from "@/components/contact/ContactForm/useUploadFiles"
import { useSubmitForm } from "./useSubmitForm"
import type { FormType } from "@/types/submissions.types"

interface IContactFormValues {
  name: string
  email: string
  phone: string
  consent: boolean
}

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export function useContactForm(formType: FormType = "Обращение") {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IContactFormValues>({
    defaultValues: { name: "", email: "", phone: "", consent: false },
  })

  const upload = useUploadFiles("submissions")

  const { submitForm, isSubmitting } = useSubmitForm(() => {
    reset()
    upload.resetFiles()
  })

  // Error text adds new top padding to the page, so we need to refresh the scrollbar
  useEffect(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scrollbar-refresh"))
    })
  }, [errors])

  const onSubmit = handleSubmit((data) => {
    submitForm({
      form_type: formType,
      name: data.name.trim(),
      email: data.email.trim(),
      phone:
        data.phone.replace(/\D/g, "").length > 1
          ? `+${data.phone.replace(/\D/g, "")}`
          : undefined,
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
  }
}
