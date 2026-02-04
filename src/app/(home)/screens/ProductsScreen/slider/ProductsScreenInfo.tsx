"use client"

import type { FC } from "react"
import type { ProductItem } from "@/app/(home)/screens/ProductsScreen/slider/types"
import { getProductHref } from "@/app/(home)/screens/ProductsScreen/slider/utils"
import AnimatedText from "@/components/ui/AnimatedText"
import GradientHeading from "@/components/ui/GradientHeading"
import MainButton from "@/components/ui/MainButton"
import { NavigationButton } from "@/components/ui/NavigationButton"

const DESCRIPTION_MAX_LENGTH = 150

interface ProductsScreenInfoProps {
  currentProduct: ProductItem | undefined
  currentIndex: number
  showButton: boolean
}

const ProductsScreenInfo: FC<ProductsScreenInfoProps> = ({
  currentProduct,
  currentIndex,
  showButton,
}) => {
  const description =
    currentProduct?.description &&
    currentProduct.description.length > DESCRIPTION_MAX_LENGTH
      ? `${currentProduct.description.slice(0, DESCRIPTION_MAX_LENGTH)}...`
      : (currentProduct?.description ?? "")

  return (
    <div
      className="flex-1 flex flex-col justify-end"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="mb-6">
        <AnimatedText animateOnScroll={false} delay={0.1} key={currentIndex}>
          <GradientHeading>{currentProduct?.title ?? ""}</GradientHeading>
        </AnimatedText>
      </div>
      <AnimatedText
        animateOnScroll={false}
        delay={0.2}
        key={`desc-${currentIndex}`}
      >
        <p className="text-white/60 text-lg mb-4 max-w-lg">{description}</p>
      </AnimatedText>

      {showButton && currentProduct && (
        <MainButton
          text="Узнать больше"
          href={getProductHref(currentProduct.slug)}
        />
      )}

      <div className="flex items-center mt-12">
        <div className="flex items-center space-x-3">
          <NavigationButton
            direction="prev"
            sliderId="products"
            className="slider-prev-products"
          />
          <NavigationButton
            direction="next"
            sliderId="products"
            className="slider-next-products"
          />
        </div>
      </div>
    </div>
  )
}

export default ProductsScreenInfo
