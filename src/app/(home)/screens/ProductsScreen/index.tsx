"use client"

import { products } from "@/app/(home)/screens/ProductsScreen/data"
import ProductsScreenInfo from "@/app/(home)/screens/ProductsScreen/slider/ProductsScreenInfo"
import ProductsScreenSlider from "@/app/(home)/screens/ProductsScreen/slider/ProductsScreenSlider"
import { useProductsSlider } from "@/app/(home)/screens/ProductsScreen/slider/useProductsSlider"
import CustomContainer from "@/components/ui/CustomContainer"
import BracketsText from "@/components/ui/BracketsText"

export default function ProductsScreen() {
  const {
    indicatorsRef,
    swiperRef,
    showButton,
    currentIndex,
    setCurrentIndex,
  } = useProductsSlider(products.length)

  const currentProduct = products[currentIndex]

  return (
    <section id="products_slider_section" className="bg-transparent py-24">
      <CustomContainer>
        <BracketsText className="mb-8">МЫ ПРОИЗВОДИМ</BracketsText>

        <div className="flex flex-col lg:flex-row gap-12">
          <ProductsScreenInfo
            currentProduct={currentProduct}
            currentIndex={currentIndex}
            showButton={showButton}
            onPrevClick={() => swiperRef.current?.slidePrev()}
            onNextClick={() => swiperRef.current?.slideNext()}
          />
          <ProductsScreenSlider
            products={products}
            indicatorsRef={indicatorsRef}
            onSlideChange={setCurrentIndex}
            onSwiperInit={(swiper) => {
              swiperRef.current = swiper
            }}
          />
        </div>
      </CustomContainer>
    </section>
  )
}
