"use client"

import type { RefObject } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { Autoplay, Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import ProductsScreenSlide from "@/app/(home)/screens/ProductsScreen/slider/ProductsScreenSlide"
import type { ProductItem } from "@/app/(home)/screens/ProductsScreen/slider/types"
import {
  type SwiperInstance,
  updateProductsIndicators,
} from "@/app/(home)/screens/ProductsScreen/slider/utils"

interface ProductsScreenSliderProps {
  products: ProductItem[]
  indicatorsRef: RefObject<HTMLDivElement | null>
  onSlideChange: (index: number) => void
  onSwiperInit: (swiper: SwiperInstance) => void
}

const ProductsScreenSlider: React.FC<ProductsScreenSliderProps> = ({
  products,
  indicatorsRef,
  onSlideChange,
  onSwiperInit,
}) => (
  <div className="w-full md:w-auto md:min-w-[500px] md:max-w-[500px] relative">
    <div className="absolute inset-0 h-0 w-0 overflow-hidden opacity-0 pointer-events-none md:relative md:h-auto md:w-auto md:overflow-visible md:opacity-100 md:pointer-events-auto">
      <div className="hidden md:flex items-center justify-end h-[400px] absolute right-0 top-0 z-10">
        <div
          ref={indicatorsRef}
          className="flex flex-col items-center justify-between h-full"
          style={{ width: "40px" }}
        />
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        direction="vertical"
        slidesPerView={3}
        loop={true}
        autoplay={false}
        navigation={{
          nextEl: ".slider-next-products",
          prevEl: ".slider-prev-products",
        }}
        onSlideChange={(swiper) => {
          updateProductsIndicators(swiper, products.length)
          onSlideChange(swiper.realIndex % products.length)
          window.dispatchEvent(new CustomEvent("scrollbar-refresh"))
        }}
        onInit={(swiper) => {
          onSwiperInit(swiper as unknown as SwiperInstance)
          setTimeout(() => {
            updateProductsIndicators(swiper, products.length)
            onSlideChange(swiper.realIndex % products.length)
            window.dispatchEvent(new CustomEvent("scrollbar-refresh"))
          }, 0)
        }}
        className="h-[400px] w-full"
        breakpoints={{
          320: { slidesPerView: 3, spaceBetween: 10 },
          768: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductsScreenSlide product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
)

export default ProductsScreenSlider
