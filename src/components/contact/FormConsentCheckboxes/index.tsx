"use client"

import type { Ref } from "react"
import type { Control, FieldErrors, FieldValues, Path } from "react-hook-form"
import { Controller } from "react-hook-form"
import { PERSONAL_DATA_DOCUMENTS } from "@/constants/personalDataDocuments"

type FormConsentCheckboxesProps<T extends FieldValues> = {
  control: Control<T>
  errors: FieldErrors<T>
  disabled?: boolean
  consentName?: Path<T>
  marketingConsentName?: Path<T>
}

function CheckboxField({
  checked,
  disabled,
  onChange,
  name,
  onBlur,
  ref,
}: {
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
  name: string
  onBlur: () => void
  ref: Ref<HTMLInputElement>
}) {
  return (
    <div className="relative flex items-center mr-3 shrink-0">
      <input
        ref={ref}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        className="peer appearance-none w-5 h-5 rounded-full border border-white/60 checked:border-white/60 outline-none cursor-pointer disabled:cursor-not-allowed"
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="absolute w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}

function FormConsentCheckboxes<T extends FieldValues>({
  control,
  errors,
  disabled = false,
  consentName = "consent" as Path<T>,
  marketingConsentName = "marketingConsent" as Path<T>,
}: FormConsentCheckboxesProps<T>) {
  const consentError = errors[consentName]?.message as string | undefined
  const marketingConsentError = errors[marketingConsentName]?.message as
    | string
    | undefined

  return (
    <div className="space-y-3">
      <Controller
        name={consentName}
        control={control}
        rules={{ required: "Необходимо согласие" }}
        render={({ field: { value, onChange, onBlur, ref, name } }) => (
          <label className="flex items-start text-white/80 cursor-pointer text-sm">
            <CheckboxField
              checked={Boolean(value)}
              disabled={disabled}
              name={name}
              ref={ref}
              onBlur={onBlur}
              onChange={onChange}
            />
            <span className={consentError ? "text-red-400" : ""}>
              Я даю{" "}
              <a
                href={PERSONAL_DATA_DOCUMENTS.personalDataConsent}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                согласие
              </a>{" "}
              на обработку персональных данных на основании{" "}
              <a
                href={PERSONAL_DATA_DOCUMENTS.privacyPolicy}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                Политики по обработке персональных данных
              </a>
            </span>
          </label>
        )}
      />
      <Controller
        name={marketingConsentName}
        control={control}
        render={({ field: { value, onChange, onBlur, ref, name } }) => (
          <label className="flex items-start text-white/80 cursor-pointer text-sm">
            <CheckboxField
              checked={Boolean(value)}
              disabled={disabled}
              name={name}
              ref={ref}
              onBlur={onBlur}
              onChange={onChange}
            />
            <span className={marketingConsentError ? "text-red-400" : ""}>
              Я{" "}
              <a
                href={PERSONAL_DATA_DOCUMENTS.marketingConsent}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                согласен
              </a>{" "}
              на получение информации рекламного характера
            </span>
          </label>
        )}
      />
    </div>
  )
}

export default FormConsentCheckboxes
