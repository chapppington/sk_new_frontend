"use client"

import { type FC, useEffect, useRef, useState } from "react"
import TransitionLink from "@/components/ui/TransitionLink"

export type MenuItem = { label: string; href: string }

type NavbarDesktopMenuProps = {
  items: readonly MenuItem[]
  moreItems?: readonly MenuItem[]
  aboutDropdownItems?: readonly MenuItem[]
}

const NavbarDesktopMenu: FC<NavbarDesktopMenuProps> = ({
  items,
  moreItems = [],
  aboutDropdownItems = [],
}) => {
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isAboutHover, setIsAboutHover] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false)
      }
    }
    if (isMoreOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMoreOpen])

  const DropdownPanel = ({
    children,
    className,
    gap = "mt-2",
  }: {
    children: React.ReactNode
    className?: string
    gap?: string
  }) => (
    <div
      className={`absolute left-0 top-full py-2 min-w-[220px] bg-gray-900/98 border border-white/20 rounded-lg shadow-xl z-50 ${gap} ${className ?? ""}`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      {children}
    </div>
  )

  const linkClassName =
    "text-white text-sm hover:text-white/80 transition-colors relative select-none group cursor-pointer"
  const underline =
    "absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"

  return (
    <div className="hidden 2xl:flex items-center gap-8 px-6 h-full">
      {items.map((item) =>
        item.label === "О компании" && aboutDropdownItems.length > 0 ? (
          <div
            key={item.href}
            className="relative flex items-center h-full"
            onMouseEnter={() => setIsAboutHover(true)}
            onMouseLeave={() => setIsAboutHover(false)}
          >
            <TransitionLink href={item.href} className={linkClassName}>
              {item.label}
              <span className={underline} />
            </TransitionLink>
            {isAboutHover && (
              <>
                <div
                  className="absolute left-0 right-0 top-full h-2"
                  aria-hidden
                />
                <DropdownPanel gap="-mt-5">
                  {aboutDropdownItems.map((subItem) => (
                    <TransitionLink
                      key={subItem.href}
                      href={subItem.href}
                      className="block px-4 py-2.5 text-white text-sm hover:bg-white/10 transition-colors text-left"
                    >
                      {subItem.label}
                    </TransitionLink>
                  ))}
                </DropdownPanel>
              </>
            )}
          </div>
        ) : (
          <div key={item.href} className="flex items-center h-full">
            <TransitionLink href={item.href} className={linkClassName}>
              {item.label}
              <span className={underline} />
            </TransitionLink>
          </div>
        ),
      )}
      {moreItems.length > 0 && (
        <div ref={moreRef} className="relative flex items-center">
          <button
            type="button"
            onClick={() => setIsMoreOpen((prev) => !prev)}
            className={`flex flex-col justify-center items-center w-9 h-9 transition-colors group cursor-pointer ${
              isMoreOpen ? "bg-white/10" : "hover:bg-white/5"
            }`}
            aria-expanded={isMoreOpen}
            aria-haspopup="true"
          >
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMoreOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 my-1 ${
                isMoreOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMoreOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>

          {isMoreOpen && (
            <DropdownPanel>
              {moreItems.map((item) => (
                <TransitionLink
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMoreOpen(false)}
                  className="block px-4 py-2.5 text-white text-sm hover:bg-white/10 transition-colors text-left"
                >
                  {item.label}
                </TransitionLink>
              ))}
            </DropdownPanel>
          )}
        </div>
      )}
    </div>
  )
}

export default NavbarDesktopMenu
