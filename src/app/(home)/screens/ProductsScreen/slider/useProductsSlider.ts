"use client"

import { useEffect, useRef, useState } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  INDICATOR_COUNT,
  updateProductsIndicators,
  type SwiperInstance,
} from "@/app/(home)/screens/ProductsScreen/slider/utils"

export function useProductsSlider(productsCount: number) {
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
        "products-indicator-bar w-[4px] bg-white transition-all duration-300 flex-1"
      bar.style.maxHeight = "1px"
      bar.style.height = "1px"
      indicatorsRef.current.appendChild(bar)
    }

    if (swiperRef.current) {
      updateProductsIndicators(swiperRef.current, productsCount)
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
  }, [productsCount])

  return {
    indicatorsRef,
    swiperRef,
    showButton,
    currentIndex,
    setCurrentIndex,
  }
}
