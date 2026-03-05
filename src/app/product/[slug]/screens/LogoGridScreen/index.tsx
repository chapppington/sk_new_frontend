"use client"

import type { FC } from "react"
import AnimatedText from "@/components/ui/AnimatedText"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import LogoGrid from "@/components/ui/LogoGrid"
import type { IProduct } from "@/types/products.types"

import { samplePartners } from "./mock_data"

interface LogoGridScreenProps {
  product: IProduct
}

const LogoGridScreen: FC<LogoGridScreenProps> = ({ product }) => {
  return (
    <CustomContainer className="py-24">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <AnimatedText delay={0} animateOnScroll={false}>
          <GradientHeading className="text-center md:text-right">
            Нас уже выбрали
          </GradientHeading>
        </AnimatedText>
        <BracketsText className="md:mb-0 mb-2">ПАРТНЕРЫ</BracketsText>
      </div>
      <LogoGrid partners={samplePartners} />
    </CustomContainer>
  )
}

export default LogoGridScreen
