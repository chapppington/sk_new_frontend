import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSubmitForm } from "@/components/contact/ContactForm/useSubmitForm"
import { useUploadFiles } from "@/components/contact/ContactForm/useUploadFiles"

export interface IRequestContactFormValues {
  name: string
  email: string
  phone: string
  comment: string
  consent: boolean
}

export function useRequestContactForm(onSuccess?: () => void) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IRequestContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
      consent: false,
    },
  })

  const upload = useUploadFiles("submissions")

  const { submitForm, isSubmitting } = useSubmitForm(() => {
    reset()
    upload.resetFiles()
    onSuccess?.()
  })

  useEffect(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("scrollbar-refresh"))
    })
  }, [errors])

  const onSubmit = handleSubmit((data) => {
    submitForm({
      form_type: "Обращение",
      name: data.name.trim(),
      email: data.email.trim(),
      phone:
        data.phone.replace(/\D/g, "").length > 1
          ? `+${data.phone.replace(/\D/g, "")}`
          : undefined,
      comments: data.comment.trim() || undefined,
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
