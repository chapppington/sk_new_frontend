"use client"

import type { FC } from "react"
import CustomContainer from "@/components/ui/CustomContainer"
import SectionHeader from "@/components/ui/SectionHeader"
import CustomSlider from "@/components/CustomSlider"
import NewsSliderItem from "./components/NewsSliderItem"
import { useNews } from "@/hooks/useNews"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { READ_MORE } from "./data"

const NEWS_LIMIT = 8

const ReadMoreScreen: FC = () => {
  const { news, isLoading, error } = useNews({
    limit: NEWS_LIMIT,
    sort_field: "date",
    sort_order: -1,
  })

  if (error) {
    return (
      <section className="py-20">
        <CustomContainer>
          <SectionHeader
            bracketsText={READ_MORE.bracketsText}
            heading={READ_MORE.heading}
            description={READ_MORE.description}
            desktopOrder={READ_MORE.desktopOrder}
          />
          <div className="flex justify-center items-center h-40 text-red-500">
            Ошибка загрузки новостей
          </div>
        </CustomContainer>
      </section>
    )
  }

  return (
    <section className="py-20">
      <CustomContainer>
        <SectionHeader
          bracketsText={READ_MORE.bracketsText}
          heading={READ_MORE.heading}
          description={READ_MORE.description}
          desktopOrder={READ_MORE.desktopOrder}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <MiniLoader />
          </div>
        ) : news.length === 0 ? null : (
          <CustomSlider
            autoplay={false}
            spaceBetween={24}
            breakpoints={{
              300: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1400: { slidesPerView: 4 },
            }}
          >
            {news.map((item) => (
              <NewsSliderItem key={item.oid} news={item} />
            ))}
          </CustomSlider>
        )}
      </CustomContainer>
    </section>
  )
}

export default ReadMoreScreen
