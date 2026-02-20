import type { FC } from "react"
import Image from "next/image"
import TransitionLink from "@/components/ui/TransitionLink"
import CircleIconButton from "@/components/ui/CircleIconButton"
import type { INews } from "@/types/news.types"

interface NewsGridItemProps {
  news: INews
}

const NewsGridItem: FC<NewsGridItemProps> = ({ news }) => {
  const imageSrc = news.image_url || "/news_bg.webp"
  const dateStr = news.date
    ? new Date(news.date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : new Date(news.created_at).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
  const description =
    news.short_content || news.content.substring(0, 150) + "..."

  return (
    <article
      className="group relative overflow-hidden rounded-lg p-1 transition-all duration-300"
      style={{ opacity: 0 }}
    >
      <TransitionLink
        href={`/news/${news.slug}`}
        className="block"
        aria-label={`Читать новость: ${news.title}`}
      >
        <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg aspect-[4/3]">
          <Image
            src={imageSrc}
            alt={news.alt || news.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-white/60 text-sm md:text-base">
            <span>{dateStr}</span>
            <span>•</span>
            <span>{news.reading_time} мин</span>
          </div>
          <h3 className="text-xl font-medium text-white line-clamp-2 transition-colors duration-300 group-hover:text-white/80">
            {news.title}
          </h3>
          <p className="text-white/60 transition-colors duration-300 group-hover:text-white/80">
            {description}
          </p>
        </div>
      </TransitionLink>
      <CircleIconButton
        href={`/news/${news.slug}`}
        text="Читать"
        className="mt-6"
      />
    </article>
  )
}

export default NewsGridItem
