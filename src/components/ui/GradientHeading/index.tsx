"use client"

import React, { type FC } from "react"

import type { IGradientHeadingProps } from "@/components/ui/GradientHeading/types"
import styles from "./styles.module.css"

const GradientHeading: FC<IGradientHeadingProps> = ({
  children,
  className,
  level = 2,
  style,
  ref,
}) => {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements
  return React.createElement(
    HeadingTag,
    { ref, className: "max-w-5xl", style: { overflow: "hidden", ...style } },
    <span
      className={`
        ${styles.gradientHeading}
        ${styles.fluidHeading}
        ${className || ""}
      `}
    >
      {children}
    </span>,
  )
}

export default GradientHeading
