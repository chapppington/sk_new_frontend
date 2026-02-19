export interface IMember {
  oid: string
  name: string
  position: string
  image: string
  order: number
  email: string | null
  created_at: string
  updated_at: string
}

export interface IMembersListParams {
  limit?: number
  offset?: number
  sort_field?: string
  sort_order?: number
}
