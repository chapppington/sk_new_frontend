"use client"

import { useLenis } from "lenis/react"
import { type FC, useState } from "react"
import CustomSlider from "@/components/CustomSlider"
import ReviewItem from "../ReviewItem"
import ReviewPopup from "../ReviewPopup"
import type { ReviewsSliderProps } from "./types"

const ReviewsSlider: FC<ReviewsSliderProps> = ({ reviews }) => {
  const [activeReview, setActiveReview] = useState<number | null>(null)
  const lenis = useLenis()

  const openReviewPopup = (index: number) => {
    setActiveReview(index)
    if (lenis) lenis.stop()
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setActiveReview(null)
      if (lenis) lenis.start()
    }
  }

  return (
    <>
      <CustomSlider
        autoplay={false}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
      >
        {reviews.map((review, index) => (
          <ReviewItem
            key={review.name + index}
            review={review}
            onClick={() => openReviewPopup(index)}
          />
        ))}
      </CustomSlider>

      <ReviewPopup
        open={activeReview !== null}
        onOpenChange={handleDialogOpenChange}
        review={activeReview !== null ? (reviews[activeReview] ?? null) : null}
      />
    </>
  )
}

export default ReviewsSlider
