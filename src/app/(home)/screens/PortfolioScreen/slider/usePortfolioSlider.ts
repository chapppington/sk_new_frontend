"use client"

import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import {
  INDICATOR_COUNT,
  type SwiperInstance,
  updatePortfolioIndicators,
} from "@/app/(home)/screens/PortfolioScreen/slider/utils"

export function usePortfolioSlider(portfoliosCount: number) {
  const swiperRef = useRef<SwiperInstance | null>(null)
  const indicatorsRef = useRef<HTMLDivElement>(null)
  const [showButton, setShowButton] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!indicatorsRef.current) return

    indicatorsRef.current.innerHTML = ""
    for (let i = 0; i < INDICATOR_COUNT; i++) {
      const bar = document.createElement("div")
      bar.className =
        "portfolio-indicator-bar bg-white transition-all duration-300 flex-1"
      bar.style.maxWidth = "1px"
      bar.style.width = "1px"
      bar.style.height = "4px"
      indicatorsRef.current.appendChild(bar)
    }

    if (swiperRef.current) {
      updatePortfolioIndicators(swiperRef.current, portfoliosCount)
    }

    ScrollTrigger.refresh()
    const t = setTimeout(() => setShowButton(true), 100)

    return () => {
      clearTimeout(t)
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true)
        swiperRef.current = null
      }
      indicatorsRef.current?.replaceChildren()
    }
  }, [portfoliosCount])

  return {
    indicatorsRef,
    swiperRef,
    showButton,
    currentIndex,
    setCurrentIndex,
  }
}
