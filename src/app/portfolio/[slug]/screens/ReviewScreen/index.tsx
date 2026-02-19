"use client"

import Image from "next/image"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import BracketsText from "@/components/ui/BracketsText"
import type { IPortfolio } from "@/types/portfolios.types"
import BigFatCommaIcon from "@/shared/icons/BigFatCommaIcon"

interface Props {
  portfolio: IPortfolio
}

const ReviewScreen = ({ portfolio }: Props) => {
  return (
    <section className="relative flex flex-col justify-center overflow-hidden">
      {/* Main Content in CustomContainer */}
      <CustomContainer className="relative z-10 flex flex-col py-24">
        {/* Section Label - Left Aligned, On Top */}
        <div className="w-full flex justify-start">
          <BracketsText className="mb-8 md:mb-12">ОТЗЫВ</BracketsText>
        </div>
        {/* Main Row Content */}
        <div className="flex flex-col md:flex-row items-end justify-between w-full">
          {/* Left: Gradient Heading */}
          <div className="flex-1">
            <GradientHeading className="leading-tight mb-0">
              {portfolio.review_title}
            </GradientHeading>
          </div>

          {/* Right: Testimonial */}
          <div className="flex-1 flex flex-col items-start">
            {/* Big fat commas SVG */}
            <div className="mb-12">
              <BigFatCommaIcon />
            </div>
            {/* Testimonial Text */}
            <blockquote className="text-lg md:text-xl text-gray-300 font-light mb-8 first-line:pl-8">
              {portfolio.review_text}
            </blockquote>
            {/* User Info */}
            <div className="flex items-center gap-4 mt-6">
              {portfolio.review_image && (
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={portfolio.review_image}
                    alt={
                      portfolio.review_image_alt || portfolio.review_name || ""
                    }
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <div className="text-white font-semibold text-lg">
                  {portfolio.review_name}
                </div>
                <div className="text-gray-400 text-sm">
                  {portfolio.review_role}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  )
}

export default ReviewScreen
