"use client"

import gsap from "gsap"
import { useLenis } from "lenis/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { type FC, useEffect, useState } from "react"
import CatalogTextView from "@/components/rich-text/CatalogTextView"
import CategoryButton from "@/components/ui/CategoryButton"
import { MiniLoader } from "@/components/ui/MiniLoader"
import NoResultsPlaceholder from "@/components/ui/NoResultsPlaceholder"
import Pagination from "@/components/ui/Pagination"
import SearchBar from "@/components/ui/SearchBar"
import { useProducts } from "@/hooks/useProducts"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { SearchIcon } from "@/shared/icons/SearchIcon"
import type { IProduct } from "@/types/products.types"
import { PRODUCT_CATEGORIES } from "@/types/products.types"
import ProductCard from "../ProductCard"

import type { ProductsTabProps } from "./types"

const CATEGORIES = [
  {
    name: "Вся продукция",
    slug: "all",
    apiValue: undefined as string | undefined,
  },
  ...PRODUCT_CATEGORIES.map((cat) => ({
    name: cat.label,
    slug: cat.key,
    apiValue: cat.label,
  })),
]

function categoryFromPath(pathname: string) {
  const slug = pathname.match(/^\/catalog\/([^/]+)/)?.[1]
  const found = CATEGORIES.find((cat) => cat.slug === slug)
  return found?.slug ?? "all"
}

function catalogPath(slug: string) {
  return slug === "all" ? "/catalog" : `/catalog/${slug}`
}

const ProductsTab: FC<ProductsTabProps> = ({
  productsGridRef,
  paginationRef,
  noResultsRef,
  content,
}) => {
  const lenis = useLenis()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const activeCategory = categoryFromPath(pathname)

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  )
  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const itemsPerPage = 6

  const selectedCategory = CATEGORIES.find((c) => c.slug === activeCategory)
  const { products, pagination, isLoading, error } = useProducts({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    category: selectedCategory?.apiValue,
    search: debouncedSearchQuery || undefined,
    is_shown: true,
    sort_field: "order",
    sort_order: 1,
  })

  const totalPages = pagination ? Math.ceil(pagination.total / itemsPerPage) : 1

  useEffect(() => {
    const legacyCategory = searchParams.get("category")
    const hasTab = searchParams.has("tab")
    if (!legacyCategory && !hasTab) return

    const params = new URLSearchParams(searchParams.toString())
    params.delete("tab")
    params.delete("category")

    const legacySlug = CATEGORIES.find((cat) => cat.slug === legacyCategory)?.slug
    const path =
      pathname === "/catalog" && legacySlug && legacySlug !== "all"
        ? catalogPath(legacySlug)
        : pathname

    const query = params.toString()
    router.replace(query ? `${path}?${query}` : path)
  }, [pathname, router, searchParams])

  useEffect(() => {
    if (searchParams.has("tab") || searchParams.has("category")) return

    const params = new URLSearchParams(window.location.search)
    params.delete("tab")
    params.delete("category")

    if (debouncedSearchQuery) {
      params.set("search", debouncedSearchQuery)
    } else {
      params.delete("search")
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString())
    } else {
      params.delete("page")
    }

    const query = params.toString()
    const nextUrl = query ? `${pathname}?${query}` : pathname
    const currentUrl = `${window.location.pathname}${window.location.search}`
    if (currentUrl !== nextUrl) {
      window.history.replaceState(null, "", nextUrl)
    }
  }, [debouncedSearchQuery, currentPage, pathname, searchParams])

  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, debouncedSearchQuery])

  useEffect(() => {
    if (productsGridRef.current && products.length > 0) {
      const items = productsGridRef.current.children
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => lenis?.resize(),
        },
      )
    }
  }, [products, activeCategory, currentPage, debouncedSearchQuery, lenis])

  useEffect(() => {
    if (paginationRef.current) {
      gsap.fromTo(
        paginationRef.current,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => lenis?.resize(),
        },
      )
    }
  }, [activeCategory, lenis])

  useEffect(() => {
    if (noResultsRef.current && products.length === 0 && !isLoading) {
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
  }, [products.length, isLoading, lenis])

  useEffect(() => {
    if (lenis && isDropdownOpen !== undefined) {
      setTimeout(() => lenis.resize(), 50)
    }
  }, [isDropdownOpen, lenis])

  return (
    <>
      <div className="hidden xl:flex xl:w-[400px] flex-col gap-2">
        {CATEGORIES.map((category) => (
          <CategoryButton
            key={category.slug}
            isActive={activeCategory === category.slug}
            onClick={() => {
              setIsDropdownOpen(false)
              setSearchQuery("")
              setCurrentPage(1)
              router.push(catalogPath(category.slug))
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>

      <div className="flex-1">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Поиск по каталогу"
          className="mb-6"
        />

        <div className="hidden xl:flex justify-start mb-6">
          {totalPages > 1 && products.length > 0 && (
            <div ref={paginationRef}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20 min-h-[40vh]">
            <MiniLoader isDark width={40} height={40} />
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[200px] text-red-500">
            Ошибка загрузки товаров
          </div>
        ) : products.length > 0 ? (
          <div
            ref={productsGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {products.map((product: IProduct) => (
              <ProductCard
                key={product.oid}
                id={product.oid}
                slug={product.slug}
                title={product.name}
                image={product.preview_image_url || "/transformer.webp"}
                alt={product.preview_image_alt || product.name}
              />
            ))}
          </div>
        ) : (
          <div ref={noResultsRef}>
            <NoResultsPlaceholder
              icon={<SearchIcon />}
              title="По вашему запросу продукция не найдена"
              description="Попробуйте изменить параметры поиска или категорию"
              onReset={() => {
                setSearchQuery("")
                setCurrentPage(1)
                router.push("/catalog")
              }}
            />
          </div>
        )}

        <CatalogTextView content={content} />
      </div>
    </>
  )
}

export default ProductsTab
