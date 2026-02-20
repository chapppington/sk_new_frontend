"use client"

import type { FC } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useLenis } from "lenis/react"
import { useSearchParams, usePathname } from "next/navigation"
import gsap from "gsap"

import { useNews } from "@/hooks/useNews"
import type { INews } from "@/types/news.types"
import { NEWS_CATEGORIES } from "@/types/news.types"
import CustomContainer from "@/components/ui/CustomContainer"
import CategoryButton from "@/components/ui/CategoryButton"
import SelectDropdown from "@/components/ui/SelectDropdown"
import NewsGridItem from "./components/NewsGridItem"
import Pagination from "@/components/ui/Pagination"
import { MiniLoader } from "@/components/ui/MiniLoader"
import NoResultsPlaceholder from "@/components/ui/NoResultsPlaceholder"
import { FilterIcon } from "@/shared/icons/FilterIcon"
import { SortIcon } from "@/shared/icons/SortIcon"
import { SearchIcon } from "@/shared/icons/SearchIcon"

const CATEGORY_SLUGS: Record<string, string> = {
  Производство: "production",
  Разработки: "developments",
  Полезное: "useful",
  События: "events",
  "Наши проекты": "projects",
}

const CATEGORIES = [
  { name: "Все", slug: "all", apiValue: undefined },
  ...NEWS_CATEGORIES.map((name) => ({
    name,
    slug: CATEGORY_SLUGS[name] || name.toLowerCase().replace(/\s+/g, "-"),
    apiValue: name,
  })),
]

type SortOption = "new" | "old"

const SORT_OPTIONS = [
  { value: "new" as const, label: "Дате публикации (новые)" },
  { value: "old" as const, label: "Дате публикации (старые)" },
]

const ITEMS_PER_PAGE = 6

function buildQueryString(
  searchParams: URLSearchParams,
  updates: { category?: string; sort?: string; page?: string },
) {
  const params = new URLSearchParams(searchParams.toString())
  Object.entries(updates).forEach(([key, value]) => {
    if (value) params.set(key, value)
  })
  return params.toString()
}

const NewsGrid: FC = () => {
  const lenis = useLenis()
  const [initialRender, setInitialRender] = useState(true)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const newsGridRef = useRef<HTMLDivElement>(null)
  const noResultsRef = useRef<HTMLDivElement>(null)

  const categorySlug = searchParams.get("category") || "all"
  const sortBy = (searchParams.get("sort") as SortOption) || "new"
  const page = Math.max(1, Number(searchParams.get("page")) || 1)

  const selectedCategory = CATEGORIES.find((c) => c.slug === categorySlug)

  const { news, pagination, isLoading, error } = useNews({
    limit: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
    category: selectedCategory?.apiValue,
    sort_field: "date",
    sort_order: sortBy === "new" ? -1 : 1,
  })

  const totalPages = pagination
    ? Math.ceil(pagination.total / ITEMS_PER_PAGE)
    : 0

  const updateUrl = useCallback(
    (updates: { category?: string; sort?: string; page?: string }) => {
      const query = buildQueryString(searchParams, updates)
      window.history.pushState({}, "", `${pathname}?${query}`)
    },
    [pathname, searchParams],
  )

  useEffect(() => {
    setInitialRender(false)
  }, [])

  useEffect(() => {
    if (!newsGridRef.current || news.length === 0) return
    const items = Array.from(newsGridRef.current.children)
    // First elements get larger y offset for more noticeable slide
    items.forEach((el, i) => {
      const yOffset = Math.max(20, 48 - i * 6)
      gsap.set(el, { opacity: 0, y: yOffset })
    })

    if (initialRender) {
      gsap.set(items, { opacity: 1, y: 0 })
      lenis?.resize()
      return
    }

    requestAnimationFrame(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.out",
        onComplete: () => lenis?.resize(),
      })
    })
  }, [categorySlug, sortBy, page, news.length, lenis, initialRender])

  useEffect(() => {
    if (noResultsRef.current && news.length === 0 && !isLoading) {
      gsap.fromTo(
        noResultsRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => lenis?.resize(),
        },
      )
    }
  }, [news.length, isLoading, lenis])

  if (error) {
    return (
      <section className="py-20 min-h-[60vh] flex items-center justify-center bg-black">
        <div className="text-white text-xl">Ошибка загрузки новостей</div>
      </section>
    )
  }

  return (
    <section className="py-20 relative">
      <div
        className="absolute inset-x-0 top-0 h-[512px] bg-linear-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />
      <CustomContainer className="container mx-auto px-4">
        {/* Filters - always visible */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-12 gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-white/60 text-sm flex items-center gap-2">
              <FilterIcon />
              Фильтр по новостям:
            </span>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {CATEGORIES.map((cat) => (
                <CategoryButton
                  key={cat.slug}
                  onClick={() => updateUrl({ category: cat.slug, page: "1" })}
                  isActive={categorySlug === cat.slug}
                >
                  {cat.name}
                </CategoryButton>
              ))}
            </div>
          </div>
          <SelectDropdown
            options={SORT_OPTIONS}
            value={sortBy}
            onChange={(v) => updateUrl({ sort: v, page: "1" })}
            label="Сортировать по:"
            icon={<SortIcon />}
          />
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && news.length > 0 && (
          <div className="flex justify-start mb-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => updateUrl({ page: String(p) })}
            />
          </div>
        )}

        {/* Grid area */}
        <div className="relative min-h-[40vh]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <MiniLoader isDark width={40} height={40} />
            </div>
          ) : news.length > 0 ? (
            <div
              ref={newsGridRef}
              key={`news-grid-${categorySlug}-${sortBy}-${page}${initialRender ? "-initial" : ""}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {news.map((item: INews) => (
                <NewsGridItem key={item.oid} news={item} />
              ))}
            </div>
          ) : (
            <div ref={noResultsRef}>
              <NoResultsPlaceholder
                icon={<SearchIcon />}
                title="По вашему запросу новости не найдены"
                description="Попробуйте изменить параметры фильтрации или сортировки"
                onReset={() => updateUrl({ category: "all" })}
              />
            </div>
          )}
        </div>
      </CustomContainer>
    </section>
  )
}

export default NewsGrid
