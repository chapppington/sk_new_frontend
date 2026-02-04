"use client"

import { useLenis } from "lenis/react"
import type { RefObject } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import PortfolioScreenSlide from "@/app/(home)/screens/PortfolioScreen/slider/PortfolioScreenSlide"
import {
  type SwiperInstance,
  updatePortfolioIndicators,
} from "@/app/(home)/screens/PortfolioScreen/slider/utils"
import { NavigationButton } from "@/components/ui/NavigationButton"
import type { IPortfolio } from "@/types/portfolios.types"

interface PortfolioScreenSliderProps {
  portfolios: IPortfolio[]
  currentIndex: number
  indicatorsRef: RefObject<HTMLDivElement | null>
  onSlideChange: (index: number) => void
  onSwiperInit: (swiper: SwiperInstance) => void
}

const PortfolioScreenSlider: React.FC<PortfolioScreenSliderProps> = ({
  portfolios,
  currentIndex,
  indicatorsRef,
  onSlideChange,
  onSwiperInit,
}) => {
  const lenis = useLenis()

  return (
    <div className="w-full xl:w-1/2 relative">
      <div className="absolute inset-0 h-0 w-0 overflow-hidden opacity-0 pointer-events-none xl:relative xl:h-auto xl:w-auto xl:overflow-visible xl:opacity-100 xl:pointer-events-auto">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          navigation={{
            nextEl: ".portfolio-next",
            prevEl: ".portfolio-prev",
          }}
          onSlideChange={(swiper) => {
            updatePortfolioIndicators(swiper, portfolios.length)
            onSlideChange(swiper.realIndex % portfolios.length)
            lenis?.resize()
          }}
          onInit={(swiper) => {
            onSwiperInit(swiper as unknown as SwiperInstance)
            setTimeout(() => {
              updatePortfolioIndicators(swiper, portfolios.length)
              onSlideChange(swiper.realIndex % portfolios.length)
            }, 0)
          }}
          className="portfolioSwiper h-[220px] sm:h-[260px] md:h-[300px] w-full max-w-full"
          breakpoints={{
            1280: { slidesPerView: 2 },
          }}
        >
          {portfolios.map((portfolio) => (
            <SwiperSlide key={portfolio.oid}>
              <PortfolioScreenSlide portfolio={portfolio} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center space-x-3">
          <NavigationButton
            direction="prev"
            sliderId="portfolio"
            className="portfolio-prev"
          />
          <NavigationButton
            direction="next"
            sliderId="portfolio"
            className="portfolio-next"
          />
        </div>
        <span className="xl:hidden ml-auto text-white text-base font-medium tabular-nums">
          {currentIndex + 1}/{portfolios.length}
        </span>
        <div className="hidden xl:flex flex-1 relative ml-8">
          <div
            ref={indicatorsRef}
            className="flex items-center justify-between w-full"
            style={{ minHeight: "40px" }}
          />
        </div>
      </div>
    </div>
  )
}

export default PortfolioScreenSlider
