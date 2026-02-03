"use client"

import type { FC } from "react"

type NavbarMobileMenuButtonProps = {
  isOpen: boolean
  onClick: () => void
}

const NavbarMobileMenuButton: FC<NavbarMobileMenuButtonProps> = ({
  isOpen,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="2xl:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 pointer-events-auto"
  >
    <span
      className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "rotate-45 translate-y-2" : ""
      }`}
    />
    <span
      className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "opacity-0" : ""
      }`}
    />
    <span
      className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
        isOpen ? "-rotate-45 -translate-y-2" : ""
      }`}
    />
  </button>
)

export default NavbarMobileMenuButton
