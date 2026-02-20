"use client"

import type { FC } from "react"
import { useState, useRef } from "react"

import CustomContainer from "@/components/ui/CustomContainer"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import GradientHeading from "@/components/ui/GradientHeading"
import TransitionLink from "@/components/ui/TransitionLink"
import AnimatedText from "@/components/ui/AnimatedText"
import ParallaxImage from "@/components/ui/ParallaxImage"
import { NavigationButton } from "@/components/ui/NavigationButton"
import CircleIconButton from "@/components/ui/CircleIconButton"
import Badge from "@/components/ui/Badge"

import { useIsMobile } from "@/shared/hooks/use-mobile"
import {
  useContentAnimation,
  useImageTransition,
} from "./hooks/useNewsAnimations"

import { useNews } from "@/hooks/useNews"
import type { INews } from "@/types/news.types"

const FirstScreen: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useIsMobile()
  const [prevIndex, setPrevIndex] = useState(0)
  const [key, setKey] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)
  const categoryRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  // Fetch latest 5 news from backend
  const { news = [], isLoading, error } = useNews({ limit: 5 })

  // Use custom hooks for animations only when data is loaded
  const shouldRunAnimations = !isLoading && !error && news.length > 0

  // Always call hooks to maintain order, but pass shouldRunAnimations flag
  useContentAnimation(
    {
      contentRef,
      categoryRef,
      titleRef,
      metaRef,
      descriptionRef,
      buttonRef,
    },
    currentIndex,
    shouldRunAnimations,
  )

  useImageTransition(imageRefs, currentIndex, prevIndex, shouldRunAnimations)

  const handlePrev = () => {
    if (!shouldRunAnimations) return
    setPrevIndex(currentIndex)
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : news.length - 1))
    setKey((prev) => prev + 1)
  }

  const handleNext = () => {
    if (!shouldRunAnimations) return
    setPrevIndex(currentIndex)
    setCurrentIndex((prev) => (prev < news.length - 1 ? prev + 1 : 0))
    setKey((prev) => prev + 1)
  }

  // Show loading state
  if (isLoading) {
    return (
      <header className="relative h-svh overflow-hidden">
        <div className="relative h-full bg-black/30">
          <CustomContainer className="h-svh flex flex-col justify-center items-center">
            <div className="text-white text-xl">Загрузка новостей...</div>
          </CustomContainer>
        </div>
      </header>
    )
  }

  // Show error state
  if (error || news.length === 0) {
    return (
      <header className="relative h-svh overflow-hidden">
        <div className="relative h-full bg-black/30">
          <CustomContainer className="h-svh flex flex-col justify-center items-center">
            <div className="text-white text-xl">
              {error ? "Ошибка загрузки новостей" : "Новости не найдены"}
            </div>
          </CustomContainer>
        </div>
      </header>
    )
  }

  const currentNews = news[currentIndex]

  const content = (
    <>
      {/* Base Overlay */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black z-20"></div>

      {/* Image Stack with Parallax */}
      <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
        {news.map((item: INews, index: number) => (
          <div
            key={`news-${item.slug}-${index}`}
            className="absolute inset-0"
            style={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 2 : 1,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <ParallaxImage
              src={item.image_url || "/news_bg.webp"}
              alt={item.alt || item.title}
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : undefined}
              isMobile={isMobile}
            />
          </div>
        ))}
      </div>

      {/* Mobile Navigation - Absolute Positioned */}
      <div className="md:hidden flex items-center justify-between absolute bottom-6 left-0 right-0 px-8 z-31">
        {/* Page Counter */}
        <div className="text-white text-lg news-counter-mobile">
          <span className="text-2xl current-page">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/60">
            /{String(news.length).padStart(2, "0")}
          </span>
        </div>

        {/* Navigation Arrows */}
        <div className="flex space-x-4">
          <NavigationButton
            direction="prev"
            sliderId="news-mobile"
            onClick={handlePrev}
          />
          <NavigationButton
            direction="next"
            sliderId="news-mobile"
            onClick={handleNext}
          />
        </div>
      </div>

      {/* Main Content Container */}
      <CustomContainer className="h-[100svh] flex flex-col justify-end relative z-30">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Новости", href: "#", current: true },
          ]}
          disableContainer={true}
        />
        {/* Desktop Navigation - Absolute Positioned */}
        <div className="hidden md:flex items-center absolute bottom-20 right-10 lg:right-10 2xl:right-28 z-[50]">
          {/* Page Counter */}
          <div className="text-white text-xl news-counter">
            <span className="text-4xl current-page">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/60">
              /{String(news.length).padStart(2, "0")}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex ml-5">
            <NavigationButton
              direction="prev"
              sliderId="news-desktop"
              onClick={handlePrev}
            />
            <NavigationButton
              direction="next"
              sliderId="news-desktop"
              className="ml-3"
              onClick={handleNext}
            />
          </div>
        </div>
        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-end align-start z-30 mb-24 md:mb-6 lg:mb-18">
          <div ref={contentRef} className="md:mb-14 news-content">
            {/* Category */}
            <div ref={categoryRef} className="mb-8 lg:mb-10 news-category">
              <Badge variant="transparent">{currentNews.category}</Badge>
            </div>

            {/* Title */}
            <div ref={titleRef}>
              <TransitionLink
                href={`/news/${currentNews.slug}`}
                className="block hover:opacity-90 transition-opacity"
                aria-label={`Читать новость: ${currentNews.title}`}
              >
                <div className="mb-4">
                  <AnimatedText
                    key={`title-${key}`}
                    animateOnScroll={false}
                    delay={0.1}
                  >
                    <GradientHeading>{currentNews.title}</GradientHeading>
                  </AnimatedText>
                </div>
              </TransitionLink>
            </div>

            {/* Meta Info */}
            <AnimatedText
              key={`meta-${key}`}
              animateOnScroll={false}
              delay={0.2}
            >
              <div
                ref={metaRef}
                className="flex items-center space-x-4 text-white/60 text-sm md:text-base lg:text-base news-meta"
              >
                <span>
                  {currentNews.date
                    ? new Date(currentNews.date).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : new Date(currentNews.created_at).toLocaleDateString(
                        "ru-RU",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                </span>
                <span className="px-2"> • </span>
                <span>{currentNews.reading_time} мин</span>
              </div>
            </AnimatedText>

            {/* Description */}
            <AnimatedText
              key={`desc-${key}`}
              animateOnScroll={false}
              delay={0.4}
            >
              <p
                ref={descriptionRef}
                className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mt-4 news-description"
              >
                {currentNews.short_content ||
                  currentNews.content.substring(0, 150) + "..."}
              </p>
            </AnimatedText>

            {/* Read More Button */}
            <div ref={buttonRef} className="mt-6">
              <CircleIconButton
                href={`/news/${currentNews.slug}`}
                text="Читать"
              />
            </div>
          </div>
        </div>
      </CustomContainer>
    </>
  )

  return (
    <header className="relative h-[100svh] overflow-hidden">
      <div className="relative h-full">{content}</div>
    </header>
  )
}

export default FirstScreen
