"use client"

import CustomerReviewsScreen from "./screens/CustomerReviewsScreen"
import FirstScreen from "./screens/FirstScreen"
import MissionScreen from "./screens/MissionScreen"
import PortfolioScreen from "./screens/PortfolioScreen"
import ProductsScreen from "./screens/ProductsScreen"
import ScrollingTextScreen from "./screens/ScrollingTextScreen"

export default function HomeClientComponent() {
  return (
    <>
      <FirstScreen />
      <ScrollingTextScreen />
      <MissionScreen />
      <ProductsScreen />
      <PortfolioScreen />
      <CustomerReviewsScreen />
    </>
  )
}
