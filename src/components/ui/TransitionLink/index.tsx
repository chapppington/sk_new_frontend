"use client"

import Link from "next/link"
import { useTransitionRouter } from "next-view-transitions"
import type { FC } from "react"
import type { ITransitionLinkProps } from "@/components/ui/TransitionLink/types"
import { usePageTransition } from "@/context/PageTransitionProvider"

const TransitionLink: FC<ITransitionLinkProps> = ({
  href,
  children,
  className,
  onClick,
  style,
  ref,
  "aria-label": ariaLabel,
}) => {
  const router = useTransitionRouter()
  const { animateIn, animateOut, isAnimating } = usePageTransition()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isAnimating) return

    // Skip animations for anchor links
    if (href.startsWith("#")) {
      const targetElement = document.querySelector(href)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
      return
    }

    // Call the provided onClick handler if it exists
    if (onClick) {
      onClick(e)
    }

    // Start the slide-in animation
    await animateIn()

    const hasQueryOrHash = href.includes("?") || href.includes("#")

    // Start the page transition
    const transitionPromise = router.push(href)

    // Wait for both the page transition and slide-out animation
    await Promise.all([
      transitionPromise,
      // Add a small delay before starting slide-out to ensure page is ready
      new Promise((resolve) => setTimeout(resolve, 100)).then(() =>
        animateOut(),
      ),
    ])

    // Restore query and hash if router dropped them (Next.js App Router can strip hash)
    if (hasQueryOrHash && typeof window !== "undefined") {
      try {
        const url = new URL(href, window.location.origin)
        const fullUrl = url.pathname + url.search + url.hash
        const currentFull =
          window.location.pathname +
          window.location.search +
          window.location.hash
        if (currentFull !== fullUrl) {
          window.history.replaceState(null, "", fullUrl)
        }
        if (url.hash) {
          const el = document.querySelector(url.hash)
          el?.scrollIntoView({ behavior: "smooth" })
        }
      } catch {
        // ignore URL parse errors
      }
    }

    // Dispatch the layout change event after transition completes
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("layoutchange"))
    }, 200)
  }

  return (
    <Link
      ref={ref}
      href={href}
      className={`${className} ${
        isAnimating ? "pointer-events-none cursor-default" : ""
      }`}
      onClick={handleClick}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}

export default TransitionLink
