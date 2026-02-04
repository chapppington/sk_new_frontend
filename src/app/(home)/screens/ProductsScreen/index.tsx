"use client"

import CustomContainer from "@/components/CustomContainer"
import BracketsText from "@/components/ui/BracketsText"
import { products } from "@/app/(home)/screens/ProductsScreen/mock_data"
import ProductsScreenInfo from "@/app/(home)/screens/ProductsScreen/slider/ProductsScreenInfo"
import ProductsScreenSlider from "@/app/(home)/screens/ProductsScreen/slider/ProductsScreenSlider"
import { useProductsSlider } from "@/app/(home)/screens/ProductsScreen/slider/useProductsSlider"

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

        <div className="flex flex-col md:flex-row gap-12">
          <ProductsScreenInfo
            currentProduct={currentProduct}
            currentIndex={currentIndex}
            showButton={showButton}
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
