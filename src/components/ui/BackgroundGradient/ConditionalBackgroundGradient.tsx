"use client"

import { usePathname } from "next/navigation"
import type { FC } from "react"
import BackgroundGradient from "@/components/ui/BackgroundGradient"
import useIsAppleDevice from "@/shared/hooks/use-is-apple-device"
import { useIsMobile } from "@/shared/hooks/use-mobile"

const ConditionalBackgroundGradient: FC = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const isAppleDevice = useIsAppleDevice()
  const isSmallScreen = useIsMobile()

  // Show BackgroundGradient on non-home pages, or on home page for Apple devices/small screens
  const shouldShowGradient = !isHomePage || isAppleDevice || isSmallScreen

  if (!shouldShowGradient) return null

  return <BackgroundGradient />
}

export default ConditionalBackgroundGradient
