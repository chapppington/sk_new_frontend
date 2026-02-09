export type FormType = "Опросный лист" | "Отклик на вакансию" | "Обращение"

export interface ISubmission {
  oid: string
  form_type: FormType
  name: string
  email: string | null
  phone: string | null
  comments: string | null
  files: string[]
  answers_file_url: string | null
  created_at: string
  updated_at: string
}

export interface ICreateSubmissionData {
  form_type: FormType
  name: string
  email?: string
  phone?: string
  comments?: string
  files?: string[]
  answers_file_url?: string
}
