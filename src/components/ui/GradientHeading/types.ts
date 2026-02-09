import type { ReactNode } from "react"

export interface IGradientHeadingProps {
  children: ReactNode
  className?: string
  ref?: React.Ref<HTMLHeadingElement>
  level?: 1 | 2 | 3 | 4 | 5 | 6
  style?: React.CSSProperties
}
