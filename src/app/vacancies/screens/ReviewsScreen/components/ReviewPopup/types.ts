import type { Review } from "../../types"

export interface ReviewPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: Review | null
}
