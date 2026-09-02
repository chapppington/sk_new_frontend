"use client"

import { type FC, useMemo, useState } from "react"
import { mockup } from "@/components/ProductsSlider3D/features/mockup"
import { ScrollOffsetProvider } from "@/components/ProductsSlider3D/features/ScrollProviderOffset"
import ProductsSlider3D from "@/components/ProductsSlider3D/main"
import CustomContainer from "@/components/ui/CustomContainer"
import MainButton from "@/components/ui/MainButton"
import SliderSelectButtons from "@/components/ui/SliderSelectButtons"

const CatalogSliderSection: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = mockup.length

  const indicatorBars = useMemo(() => {
    const indicatorCount = 60

    return Array.from({ length: indicatorCount }).map((_, index) => {
      const totalPositions = indicatorCount - 5
      const progress =
        totalSlides > 1 ? (currentSlide - 1) / (totalSlides - 1) : 0
      const position = Math.min(
        Math.floor(progress * totalPositions),
        totalPositions,
      )

      let height = "6px"
      if (index >= position && index < position + 5) {
        const relativePos = index - position
        if (relativePos === 2) {
          height = "40px"
        } else if (relativePos === 1 || relativePos === 3) {
          height = "20px"
        } else {
          height = "4px"
        }
      }

      return (
        <div
          key={index}
          className="slider-indicator-bar transition-all duration-300 flex-1"
          style={{
            height,
            maxWidth: "1px",
            width: "1px",
            backgroundColor: "white",
          }}
        />
      )
    })
  }, [currentSlide, totalSlides])

  return (
    <ScrollOffsetProvider>
      <section className="bg-transparent py-24">
        <CustomContainer>
          <div className="hidden xl:flex justify-end mb-12">
            <ProductsSlider3D
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-8">
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="text-sm sm:text-base md:text-lg text-white/80">
                Высокотехнологичные решения, которые работают стабильно,
                безопасно и бесперебойно
              </p>
              <div className="block md:hidden mt-4">
                <MainButton
                  text="Связаться с отделом продаж"
                  size="sm"
                  href="#contact_us_section"
                />
              </div>
              <div className="hidden md:block mt-4">
                <MainButton
                  text="Связаться с отделом продаж"
                  size="md"
                  href="#contact_us_section"
                />
              </div>
            </div>

            <div className="lg:col-span-2 hidden xl:block">
              <SliderSelectButtons
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
              />
            </div>

            <div className="xl:col-span-6 hidden xl:block">
              <div
                id="slider-indicators-container"
                className="h-12 flex items-center"
              >
                <div
                  id="slider-indicators"
                  className="flex items-center justify-between w-full"
                >
                  {indicatorBars}
                </div>
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </ScrollOffsetProvider>
  )
}

export default CatalogSliderSection
