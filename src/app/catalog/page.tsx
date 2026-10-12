import type { Metadata } from "next"
import { redirect } from "next/navigation"
import CatalogPageView from "@/app/catalog/CatalogPageView"
import seoService from "@/services/seo/seo.service"
import { PRODUCT_CATEGORIES } from "@/types/products.types"

type CatalogPageProps = {
  searchParams: Promise<{
    category?: string
    tab?: string
    search?: string
    page?: string
  }>
}

function isProductCategory(category: string) {
  return PRODUCT_CATEGORIES.some((item) => item.key === category)
}

export async function generateMetadata(): Promise<Metadata> {
  return seoService.getMetadata("/catalog", { next: { revalidate: 60 } })
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams
  const nextParams = new URLSearchParams()

  if (params.search) nextParams.set("search", params.search)
  if (params.page) nextParams.set("page", params.page)

  const query = nextParams.toString()

  if (params.category && isProductCategory(params.category)) {
    redirect(
      query
        ? `/catalog/${params.category}?${query}`
        : `/catalog/${params.category}`,
    )
  }

  if (params.tab || params.category) {
    redirect(query ? `/catalog?${query}` : "/catalog")
  }

  return <CatalogPageView />
}
