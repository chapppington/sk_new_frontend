"use client"

import type { FC } from "react"
import { Controller } from "react-hook-form"
import FileUploader from "@/components/contact/FileUploader"
import Input from "@/components/ui/Input"
import MainButton from "@/components/ui/MainButton"
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"
import type { FormType } from "@/types/submissions.types"
import { EMAIL_PATTERN, useContactForm } from "./useContactForm"

interface IContactFormProps {
  formType?: FormType
}

const ContactForm: FC<IContactFormProps> = ({ formType = "Обращение" }) => {
  const { control, errors, upload, isSubmitting, onSubmit } = useContactForm(formType)

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
      <Controller
        name="consent"
        control={control}
        rules={{ required: "Необходимо согласие" }}
        render={({ field: { value, onChange, ...field } }) => (
          <label className="flex items-center text-white/80 cursor-pointer">
            <div className="relative flex items-center mr-3">
              <input
                type="checkbox"
                checked={value}
                disabled={isSubmitting}
                className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer"
                onChange={(e) => onChange(e.target.checked)}
                {...field}
              />
              <div className="absolute w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <span className={errors.consent ? "text-red-400" : ""}>
              Я согласен с условиями обработки персональных данных
            </span>
          </label>
        )}
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
