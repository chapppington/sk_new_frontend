export const NEWS_CATEGORIES = [
  { key: "proizvodstvo", label: "Производство" },
  { key: "razrabotki", label: "Разработки" },
  { key: "poleznoe", label: "Полезное" },
  { key: "sobytiya", label: "События" },
  { key: "nashi-proekty", label: "Наши проекты" },
] as const

export type NewsCategoryKey = (typeof NEWS_CATEGORIES)[number]["key"]
export type NewsCategoryLabel = (typeof NEWS_CATEGORIES)[number]["label"]

export interface INews {
  oid: string
  category: string
  title: string
  slug: string
  content: string
  short_content: string
  image_url: string | null
  alt: string | null
  reading_time: number
  date: string
  created_at: string
  updated_at: string
}

export interface INewsListParams {
  limit?: number
  offset?: number
  category?: string
  search?: string
  sort_field?: string
  sort_order?: number
}

export type INewsCreate = Omit<
  INews,
  "oid" | "created_at" | "updated_at" | "slug" | "reading_time"
>

export type INewsCreatePayload = INewsCreate & {
  slug: string
  reading_time: number
}

export type INewsUpdate = Partial<INewsCreatePayload>
