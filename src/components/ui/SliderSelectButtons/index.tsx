"use client"
import { useEffect, useRef, FC } from "react"
import { useScrollOffset } from "@/components/ProductsSlider3D/features/ScrollProviderOffset"
import { gsap } from "gsap"
import { Power4 } from "gsap/all"
import { mockup } from "@/components/ProductsSlider3D/features/mockup"
import { NavigationButton } from "@/components/ui/NavigationButton"
import { ISectionHeaderProps } from "./types"

const SliderSelectButtons: FC<ISectionHeaderProps> = ({
  currentSlide,
  setCurrentSlide,
}) => {
  const totalSlides = mockup.length
  const { setScrollOffset } = useScrollOffset()
  const tweenRef = useRef({ value: 0 })
  useEffect(() => {
    const newOffset = (currentSlide - 1) / totalSlides
    gsap.to(tweenRef.current, {
      value: newOffset,
      duration: 0.8,
      ease: Power4.easeOut,
      onUpdate: () => {
        setScrollOffset(tweenRef.current.value)
      },
    })
  }, [currentSlide, totalSlides, setScrollOffset])

  // Navigation handlers
  const handleNext = () => {
    setCurrentSlide((prev) => (prev < totalSlides ? prev + 1 : 1))
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev > 1 ? prev - 1 : totalSlides))
  }
  return (
    <div className="lg:col-span-2 flex items-center">
      {/* Slide Counter */}
      <div className="mr-6 text-white text-2xl font-light">
        {currentSlide}/{totalSlides}
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center space-x-3">
        <NavigationButton
          direction="prev"
          sliderId="catalog-products"
          onClick={handlePrev}
        />
        <NavigationButton
          direction="next"
          sliderId="catalog-products"
          onClick={handleNext}
        />
      </div>
    </div>
  )
}
export default SliderSelectButtons
