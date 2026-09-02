"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import type { FC } from "react"
import TransitionLink from "@/components/ui/TransitionLink"

const logoImage = (
  <Image
    src="/logo.svg"
    alt="СИБКОМПЛЕКТ"
    width={175}
    height={35}
    className="h-25"
    priority
  />
)

const NavbarLogo: FC = () => {
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  if (isHomePage) {
    return <div className="pr-2 flex items-center select-none">{logoImage}</div>
  }

  return (
    <TransitionLink
      href="/"
      className="pr-2 flex items-center select-none cursor-pointer"
    >
      {logoImage}
    </TransitionLink>
  )
}

export default NavbarLogo
