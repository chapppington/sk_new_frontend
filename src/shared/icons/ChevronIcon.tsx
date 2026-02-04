import type { FC } from "react"

interface ChevronIconProps {
  direction: "next" | "prev"
  className?: string
}

export const ChevronIcon: FC<ChevronIconProps> = ({
  direction,
  className = "w-5 h-5",
}) => {
  return (
    <svg
      className={`pointer-events-none ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      role="img"
    >
      <title>{direction === "next" ? "Вперёд" : "Назад"}</title>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d={direction === "next" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
      />
    </svg>
  )
}
