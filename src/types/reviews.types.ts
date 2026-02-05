export interface IReview {
  oid: string
  name: string
  category: string
  position: string | null
  image: string | null
  text: string | null
  short_text: string | null
  content_url: string | null
  created_at: string
  updated_at: string
}

export interface IReviewsListParams {
  limit?: number
  offset?: number
  category?: string
  sort_field?: string
  sort_order?: number
}
