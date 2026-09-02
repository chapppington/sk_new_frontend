"use client"

import type { FC } from "react"
import { Controller } from "react-hook-form"
import FileUploader from "@/components/contact/ContactForm/FileUploader"
import FormConsentCheckboxes from "@/components/contact/FormConsentCheckboxes"
import { EMAIL_PATTERN } from "@/components/contact/ContactForm/useContactForm"
import Input from "@/components/ui/Input"
import MainButton from "@/components/ui/MainButton"
import NoIndex from "@/components/ui/NoIndex"
import TextArea from "@/components/ui/TextArea"
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"
import { useRequestContactForm } from "./useRequestContactForm"

interface RequestContactFormProps {
  onSuccess?: () => void
}

const RequestContactForm: FC<RequestContactFormProps> = ({ onSuccess }) => {
  const { control, errors, upload, isSubmitting, onSubmit } =
    useRequestContactForm(onSuccess)

  return (
    <NoIndex>
      <form
        className="space-y-5 [@media(max-height:820px)]:space-y-3"
        onSubmit={onSubmit}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Введите ФИО" }}
          render={({ field }) => (
            <Input
              type="text"
              label="Ваше имя"
              error={errors.name?.message}
              disabled={isSubmitting}
              className="!p-3 [@media(max-height:820px)]:!p-2.5"
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
              label="Ваша почта"
              error={errors.email?.message}
              disabled={isSubmitting}
              className="!p-3 [@media(max-height:820px)]:!p-2.5"
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
              label="Ваш телефон"
              error={errors.phone?.message}
              disabled={isSubmitting}
              className="!p-3 [@media(max-height:820px)]:!p-2.5"
              {...field}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value)
                field.onChange(formatted)
              }}
            />
          )}
        />
        <Controller
          name="comment"
          control={control}
          render={({ field }) => (
            <TextArea
              label="Комментарий"
              placeholder="Опишите ваш запрос"
              error={errors.comment?.message}
              disabled={isSubmitting}
              rows={3}
              className="!h-[100px] [@media(max-height:820px)]:!h-[65px]"
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
          text={isSubmitting ? "Отправка..." : "Отправить заявку"}
          disableRedirect
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </NoIndex>
  )
}

export default RequestContactForm
