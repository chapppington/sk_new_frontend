"use client"

import { type FC, useMemo } from "react"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useReviews } from "@/hooks/useReviews"
import ReviewsSlider from "./components/ReviewsSlider"
import type { Review } from "./types"

const TITLE = "Отзывы сотрудников"
const SUBTITLE =
  "Наши сотрудники ценят стабильность, профессиональный рост и дружественную атмосферу в компании. Узнайте, что они говорят о работе в нашей команде."

const ReviewsScreen: FC = () => {
  const { reviews: apiReviews, isLoading, error } = useReviews({ category: "Сотрудники" })

  const reviewsData: Review[] = useMemo(
    () =>
      apiReviews.map((r) => ({
        name: r.name,
        position: r.position ?? "",
        image: r.image ?? "/avatar_placeholder.png",
        shortText: r.short_text ?? "",
        text: r.text ?? "",
      })),
    [apiReviews],
  )

  if (error) {
    return (
      <section id="customer_reviews_section" className="bg-transparent py-24">
        <CustomContainer>
          <div className="text-center text-white/80">
            Не удалось загрузить отзывы
          </div>
        </CustomContainer>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section id="customer_reviews_section" className="bg-transparent py-24">
        <CustomContainer>
          <div className="flex justify-center py-20">
            <MiniLoader isDark width={40} height={40} />
          </div>
        </CustomContainer>
      </section>
    )
  }

  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>О НАС</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>{TITLE}</GradientHeading>
            <p className="text-white/80 mt-6">{SUBTITLE}</p>
          </div>
        </div>

        {reviewsData.length > 0 ? (
          <ReviewsSlider reviews={reviewsData} />
        ) : (
          <p className="text-white/60 text-center py-12">
            Пока нет отзывов сотрудников
          </p>
        )}
      </CustomContainer>
    </section>
  )
}

export default ReviewsScreen
