"use client"

import type { FC } from "react"
import { Controller } from "react-hook-form"
import FileUploader from "@/components/contact/ContactForm/FileUploader"
import FormConsentCheckboxes from "@/components/contact/FormConsentCheckboxes"
import Input from "@/components/ui/Input"
import MainButton from "@/components/ui/MainButton"
import type { FormType } from "@/types/submissions.types"
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"
import { EMAIL_PATTERN, useContactForm } from "./useContactForm"

interface IContactFormProps {
  formType?: FormType
}

const ContactForm: FC<IContactFormProps> = ({ formType = "Обращение" }) => {
  const { control, errors, upload, isSubmitting, onSubmit } =
    useContactForm(formType)

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
        text={isSubmitting ? "Отправка..." : "Отправить запрос"}
        disableRedirect
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default ContactForm
