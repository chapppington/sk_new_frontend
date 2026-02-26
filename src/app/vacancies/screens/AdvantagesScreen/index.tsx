"use client"

import { FC } from "react"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import BracketsText from "@/components/ui/BracketsText"
import BottomInfoWithIcon from "./BottomInfoWithIcon/BottomInfoWithIcon"
import AdvantagesList from "./AdvantagesList/AdvantagesList"

const TITLE =
  "Преимущества работы в СибКомплект: развитие, стабильность и инновации"

const AdvantagesScreen: FC = () => {
  return (
    <section id="our_advantages_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="mb-16">
          <BracketsText>ПРЕИМУЩЕСТВА</BracketsText>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-16 relative lg:min-h-[500px]">
          <div className="lg:w-1/2 relative z-10 flex flex-col justify-between lg:min_h-[500px] order-first lg:order-last">
            <GradientHeading>{TITLE}</GradientHeading>
            <BottomInfoWithIcon />
          </div>

          <AdvantagesList />
        </div>
      </CustomContainer>
    </section>
  )
}

export default AdvantagesScreen
