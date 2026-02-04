"use client"

import FirstScreen from "./screens/FirstScreen"
import MissionScreen from "./screens/MissionScreen"
import ProductsScreen from "./screens/ProductsScreen"
import ScrollingTextSection from "./screens/ScrollingTextScreen"

export default function HomeClientComponent() {
  return (
    <>
      <FirstScreen />
      <ScrollingTextSection />
      <MissionScreen />
      <ProductsScreen />
    </>
  )
}
