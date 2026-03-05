"use client"

import Breadcrumbs from "@/components/ui/Breadcrumbs"
import MainButton from "@/components/ui/MainButton"
import { FC, useState, useMemo } from "react"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import ProductsSlider3D from "@/components/ProductsSlider3D/main"
import { ScrollOffsetProvider } from "@/components/ProductsSlider3D/features/ScrollProviderOffset"
import SliderSelectButtons from "@/components/ui/SliderSelectButtons"
import { mockup } from "@/components/ProductsSlider3D/features/mockup"
import styles from "@/components/ui/GradientHeading/styles.module.css"

const FirstScreen: FC = () => {
  // Added state management for the counter
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = mockup.length // Set the total number of slides

  // Generate indicator bars
  const indicatorBars = useMemo(() => {
    const indicatorCount = 60
    return Array.from({ length: indicatorCount }).map((_, index) => {
      // Calculate active position
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
      <header className="relative flex flex-col min-h-svh min-[2000px]:h-[65vh] min-[2000px]:min-h-0 max-h-svh overflow-y-hidden">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/", current: false },
            { label: "Каталог", href: "/catalog", current: true },
          ]}
        />

        {/* Main Content */}
        <CustomContainer
          className="flex flex-col justify-between min-[2000px]:min-h-0! min-[2000px]:flex-1"
          fullHeight
        >
          <div className="pt-8 sm:pt-12 md:pt-16 min-[2000px]:pt-6 flex items-start relative">
            <GradientHeading
              className={`${styles.fluidHeadingMain} 2xl:text-6xl z-10 `}
              level={1}
            >
              Оборудование для надежного электроснабжения
            </GradientHeading>

            <div className="hidden xl:block pt-8 xl:pt-12">
              <ProductsSlider3D
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                absolute
              />
            </div>
          </div>

          {/* Bottom Content - Three-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-end mt-auto mb-8 min-[2000px]:mb-4">
            {/* Column 1: Text with Button (spans 4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-end mb-8 lg:mb-0">
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

            {/* Column 2: Counter and Navigation Buttons (spans 2 cols) */}
            <div className="lg:col-span-2 hidden xl:block">
              <SliderSelectButtons
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
              />
            </div>

            {/* Column 3: Indicators (spans 6 cols) */}
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
      </header>
    </ScrollOffsetProvider>
  )
}

export default FirstScreen
