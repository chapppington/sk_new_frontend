import type { FC } from "react"
import type { ICustomContainerProps } from "@/components/CustomContainer/types"

const CustomContainer: FC<ICustomContainerProps> = ({
  children,
  className,
  style,
  fullHeight = false,
}) => {
  return (
    <div
      className={`container mx-auto max-w-[1620px] px-7 md:px-10 lg:px-10 2xl:px-24 ${
        className || ""
      }`}
      style={
        fullHeight ? { minHeight: "calc(100vh - 180px)", ...style } : style
      }
    >
      {children}
    </div>
  )
}

export default CustomContainer
