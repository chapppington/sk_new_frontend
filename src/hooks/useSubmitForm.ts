import { useMutation } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import submissionsService from "@/services/submissions.service"
import type { ICreateSubmissionData } from "@/types/submissions.types"

export function useSubmitForm(onSuccessCallback?: () => void) {
  const submitMutation = useMutation({
    mutationFn: (data: ICreateSubmissionData) => {
      return submissionsService.create(data)
    },
    onSuccess: () => {
      toast.success(
        "Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время",
      )
      onSuccessCallback?.()
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        console.error(
          "Ошибка отправки заявки:",
          error.response?.status,
          error.response?.data,
        )
      } else {
        console.error("Ошибка отправки заявки:", error)
      }
      toast.error(
        "Не удалось отправить заявку. Попробуйте еще раз или обновите страницу",
      )
    },
  })

  return {
    submitForm: submitMutation.mutate,
    submitFormAsync: submitMutation.mutateAsync,
    isSubmitting: submitMutation.isPending,
    isSuccess: submitMutation.isSuccess,
    error: submitMutation.error,
    reset: submitMutation.reset,
  }
}
