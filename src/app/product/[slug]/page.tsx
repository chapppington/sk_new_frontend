import type { Metadata } from "next"
import BreadcrumbSchemaScript from "@/components/ui/Breadcrumbs/BreadcrumbSchemaScript"
import productsService from "@/services/products.service"
import { buildProductBreadcrumbs } from "@/utils/breadcrumbSchema"
import ProductDetails from "./ProductDetails"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return productsService.getMetadata((await params).slug)
}

interface ProductPageProps {
  params: Promise<{
    slug: string
  }>
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params
  const { data: product } = await productsService.getBySlug(slug).catch(() => ({
    data: null,
  }))

  return (
    <>
      {product && (
        <BreadcrumbSchemaScript
          items={buildProductBreadcrumbs(slug, product.name)}
        />
      )}
      <ProductDetails slug={slug} />
    </>
  )
}

export default ProductPage
