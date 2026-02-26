export const VACANCY_CATEGORIES = [
  { key: "kadrovyj-rezerv", label: "Кадровый резерв" },
  { key: "proizvodstvo", label: "Производство" },
  { key: "prodazhi-i-marketing", label: "Продажи и маркетинг" },
  { key: "ofis-kompanii", label: "Офис компании" },
] as const

export type VacancyCategoryKey = (typeof VACANCY_CATEGORIES)[number]["key"]
export type VacancyCategoryLabel = (typeof VACANCY_CATEGORIES)[number]["label"]

export interface IVacancy {
  oid: string
  title: string
  requirements: string[]
  experience: string[]
  salary: number
  category: string
  created_at: string
  updated_at: string
}

export interface IVacancyListParams {
  limit?: number
  offset?: number
  category?: string
  search?: string
  sort_field?: string
  sort_order?: number
}
