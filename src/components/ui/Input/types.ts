import type { InputHTMLAttributes, Ref } from "react"

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  isNumber?: boolean
  ref?: Ref<HTMLInputElement>
}
