"use client"

import type { FC } from "react"
import CustomSlider from "@/components/CustomSlider"
import CustomContainer from "@/components/ui/CustomContainer"
import SectionHeader from "@/components/ui/SectionHeader"
import ProductionStageSliderItem from "./components/ProductionStageSliderItem"
import { PRODUCTION_STAGES } from "./data"

const ProductionStagesScreen: FC = () => {
  return (
    <section
      id="production_stages_section"
      className="bg-transparent py-24 relative"
    >
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-linear-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />

      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText={PRODUCTION_STAGES.sectionHeader.bracketsText}
          heading={PRODUCTION_STAGES.sectionHeader.heading}
          description={PRODUCTION_STAGES.sectionHeader.description}
          desktopOrder={PRODUCTION_STAGES.sectionHeader.desktopOrder}
        />

        <CustomSlider
          autoplay={false}
          autoplayDelay={3000}
          slidesPerView={1}
          spaceBetween={24}
          loop
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {PRODUCTION_STAGES.stages.map((stage) => (
            <ProductionStageSliderItem key={stage.id} stage={stage} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  )
}

export default ProductionStagesScreen
