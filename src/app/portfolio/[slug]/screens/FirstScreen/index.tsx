"use client"

import Image from "next/image"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import type { IPortfolio } from "@/types/portfolios.types"

interface FirstScreenProps {
  portfolio: IPortfolio
}

const FirstScreen = ({ portfolio }: FirstScreenProps) => {
  return (
    <section className="pb-12">
      <CustomContainer>
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Кейс", href: "#", current: true },
          ]}
          className="mb-8"
          disableContainer
        />

        {/* Headings and Description */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10 my-12">
          <div>
            <GradientHeading className="mb-2 2xl:text-5xl" level={1}>
              {portfolio.name}
            </GradientHeading>
          </div>
          <div>
            <div className="max-w-xl text-white/60 text-lg md:text-base">
              {portfolio.description}
            </div>
          </div>
        </div>

        {/* Image Preview */}
        <div className="relative w-full aspect-[2.8/1] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={portfolio.poster}
            alt={portfolio.poster_alt}
            fill
            priority
            className="object-cover"
          />
        </div>
      </CustomContainer>
    </section>
  )
}

export default FirstScreen
