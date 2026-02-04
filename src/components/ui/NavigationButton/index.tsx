import React from "react"
import { ChevronIcon } from "@/shared/icons/ChevronIcon"
import type { NavigationButtonProps } from "./types"
import styles from "./styles.module.css"

export const NavigationButton = React.forwardRef<
  HTMLButtonElement,
  NavigationButtonProps
>(({ direction, sliderId, onClick, className = "" }, ref) => {
  const ariaLabel =
    direction === "prev" ? "Предыдущий слайд" : "Следующий слайд"

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      onClick={onClick}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <button
        ref={ref}
        type="button"
        tabIndex={-1}

        className={`${styles.button} w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:border-white/60 transition-all duration-100 hover:scale-[0.97] active:scale-[0.85] slider-${direction}-${sliderId}`}
      >
        <ChevronIcon direction={direction} />
      </button>
    </div>
  )
})

NavigationButton.displayName = "NavigationButton"
