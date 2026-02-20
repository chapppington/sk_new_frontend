"use client"

import type { FC } from "react"
import ContactInfo from "./ContactInfo"

const NavbarDesktopActions: FC = () => (
  <div className="hidden 2xl:flex items-center h-full">
    <div className="h-full w-px bg-white/30" />
    <ContactInfo />
    <div className="h-full w-px bg-white/30" />
    <button
      type="button"
      className="h-full px-8 bg-white text-gray-900 text-sm font-medium hover:bg-gray-50 transition-all duration-300 select-none relative overflow-hidden group cursor-pointer"
    >
      <span className="relative z-10">Оставить заявку</span>
      <span className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
    </button>
  </div>
)

export default NavbarDesktopActions
