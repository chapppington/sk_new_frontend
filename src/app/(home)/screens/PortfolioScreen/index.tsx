"use client"

import Image from "next/image"
import PortfolioScreenInfo from "@/app/(home)/screens/PortfolioScreen/slider/PortfolioScreenInfo"
import PortfolioScreenSlider from "@/app/(home)/screens/PortfolioScreen/slider/PortfolioScreenSlider"
import { usePortfolioSlider } from "@/app/(home)/screens/PortfolioScreen/slider/usePortfolioSlider"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import { usePortfolios } from "@/hooks/usePortfolios"

const DEFAULT_LIST_PARAMS = { limit: 100 }

export default function PortfolioScreen() {
  const { portfolios, isLoading, error } = usePortfolios(DEFAULT_LIST_PARAMS)

  const {
    indicatorsRef,
    swiperRef,
    showButton,
    currentIndex,
    setCurrentIndex,
  } = usePortfolioSlider(portfolios.length)

  const currentPortfolio = portfolios[currentIndex]

  if (isLoading) {
    return (
      <div className="text-center text-white py-24">Загрузка портфолио...</div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-24">
        Ошибка загрузки портфолио
      </div>
    )
  }

  if (!portfolios.length) {
    return (
      <div className="text-center text-white py-24">
        Нет реализованных проектов
      </div>
    )
  }

  return (
    <section
      id="portfolio_section"
      className="bg-transparent py-24 relative min-h-screen flex flex-col justify-end"
    >
      <div className="absolute inset-0 w-full h-full z-0">
        {portfolios.map((portfolio, idx) => (
          <div
            key={portfolio.oid}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: idx === currentIndex ? 1 : 0,
              zIndex: idx === currentIndex ? 2 : 1,
              transition: "opacity 0.6s",
            }}
          >
            <Image
              src={portfolio.poster}
              alt={portfolio.poster_alt || portfolio.name}
              fill
              className="object-cover"
              priority={idx === currentIndex}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black z-20" />
      </div>

      <CustomContainer className="relative z-10">
        <BracketsText className="mb-8">ЧТО РЕАЛИЗОВАЛИ</BracketsText>

        <div className="flex flex-col xl:flex-row gap-12 items-end">
          <PortfolioScreenInfo
            currentPortfolio={currentPortfolio}
            currentIndex={currentIndex}
            showButton={showButton}
          />
          <PortfolioScreenSlider
            portfolios={portfolios}
            currentIndex={currentIndex}
            indicatorsRef={indicatorsRef}
            onSlideChange={setCurrentIndex}
            onSwiperInit={(swiper) => {
              swiperRef.current = swiper
            }}
            onPrevClick={() => swiperRef.current?.slidePrev()}
            onNextClick={() => swiperRef.current?.slideNext()}
          />
        </div>
      </CustomContainer>
    </section>
  )
}
