"use client"

import Image from "next/image"
import { PagesConfig } from "@/config/pages.config"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import MainButton from "@/components/ui/MainButton"
import type { IProduct, ProductCategoryKey } from "@/types/products.types"
import { PRODUCT_CATEGORIES } from "@/types/products.types"

interface FirstScreenProps {
  product: IProduct
}

function getCategoryLabel(category: string): string {
  const found = PRODUCT_CATEGORIES.find(
    (c) => c.key === (category as ProductCategoryKey),
  )
  return found?.label ?? category
}

const FirstScreen = ({ product }: FirstScreenProps) => {
  const categoryLabel = getCategoryLabel(product.category)

  return (
    <header className="flex flex-col justify-between pb-12 md:pb-24">
      <CustomContainer className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
        <div className="hidden lg:flex lg:w-1/2 lg:items-start lg:justify-center pt-8 md:pt-16">
          <div className="relative w-full max-w-xl aspect-square flex items-center justify-center rounded-xl overflow-hidden">
            <Image
              src={product.preview_image_url}
              alt={product.preview_image_alt ?? product.name}
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Breadcrumbs
            className="pb-8 md:pb-16"
            disableContainer
            items={[
              { label: "Главная", href: "/", current: false },
              { label: "Каталог", href: "/catalog", current: false },
            ]}
          />
          <span className="text-white/80 text-base md:text-lg max-w-2xl mb-4 md:mb-6 block">
            {categoryLabel}
          </span>
          <GradientHeading
            className="mb-4 md:mb-8 text-2xl md:text-3xl lg:text-4xl"
            level={1}
          >
            {product.name}
          </GradientHeading>
          <p className="text-white/80 text-sm md:text-base max-w-2xl mb-6 md:mb-10">
            {product.description}
          </p>
          <div className="mb-6 flex flex-col gap-4 md:gap-6 w-full max-w-2xl">
            {product.important_characteristics.map((stat, index) => (
              <div key={index} className="text-white text-base md:text-lg">
                <span className="flex-1">{stat.description}:</span>
                <span className="ml-2 md:ml-4 font-light">
                  {stat.value}{" "}
                  <span className="font-normal">{stat.unit?.text ?? ""}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 mt-4">
            <MainButton
              text="Узнать конечную стоимость"
              href="#contact_us_section"
            />
            <MainButton
              href={PagesConfig.catalog.href}
              text="Назад в каталог"
              transparent
              className="sm:ml-8 sm:mt-5"
            />
          </div>
        </div>
      </CustomContainer>
    </header>
  )
}

export default FirstScreen
