import type { MouseEvent, ReactNode, RefObject } from "react"

export interface ScrollbarTrackProps {
  onTrackClick: (e: MouseEvent<HTMLDivElement>) => void
  scrollbarRef: RefObject<HTMLDivElement | null>
  children: ReactNode
}
