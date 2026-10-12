import type { Metadata } from "next"
import { redirect } from "next/navigation"
import CatalogPageView from "@/app/catalog/CatalogPageView"
import { BACKEND_MAIN } from "@/constants"
import catalogTextsService from "@/services/catalog-texts.service"
import seoService from "@/services/seo/seo.service"
import { PRODUCT_CATEGORIES } from "@/types/products.types"

type CatalogCategoryPageProps = {
  params: Promise<{ category: string }>
}

function isProductCategory(category: string) {
  return PRODUCT_CATEGORIES.some((item) => item.key === category)
}

export async function generateMetadata({
  params,
}: CatalogCategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const metadata = await seoService.getMetadata("/catalog", {
    next: { revalidate: 60 },
  })

  return {
    ...metadata,
    alternates: {
      canonical: `${BACKEND_MAIN}/catalog/${category}`,
    },
  }
}

export default async function CatalogCategoryPage({
  params,
}: CatalogCategoryPageProps) {
  const { category } = await params

  if (!isProductCategory(category)) {
    redirect("/catalog")
  }

  const catalogText = await catalogTextsService.getByCategory(category, {
    cache: "no-store",
  })

  return <CatalogPageView content={catalogText?.content ?? null} />
}
