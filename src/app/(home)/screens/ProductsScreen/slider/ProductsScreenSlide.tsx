"use client"

import Image from "next/image"
import type { FC } from "react"
import type { ProductItem } from "@/app/(home)/screens/ProductsScreen/slider/types"

interface ProductsScreenSlideProps {
  product: ProductItem
}

const ProductsScreenSlide: FC<ProductsScreenSlideProps> = ({ product }) => (
  <div className="group h-full flex items-center">
    <div className="relative flex items-center justify-start w-full h-[90px] border border-white/20 backdrop-blur-md rounded-xl pl-1 transition-all duration-300 max-w-[455px]">
      <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] relative overflow-hidden shrink-0 rounded-lg bg-white p-2">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 60px, 80px"
          className="object-contain"
        />
      </div>
      <h3 className="text-base md:text-xl text-white font-light ml-4 md:ml-6 line-clamp-2 text-left">
        {product.title}
      </h3>
    </div>
  </div>
)

export default ProductsScreenSlide
