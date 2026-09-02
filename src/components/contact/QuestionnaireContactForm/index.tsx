"use client"

import type { FC } from "react"
import { Controller } from "react-hook-form"
import type { QuestionnaireType } from "@/app/questionnaire/shared/components/Questionnaire/types"
import type { IFormState, IQuestion } from "@/app/questionnaire/shared/types"
import FileUploader from "@/components/contact/ContactForm/FileUploader"
import FormConsentCheckboxes from "@/components/contact/FormConsentCheckboxes"
import { EMAIL_PATTERN } from "@/components/contact/ContactForm/useContactForm"
import Input from "@/components/ui/Input"
import MainButton from "@/components/ui/MainButton"
import TextArea from "@/components/ui/TextArea"
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"
import { useQuestionnaireContactForm } from "./useQuestionnaireContactForm"

interface QuestionnaireContactFormProps {
  formState: IFormState
  questions: IQuestion[]
  questionnaireType: QuestionnaireType
  title: string
  onSuccess?: () => void
}

const QuestionnaireContactForm: FC<QuestionnaireContactFormProps> = ({
  formState,
  questions,
  questionnaireType,
  title,
  onSuccess,
}) => {
  const { control, errors, upload, isSubmitting, onSubmit } =
    useQuestionnaireContactForm(
      formState,
      questions,
      questionnaireType,
      title,
      onSuccess,
    )

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <Controller
        name="name"
        control={control}
        rules={{ required: "Введите ФИО" }}
        render={({ field }) => (
          <Input
            type="text"
            label="ФИО"
            error={errors.name?.message}
            disabled={isSubmitting}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Введите почту",
          pattern: { value: EMAIL_PATTERN, message: "Некорректный email" },
        }}
        render={({ field }) => (
          <Input
            type="email"
            label="Почта"
            error={errors.email?.message}
            disabled={isSubmitting}
            {...field}
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        rules={{
          required: "Введите телефон",
          validate: (v) => {
            const digits = v?.replace(/\D/g, "") ?? ""
            return digits.length >= 10 || "Введите корректный номер телефона"
          },
        }}
        render={({ field }) => (
          <Input
            type="tel"
            label="Телефон"
            error={errors.phone?.message}
            disabled={isSubmitting}
            {...field}
            onChange={(e) => {
              const formatted = formatPhoneNumber(e.target.value)
              field.onChange(formatted)
            }}
          />
        )}
      />
      <Controller
        name="comments"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Комментарии и пожелания (необязательно)"
            placeholder="Дополнительная информация, пожелания по заказу"
            error={errors.comments?.message}
            disabled={isSubmitting}
            rows={4}
            {...field}
          />
        )}
      />
      <FileUploader
        files={upload.files}
        uploading={upload.uploading}
        isUploading={upload.isUploading}
        isMaxReached={upload.isMaxReached}
        disabled={isSubmitting}
        onOpenPicker={upload.openFilePicker}
        onRemove={upload.removeFile}
        onFileChange={upload.handleFileChange}
        fileInputRef={upload.fileInputRef}
      />
      <FormConsentCheckboxes
        control={control}
        errors={errors}
        disabled={isSubmitting}
      />
      <MainButton
        text={isSubmitting ? "Отправка..." : "Отправить опросный лист"}
        disableRedirect
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default QuestionnaireContactForm
