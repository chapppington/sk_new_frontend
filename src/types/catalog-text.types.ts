export type CatalogTextMark = {
  type: string
  attrs?: Record<string, unknown>
}

export type CatalogTextNode = {
  type: string
  text?: string
  attrs?: {
    level?: number
    start?: number
  }
  marks?: CatalogTextMark[]
  content?: CatalogTextNode[]
}

export type CatalogText = {
  oid: string
  category: string
  content: CatalogTextNode
  created_at: string
  updated_at: string
}
