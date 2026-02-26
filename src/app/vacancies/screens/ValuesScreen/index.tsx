"use client"

import { FC, useState } from "react"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import ValueCard from "./ValueCard"
import { valuesData } from "./data"

const TITLE = "Показать новые горизонты, превосходящие ожидания"
const PARAGRAPH =
  "Мы приглашаем в свою команду тех, кто уже на подсознательном уровне разделяет ценности нашей компании. Это помогает быстрее адаптировать и взаимодействовать с сотрудником, работать «на одной волне», понимать что вас связывает не только работа, а что-то большее... взгляды на жизнь, понимание сути вещей именно на одном уровне."

const ValuesScreen: FC = () => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="our_values_section" className="bg-transparent py-24">
      <CustomContainer className="relative">
        <div className="mb-12">
          <span className="text-white/40 text-sm tracking-wider">
            [ МИССИЯ И ЦЕННОСТИ КОМПАНИИ ]
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch relative lg:min-h-[440px]">
          <div className="lg:w-2/5 relative z-10">
            <GradientHeading>{TITLE}</GradientHeading>
            <div className="lg:absolute lg:bottom-0 max-w-2xl mb-6 lg:mb-0 mt-8 lg:mt-0">
              <p className="text-white/60 text-base">{PARAGRAPH}</p>
            </div>
          </div>
        </div>

        <div className="values-tabs hidden lg:flex absolute top-0 right-0 bottom-0 h-full">
          {valuesData.map((value, index) => (
            <ValueCard
              key={value.title + index}
              data={value}
              isActive={activeTab === index}
              variant="desktop"
              onMouseEnter={() => setActiveTab(index)}
              onMouseLeave={() => setActiveTab(0)}
            />
          ))}
        </div>

        <div className="lg:hidden space-y-4 mt-12">
          {valuesData.map((value, index) => (
            <ValueCard
              key={value.title + index}
              data={value}
              variant="mobile"
            />
          ))}
        </div>
      </CustomContainer>
    </section>
  )
}

export default ValuesScreen
