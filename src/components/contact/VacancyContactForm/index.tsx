"use client"

import type { FC } from "react"
import { Controller } from "react-hook-form"
import FileUploader from "@/components/contact/ContactForm/FileUploader"
import { EMAIL_PATTERN } from "@/components/contact/ContactForm/useContactForm"
import Input from "@/components/ui/Input"
import MainButton from "@/components/ui/MainButton"
import TextArea from "@/components/ui/TextArea"
import { formatPhoneNumber } from "@/utils/formatPhoneNumber"
import { useVacancyContactForm } from "./useVacancyContactForm"

const VacancyContactForm: FC = () => {
  const { control, errors, upload, isSubmitting, onSubmit, vacancyOptions } =
    useVacancyContactForm()

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <Controller
        name="vacancyId"
        control={control}
        rules={{ required: "Выберите вакансию" }}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <label className="text-white/80">Вакансия</label>
            <div className="relative">
              <select
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={isSubmitting}
                className="block w-full bg-transparent border border-white/50 text-white p-4 focus:border-white focus:outline-none appearance-none cursor-pointer pr-10 disabled:opacity-70"
              >
                <option value="" className="bg-zinc-900 text-white">
                  Выберите вакансию
                </option>
                {vacancyOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-zinc-900 text-white"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            {errors.vacancyId?.message && (
              <p className="text-red-400 text-sm">{errors.vacancyId.message}</p>
            )}
          </div>
        )}
      />
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
        name="coverLetter"
        control={control}
        render={({ field }) => (
          <TextArea
            label="Сопроводительное письмо (необязательно)"
            placeholder="Расскажите о себе и почему вы хотите присоединиться к команде"
            error={errors.coverLetter?.message}
            disabled={isSubmitting}
            rows={5}
            className={errors.coverLetter ? "border-red-500" : ""}
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
        text={isSubmitting ? "Отправка..." : "Отправить отклик"}
        disableRedirect
        type="submit"
        disabled={isSubmitting}
      />
    </form>
  )
}

export default VacancyContactForm
