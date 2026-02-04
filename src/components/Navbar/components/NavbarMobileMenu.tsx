"use client"

import Image from "next/image"
import type { RefObject } from "react"
import CustomContainer from "@/components/CustomContainer"
import type { MenuItem } from "./NavbarDesktopMenu"

type NavbarMobileMenuProps = {
  overlayRef: RefObject<HTMLDivElement | null>
  menuRef: RefObject<HTMLDivElement | null>
  menuItemsRef: RefObject<HTMLDivElement[]>
  contactSectionsRef: RefObject<HTMLDivElement | null>
  closeButtonRef: RefObject<HTMLButtonElement | null>
  items: readonly MenuItem[]
  onClose: () => void
  onAnchorClick: (e: React.MouseEvent, href: string) => void
}

const NavbarMobileMenu = ({
  overlayRef,
  menuRef,
  menuItemsRef,
  contactSectionsRef,
  closeButtonRef,
  items,
  onClose,
  onAnchorClick,
}: NavbarMobileMenuProps) => (
  <div className="2xl:hidden fixed inset-0 z-1000 pointer-events-auto">
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 opacity-0 pointer-events-auto"
      onClick={onClose}
      role="presentation"
    />
    <div
      ref={menuRef}
      className="fixed top-0 right-0 w-full md:w-[400px] h-screen bg-transparent overflow-y-auto pointer-events-auto"
    >
      <div className="sticky top-0 left-0 right-0 h-[72px] bg-black z-1001 border-b border-white/20">
        <CustomContainer className="h-full flex justify-between items-center">
          <Image
            src="/logo.svg"
            alt="СИБКОМПЛЕКТ"
            width={175}
            height={35}
            className="h-25"
            priority
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center opacity-0"
            aria-label="Закрыть меню"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </CustomContainer>
      </div>

      <div className="bg-black min-h-full">
        <CustomContainer className="pt-6 pb-6">
          <div className="flex flex-col">
            {items.map((item, index) => (
              <div
                key={item.href}
                ref={(el) => {
                  if (el) menuItemsRef.current[index] = el
                }}
                className="border-b border-white/30 opacity-0 translate-x-[50px]"
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.stopPropagation()
                    onAnchorClick(e, item.href)
                  }}
                  className="text-white/80 text-lg leading-none flex items-center justify-between py-6 font-light"
                >
                  {item.label}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white/80"
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ))}

            <div
              ref={contactSectionsRef}
              className="mt-12 space-y-8 opacity-0 translate-x-[50px]"
            >
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 bg-white text-gray-900 text-sm hover:bg-gray-50 transition-colors w-fit"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </CustomContainer>
      </div>
    </div>
  </div>
)

export default NavbarMobileMenu
