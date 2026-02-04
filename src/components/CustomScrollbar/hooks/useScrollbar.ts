import { useLenis } from "lenis/react"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { SCROLLBAR_CONFIG } from "../config"
import type { ScrollbarConfig, ScrollbarRefs, ScrollbarState } from "../types"

export const useScrollbar = (config: ScrollbarConfig = SCROLLBAR_CONFIG) => {
  const pathname = usePathname()
  const lenis = useLenis()

  const [state, setState] = useState<ScrollbarState>({
    scrollPercentage: 0,
    contentHeight: 0,
    viewportHeight: 0,
    isHovered: false,
    isDesktop: false,
  })

  const scrollbarRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startYRef = useRef(0)
  const startScrollPercentageRef = useRef(0)
  const contentHeightRef = useRef(0)
  const viewportHeightRef = useRef(0)

  const refs: ScrollbarRefs = {
    scrollbarRef,
    thumbRef,
    isDragging: isDraggingRef,
    startY: startYRef,
    startScrollPercentage: startScrollPercentageRef,
    contentHeightRef,
    viewportHeightRef,
  }

  // Handle desktop detection
  useEffect(() => {
    const checkIfDesktop = () => {
      setState((prev) => ({
        ...prev,
        isDesktop: window.innerWidth >= config.desktopBreakpoint,
      }))
    }

    checkIfDesktop()
    window.addEventListener("resize", checkIfDesktop)
    return () => window.removeEventListener("resize", checkIfDesktop)
  }, [config.desktopBreakpoint])

  // Reset scroll on page change
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
      setState((prev) => ({ ...prev, scrollPercentage: 0 }))
    }
  }, [pathname, lenis])

  // Handle scroll and height calculations
  useEffect(() => {
    if (!lenis || !state.isDesktop) return

    const updateScrollState = () => {
      const contentHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const scrollTop = lenis.scroll
      const limit = (lenis as { limit?: number }).limit
      const docMaxScroll = Math.max(0, contentHeight - viewportHeight)
      const maxScroll = limit !== undefined && limit >= 0 ? limit : docMaxScroll
      const scrollPercentage =
        maxScroll <= 0 ? 0 : Math.min((scrollTop / maxScroll) * 100, 100)

      refs.contentHeightRef.current = contentHeight
      refs.viewportHeightRef.current = viewportHeight

      setState((prev) => ({
        ...prev,
        contentHeight,
        viewportHeight,
        scrollPercentage,
      }))
    }

    // Initial calculation
    updateScrollState()

    const onScroll = () => updateScrollState()
    lenis.on("scroll", onScroll)

    // Setup resize listener with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateScrollState, 100)
    }
    window.addEventListener("resize", handleResize)

    // Listen for explicit refresh (e.g. from ProductsSlider after layout change)
    const handleScrollbarRefresh = () => {
      requestAnimationFrame(() => {
        lenis.resize()
        updateScrollState()
      })
    }
    window.addEventListener("scrollbar-refresh", handleScrollbarRefresh)

    return () => {
      lenis.off("scroll", onScroll)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scrollbar-refresh", handleScrollbarRefresh)
      clearTimeout(resizeTimeout)
    }
  }, [lenis, state.isDesktop])

  return { state, refs, lenis }
}
