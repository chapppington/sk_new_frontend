import React, { type FC, type ReactNode } from "react"

interface NoIndexProps {
  children: ReactNode
  className?: string
}

const NoIndex: FC<NoIndexProps> = ({ children, className }) => (
  <div data-nosnippet className={className}>
    {React.createElement("noindex", null, children)}
  </div>
)

export default NoIndex
