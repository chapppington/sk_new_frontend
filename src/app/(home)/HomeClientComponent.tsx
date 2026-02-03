"use client"

import FirstScreen from "./screens/FirstScreen"
import MissionScreen from "./screens/MissionScreen"
import ScrollingTextSection from "./screens/ScrollingTextScreen"

export default function HomeClientComponent() {
  return (
    <div>
      <FirstScreen />
      <ScrollingTextSection />
      <MissionScreen />
    </div>
  )
}
