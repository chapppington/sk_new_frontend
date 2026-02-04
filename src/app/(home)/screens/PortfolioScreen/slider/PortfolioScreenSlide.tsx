"use client"

import Image from "next/image"
import type { FC } from "react"
import type { IPortfolio } from "@/types/portfolios.types"

interface PortfolioScreenSlideProps {
  portfolio: IPortfolio
}

const PortfolioScreenSlide: FC<PortfolioScreenSlideProps> = ({ portfolio }) => (
  <div className="cursor-pointer group relative h-full">
    <div className="relative h-full overflow-hidden rounded-lg shadow-lg min-h-[220px] sm:min-h-[260px] md:min-h-[300px]">
      <Image
        src={portfolio.poster}
        alt={portfolio.poster_alt || portfolio.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-white/60 text-sm mb-2">{portfolio.year}</div>
        <h3 className="text-white text-xl font-light">{portfolio.name}</h3>
      </div>
    </div>
  </div>
)

export default PortfolioScreenSlide
