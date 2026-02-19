"use client"

import type { FC } from "react"
import TransitionLink from "@/components/ui/TransitionLink"

export type MenuItem = { label: string; href: string }

type NavbarDesktopMenuProps = {
  items: readonly MenuItem[]
}

const NavbarDesktopMenu: FC<NavbarDesktopMenuProps> = ({ items }) => (
  <div className="hidden 2xl:flex items-center space-x-8 px-12 h-full">
    {items.map((item) => (
      <TransitionLink
        key={item.href}
        href={item.href}
        className="text-white text-sm hover:text-white/80 transition-colors relative select-none group cursor-pointer"
      >
        {item.label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
      </TransitionLink>
    ))}
  </div>
)

export default NavbarDesktopMenu
