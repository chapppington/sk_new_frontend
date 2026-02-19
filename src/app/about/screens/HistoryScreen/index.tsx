"use client"

import CustomContainer from "@/components/ui/CustomContainer"
import SectionHeader from "@/components/ui/SectionHeader"
import CustomSlider from "@/components/CustomSlider"
import HistorySlide from "./HistorySlide"
import { historyEvents } from "./mock_data"

export default function HistoryScreen() {
  const sortedEvents = [...historyEvents].sort((a, b) => a.id - b.id)

  return (
    <section id="history_section" className="bg-transparent py-24 relative">
      <div
        className="absolute inset-x-0 top-0 h-[500px] bg-linear-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />
      <CustomContainer className="h-full flex flex-col relative z-10">
        <SectionHeader
          bracketsText="ИСТОРИЯ"
          heading="История компании"
          description="С 2006 года мы прошли путь от стартапа до предприятия полного цикла: собрали сильную команду, развернули масштабное производство и внедрили передовые технологии."
          desktopOrder={{
            bracketsText: 1,
            heading: 2,
            description: 3,
          }}
        />
        <CustomSlider
          autoplay={false}
          spaceBetween={24}
          loop={false}
          showIndicators={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {sortedEvents.map((event, index) => (
            <HistorySlide key={event.id} event={event} index={index} />
          ))}
        </CustomSlider>
      </CustomContainer>
    </section>
  )
}
