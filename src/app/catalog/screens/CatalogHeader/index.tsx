"use client"

import type { FC } from "react"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import styles from "@/components/ui/GradientHeading/styles.module.css"

const CatalogHeader: FC = () => (
  <header className="relative">
    <Breadcrumbs
      items={[
        { label: "Главная", href: "/", current: false },
        { label: "Каталог", href: "/catalog", current: true },
      ]}
    />

    <CustomContainer className="pt-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
        <GradientHeading
          className={`${styles.fluidHeadingMain} 2xl:text-6xl !m-0`}
          level={1}
        >
          Каталог
        </GradientHeading>

        <p className="lg:max-w-md shrink-0 lg:pt-1 text-sm sm:text-base md:text-lg text-white/80">
          Высокотехнологичные решения, которые работают стабильно, безопасно и
          бесперебойно
        </p>
      </div>
    </CustomContainer>
  </header>
)

export default CatalogHeader
