import type { Metadata } from "next"
import productsService from "@/services/products.service"
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

  return <ProductDetails slug={slug} />
}

export default ProductPage
