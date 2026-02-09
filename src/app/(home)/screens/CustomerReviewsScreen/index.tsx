"use client"

import { useState } from "react"
import CustomSlider from "@/components/CustomSlider"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import { useReviews } from "@/hooks/useReviews"
import ReviewPopup from "./components/ReviewPopup"
import ReviewSlide from "./components/ReviewSlide"

const CustomerReviewsScreen = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState<number | null>(
    null,
  )

  const { reviews, isLoading } = useReviews({ category: "Клиенты" })

  const activeReview =
    activeReviewIndex !== null ? reviews[activeReviewIndex] : null

  if (isLoading) {
    return (
      <section id="customer_reviews_section" className="bg-transparent py-24">
        <CustomContainer>
          <div className="text-center text-white/60">Загрузка отзывов...</div>
        </CustomContainer>
      </section>
    )
  }

  return (
    <section id="customer_reviews_section" className="bg-transparent py-24">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          <div className="mb-8 md:mb-0">
            <BracketsText>ОТЗЫВЫ</BracketsText>
          </div>

          <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
            <GradientHeading>Мнение наших клиентов</GradientHeading>
            <p className="text-white/70 mt-6">
              Как показывает многолетний опыт работы, наши клиенты ценят не
              только качество продукции, но и индивидуальный подход к решению их
              задач.
            </p>
          </div>
        </div>

        {reviews.length > 0 ? (
          <>
            <CustomSlider
              autoplay={false}
              breakpoints={{
                480: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {reviews.map((review, index) => (
                <ReviewSlide
                  key={review.oid}
                  name={review.name}
                  position={review.position}
                  image={review.image}
                  onClick={() => setActiveReviewIndex(index)}
                />
              ))}
            </CustomSlider>

            {activeReview?.content_url && (
              <ReviewPopup
                image={activeReview.content_url}
                open={activeReviewIndex !== null}
                onOpenChange={(open) => {
                  if (!open) setActiveReviewIndex(null)
                }}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12 text-white/60">
            <p>Отзывы не добавлены</p>
          </div>
        )}
      </CustomContainer>
    </section>
  )
}

export default CustomerReviewsScreen
