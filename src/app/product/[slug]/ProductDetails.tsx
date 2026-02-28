"use client"

import dynamic from "next/dynamic"
import { useProduct } from "@/hooks/useProducts"
import FirstScreen from "@/app/product/[slug]/screens/FirstScreen"

const InfoScreen = dynamic(
  () => import("@/app/product/[slug]/screens/InfoScreen"),
)
const LogoGrid = dynamic(
  () => import("@/app/product/[slug]/screens/LogoGridScreen"),
)
const NumbersScreen = dynamic(
  () => import("@/app/product/[slug]/screens/NumbersScreen"),
)
const SliderScreen = dynamic(
  () => import("@/app/product/[slug]/screens/SliderScreen"),
)
const TabsScreen = dynamic(
  () => import("@/app/product/[slug]/screens/TabsScreen"),
)
const QuestionnaireButtonsScreen = dynamic(
  () => import("@/app/product/[slug]/screens/QuestionnaireButtonsScreen"),
)
const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

interface Props {
  slug: string
}

const ProductDetails = ({ slug }: Props) => {
  const { product, isLoading } = useProduct(slug)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <main>
      <FirstScreen product={product} />
      {/* <InfoScreen product={product} /> */}
      <TabsScreen product={product} />
      <QuestionnaireButtonsScreen product={product} />
      {(product.portfolio_items ?? []).length > 0 && (
        <SliderScreen product={product} />
      )}
      <NumbersScreen product={product} />
      {/* <LogoGrid product={product} /> */}
      <ContactUsScreen />
    </main>
  )
}

export default ProductDetails
