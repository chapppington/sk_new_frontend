"use client"

import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { useIsMobile } from "@/shared/hooks/use-mobile"
import MainScene from "./main"

export default function ConditionalMainScene() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isSmallScreen = useIsMobile(1248)

  const memoizedScene = useMemo(() => <MainScene />, [])

  if (isHomePage && !isSmallScreen) {
    return memoizedScene
  }

  return null
}
