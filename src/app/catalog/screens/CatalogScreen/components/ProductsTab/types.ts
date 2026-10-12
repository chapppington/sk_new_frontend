import type { RefObject } from "react"
import type { CatalogTextNode } from "@/types/catalog-text.types"

export interface ProductsTabProps {
  productsGridRef: RefObject<HTMLDivElement | null>
  paginationRef: RefObject<HTMLDivElement | null>
  noResultsRef: RefObject<HTMLDivElement | null>
  content: CatalogTextNode | null
}
