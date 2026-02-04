"use client"

import FirstScreen from "./screens/FirstScreen"
import MissionScreen from "./screens/MissionScreen"
import PortfolioScreen from "./screens/PortfolioScreen"
import ProductsScreen from "./screens/ProductsScreen"
import ScrollingTextSection from "./screens/ScrollingTextScreen"

export default function HomeClientComponent() {
  return (
    <>
      <FirstScreen />
      <ScrollingTextSection />
      <MissionScreen />
      <ProductsScreen />
      <PortfolioScreen />
    </>
  )
}
