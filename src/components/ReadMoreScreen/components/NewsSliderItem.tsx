"use client"

import type { FC } from "react"
import Image from "next/image"
import TransitionLink from "@/components/ui/TransitionLink"
import CircleWithArrowIcon from "@/shared/icons/CircleWithArrowIcon"
import { NEWS_CATEGORIES } from "@/types/news.types"
import type { INews } from "@/types/news.types"

interface NewsSliderItemProps {
  news: INews
}

function getCategoryLabel(category: string): string {
  const found = NEWS_CATEGORIES.find((c) => c.key === category)
  return found?.label ?? category
}

const NewsSliderItem: FC<NewsSliderItemProps> = ({ news }) => {
  const imageSrc = news.image_url || "/news_bg.webp"
  const dateStr = news.date
    ? new Date(news.date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""
  const description =
    news.short_content || news.content.substring(0, 150) + "..."

  return (
    <TransitionLink href={`/news/${news.slug}`} className="block">
      <article className="group relative overflow-hidden">
        <div className="relative aspect-3/4 overflow-hidden rounded-lg transition-all duration-300 ease-in-out">
          <Image
            src={imageSrc}
            alt={news.alt || news.title}
            fill
            className="object-cover md:transition-transform md:duration-500 md:ease-in-out md:group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/45 to-black/90" />
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 xl:group-hover:opacity-100 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          <div className="absolute inset-0 p-6 flex flex-col z-10">
            <div>
              <span className="inline-block px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded font-light">
                {getCategoryLabel(news.category)}
              </span>
            </div>

            <div className="mt-auto xl:transition-transform xl:duration-300 xl:ease-in-out xl:group-hover:-translate-y-32">
              <div className="flex items-center gap-3 text-white/80 text-sm mb-3">
                <span>{dateStr}</span>
                <span>•</span>
                <span>{news.reading_time} мин</span>
              </div>
              <h3 className="text-2xl text-white font-light leading-tight">
                {news.title.length > 75
                  ? `${news.title.slice(0, 75)}...`
                  : news.title}
              </h3>
            </div>

            <div className="absolute bottom-6 left-6 right-6 hidden xl:block transform translate-y-16 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-white/80 text-sm mb-6">
                {description.length > 70
                  ? `${description.slice(0, 70)}...`
                  : description}
              </p>
              <span className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <CircleWithArrowIcon />
                </div>
                <span className="text-lg pl-4">Читать</span>
              </span>
            </div>

            <div className="mt-6 block xl:hidden">
              <span className="inline-flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 transition-colors">
                  <CircleWithArrowIcon />
                </div>
                <span className="text-lg pl-4">Читать</span>
              </span>
            </div>
          </div>
        </div>
      </article>
    </TransitionLink>
  )
}

export default NewsSliderItem
