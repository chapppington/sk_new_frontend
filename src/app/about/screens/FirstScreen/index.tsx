"use client"

import { useState } from "react"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import CustomContainer from "@/components/ui/CustomContainer"
import BlackBoxWithStats from "@/components/ui/BlackBoxWithStats"
import GradientHeading from "@/components/ui/GradientHeading"
import MainButton from "@/components/ui/MainButton"
import styles from "@/components/ui/GradientHeading/styles.module.css"
import ParallaxImage from "@/components/ui/ParallaxImage"
import { useIsMobile } from "@/shared/hooks/use-mobile"
import VideoPopup from "@/components/ui/VideoPopup"
import CircleWithArrowIcon from "@/shared/icons/CircleWithArrowIcon"
import { FIRST_SCREEN } from "./data"

export default function FirstScreen() {
  const [isVideoOpen, setVideoOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    <header className="relative min-h-screen min-[2000px]:h-[80vh] min-[2000px]:min-h-0 overflow-y-hidden">
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <ParallaxImage
          src={FIRST_SCREEN.bgImage}
          alt="О компании"
          priority
          isMobile={isMobile}
        />
      </div>
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-black/45" />
        <div className="overlay-base absolute inset-0 bg-black/20" />
        <div className="overlay-gradient absolute inset-0 bg-linear-to-b from-transparent from-35% to-black" />
      </div>
      <div className="relative z-3 min-[2000px]:flex min-[2000px]:h-[80vh] min-[2000px]:flex-col">
        <Breadcrumbs
          className="relative"
          items={[
            { label: "Главная", href: "/", current: false },
            { label: "О компании", href: "/about", current: true },
          ]}
        />
        <CustomContainer
          className="flex flex-col justify-between pb-[180px] sm:pb-[260px] md:pb-[300px] lg:pb-12 min-[2000px]:min-h-0! min-[2000px]:flex-1 min-[2000px]:pb-4"
          fullHeight
        >
          <GradientHeading
            className={`${styles.fluidHeadingMain} z-10 pt-8 sm:pt-12 md:pt-16`}
            level={1}
          >
            {FIRST_SCREEN.title}
          </GradientHeading>
          <div className="flex z-10">
            <div className="flex flex-col justify-end 2xl:max-w-2xl">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center mb-4 md:mb-6">
                <CircleWithArrowIcon className="w-6 h-6 text-white" />
              </div>
              <p className="text-base md:text-lg laptop:text-xl font-medium text-white/80 lg:max-w-[400px] 2xl:max-w-[600px]">
                {FIRST_SCREEN.subtitle}
              </p>
              <div className="block md:hidden mt-4">
                <MainButton
                  text={FIRST_SCREEN.buttonText}
                  onClick={() => setVideoOpen(true)}
                  size="sm"
                  className="w-fit"
                  disableRedirect
                />
              </div>
              <div className="hidden md:block mt-4">
                <MainButton
                  text={FIRST_SCREEN.buttonText}
                  onClick={() => setVideoOpen(true)}
                  className="w-fit"
                  disableRedirect
                />
              </div>
            </div>
          </div>
        </CustomContainer>
        <BlackBoxWithStats
          transparent={true}
          className="z-5"
          stats={FIRST_SCREEN.stats}
        />
        <VideoPopup
          isOpen={isVideoOpen}
          onClose={() => setVideoOpen(false)}
          videoSrc={FIRST_SCREEN.videoSrc}
          posterSrc={FIRST_SCREEN.bgImage}
        />
      </div>
    </header>
  )
}
