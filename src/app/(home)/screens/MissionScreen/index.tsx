"use client"

import type { FC } from "react"
import BracketsText from "@/components/ui/BracketsText"
import CircleIconButton from "@/components/ui/CircleIconButton"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import { PagesConfig } from "@/config/pages.config"

const missionData = {
  mission_title: "Показать новые горизонты, превосходящие ожидания",
  mission_text:
    "Непрерывно совершенствуясь, мы создаём эффективные технические решения, которые обеспечивают удобство эксплуатации и высокий уровень безопасности систем электроснабжения. Соблюдая договорённости и выполняя обязательства, мы остаёмся надёжным партнёром для наших заказчиков.",
  button_text: "Больше о компании",
}

const MissionScreen: FC = () => (
  <section id="mission_section" className="bg-transparent py-20">
    <CustomContainer>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div />
        <div className="relative rounded-2xl">
          <BracketsText className="mb-4">МИССИЯ КОМПАНИИ</BracketsText>
          <GradientHeading className="z-10 mb-6">
            {missionData.mission_title}
          </GradientHeading>
          <p className="text-white/80 text-lg mb-8 max-w-2xl leading-relaxed">
            {missionData.mission_text}
          </p>
          <CircleIconButton
            href={PagesConfig.about.href}
            text={missionData.button_text}
          />
        </div>
      </div>
    </CustomContainer>
  </section>
)

export default MissionScreen
