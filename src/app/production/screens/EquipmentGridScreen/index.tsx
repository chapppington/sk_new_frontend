"use client"

import { FC } from "react"
import Image from "next/image"
import SectionHeader from "@/components/ui/SectionHeader"
import CustomContainer from "@/components/ui/CustomContainer"
import LogoGrid from "@/components/ui/LogoGrid"
import { EQUIPMENT_GRID } from "./data"

const EquipmentGridScreen: FC = () => {
  return (
    <section
      id="production_equipment_grid"
      className="bg-transparent py-24 relative"
    >
      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText={EQUIPMENT_GRID.sectionHeader.bracketsText}
          heading={EQUIPMENT_GRID.sectionHeader.heading}
          description={EQUIPMENT_GRID.sectionHeader.description}
          desktopOrder={EQUIPMENT_GRID.sectionHeader.desktopOrder}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {EQUIPMENT_GRID.equipment.map((item, index) => {
            const colSpanClass =
              item.colSpan === 2
                ? "md:col-span-2 lg:col-span-2"
                : item.colSpan === 3
                  ? "md:col-span-3 lg:col-span-3"
                  : ""
            return (
            <div
              key={item.id}
              className={`relative overflow-hidden min-h-[300px] md:min-h-[400px] ${colSpanClass}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/60 to-black/85" />
              <div className="relative h-full p-8 flex flex-col justify-end z-10">
                <h3 className="text-2xl text-white font-light leading-tight mb-4">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-white/80 text-sm">{item.subtitle}</p>
                )}
              </div>
            </div>
            )
          })}
        </div>

        <LogoGrid partners={[]} />
      </CustomContainer>
    </section>
  )
}

export default EquipmentGridScreen
