import type { CSSProperties, RefObject } from "react"
import { SCROLLBAR_CONFIG } from "../config"
export const calculateDocumentHeight = (): number => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  )
}

export const calculateScrollPercentage = (
  scrollTop: number,
  contentHeight: number,
  viewportHeight: number,
): number => {
  const maxScroll = contentHeight - viewportHeight
  if (maxScroll <= 0) return 0
  return Math.min((scrollTop / maxScroll) * 100, 100)
}

export const getThumbStyle = (
  scrollbarRef: RefObject<HTMLDivElement | null>,
  scrollPercentage: number,
  thumbHeight: number,
): CSSProperties => {
  const trackHeight =
    typeof window !== "undefined"
      ? window.innerHeight
      : scrollbarRef.current?.clientHeight ?? 0
  const availableTravel = Math.max(
    0,
    trackHeight - thumbHeight - SCROLLBAR_CONFIG.navbarHeight,
  )

  return {
    transform: `translateY(${SCROLLBAR_CONFIG.navbarHeight + (scrollPercentage / 100) * availableTravel}px)`,
    height: `${thumbHeight}px`,
  }
}
