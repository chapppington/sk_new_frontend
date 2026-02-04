"use client"

import type { FC } from "react"
import { getPortfolioHref } from "@/app/(home)/screens/PortfolioScreen/slider/utils"
import AnimatedText from "@/components/ui/AnimatedText"
import GradientHeading from "@/components/ui/GradientHeading"
import MainButton from "@/components/ui/MainButton"
import type { IPortfolio } from "@/types/portfolios.types"

const DESCRIPTION_MAX_LENGTH = 150

interface PortfolioScreenInfoProps {
  currentPortfolio: IPortfolio | undefined
  currentIndex: number
  showButton: boolean
}

const PortfolioScreenInfo: FC<PortfolioScreenInfoProps> = ({
  currentPortfolio,
  currentIndex,
  showButton,
}) => {
  const description =
    currentPortfolio?.description &&
    currentPortfolio.description.length > DESCRIPTION_MAX_LENGTH
      ? `${currentPortfolio.description.slice(0, DESCRIPTION_MAX_LENGTH)}...`
      : (currentPortfolio?.description ?? "")

  return (
    <div
      className="w-full xl:w-1/2 mb-8 xl:mb-0 flex flex-col justify-end"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="mb-6">
        <AnimatedText animateOnScroll={false} delay={0.1} key={currentIndex}>
          <GradientHeading>{currentPortfolio?.name ?? ""}</GradientHeading>
        </AnimatedText>
      </div>
      <AnimatedText
        animateOnScroll={false}
        delay={0.2}
        key={`desc-${currentIndex}`}
      >
        <p className="text-white/60 text-lg mb-4 max-w-lg">{description}</p>
      </AnimatedText>

      {showButton && currentPortfolio && (
        <MainButton
          text="Узнать подробнее"
          href={getPortfolioHref(currentPortfolio.slug)}
        />
      )}
    </div>
  )
}

export default PortfolioScreenInfo
