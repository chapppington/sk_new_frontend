"use client"

import { useEffect } from "react"
import ContactUsScreen from "@/components/contact/ContactUsScreen"
import { SectionObserver } from "@/components/3DScene/features/SectionObserver"
import { useCameraContext } from "@/components/3DScene/features/CameraContext"
import CustomerReviewsScreen from "./screens/CustomerReviewsScreen"
import FirstScreen from "./screens/FirstScreen"
import MissionScreen from "./screens/MissionScreen"
import PortfolioScreen from "./screens/PortfolioScreen"
import ProductsScreen from "./screens/ProductsScreen"
import ScrollingTextScreen from "./screens/ScrollingTextScreen"

export default function HomeClientComponent() {
  const { setTotalSections } = useCameraContext()

  useEffect(() => {
    setTotalSections(7)
  }, [setTotalSections])

  return (
    <main>
      <SectionObserver index={0}>
        <FirstScreen />
      </SectionObserver>
      <SectionObserver index={1}>
        <ScrollingTextScreen />
      </SectionObserver>
      <SectionObserver index={2}>
        <MissionScreen />
      </SectionObserver>
      <SectionObserver index={3}>
        <ProductsScreen />
      </SectionObserver>
      <SectionObserver index={4}>
        <PortfolioScreen />
      </SectionObserver>
      <SectionObserver index={5}>
        <CustomerReviewsScreen />
      </SectionObserver>
      <SectionObserver index={6}>
        <ContactUsScreen />
      </SectionObserver>
    </main>
  )
}
