"use client"

import { usePathname } from "next/navigation"
import type { FC } from "react"
import BackgroundGradient from "@/components/ui/BackgroundGradient"
import { useIsMobile } from "@/shared/hooks/use-mobile"

const ConditionalBackgroundGradient: FC = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isSmallScreen = useIsMobile(1248)

  const shouldShowGradient = !isHomePage || isSmallScreen

  if (!shouldShowGradient) return null

  return <BackgroundGradient />
}

export default ConditionalBackgroundGradient
