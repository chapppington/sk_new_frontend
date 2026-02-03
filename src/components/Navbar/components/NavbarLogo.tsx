"use client"

import Image from "next/image"
import type { FC } from "react"
import TransitionLink from "@/components/ui/TransitionLink"

const NavbarLogo: FC = () => (
  <TransitionLink
    href="/"
    className="pl-4 pr-2 flex items-center select-none cursor-pointer"
  >
    <Image
      src="/logo.svg"
      alt="СИБКОМПЛЕКТ"
      width={175}
      height={35}
      className="h-25"
      priority
    />
  </TransitionLink>
)

export default NavbarLogo
