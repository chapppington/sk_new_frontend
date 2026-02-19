"use client"

import gsap from "gsap"
import { type FC, useEffect, useRef, useState } from "react"
import CustomContainer from "@/components/ui/CustomContainer"
import NavbarDesktopActions from "./components/NavbarDesktopActions"
import NavbarDesktopMenu from "./components/NavbarDesktopMenu"
import NavbarLogo from "./components/NavbarLogo"
import NavbarMobileMenu from "./components/NavbarMobileMenu"
import NavbarMobileMenuButton from "./components/NavbarMobileMenuButton"
import { menuItems } from "./constants"

const Navbar: FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuItemsRef = useRef<HTMLDivElement[]>([])
  const contactSectionsRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (menuRef.current) {
      gsap.set(menuRef.current, { x: "100%" })
    }
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(menuRef.current, {
        x: 0,
        backgroundColor: "rgba(0, 0, 0, 1)",
        duration: 0.4,
        ease: "power2.out",
      })
      gsap.to(menuItemsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.2,
      })
      gsap.to(contactSectionsRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
        delay: 0.3,
      })
      gsap.fromTo(
        closeButtonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          delay: 0.4,
        },
      )
    })

    return () => ctx.revert()
  }, [isMobileMenuOpen])

  const handleCloseMenu = () => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      gsap.to(closeButtonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      })
      gsap.to(menuRef.current, {
        x: "100%",
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setIsMobileMenuOpen(false),
      })
    })

    return () => ctx.revert()
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/30 pointer-events-none font-medium"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <CustomContainer className="flex justify-between items-center h-[72px] pointer-events-auto relative">
        <NavbarLogo />

        <div className="hidden 2xl:block h-full w-px bg-white/30" />

        <NavbarDesktopMenu items={menuItems} />

        <NavbarDesktopActions />

        <NavbarMobileMenuButton
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        />
      </CustomContainer>

      {isMobileMenuOpen && (
        <NavbarMobileMenu
          overlayRef={overlayRef}
          menuRef={menuRef}
          menuItemsRef={menuItemsRef}
          contactSectionsRef={contactSectionsRef}
          closeButtonRef={closeButtonRef}
          items={menuItems}
          onClose={handleCloseMenu}
        />
      )}
    </nav>
  )
}

export default Navbar
