"use client"

import Image from "next/image"
import type { FC } from "react"
import TransitionLink from "@/components/ui/TransitionLink"
import {
  desktopNavigationItems,
  mobileNavigationItems,
} from "@/components/Footer/data"

const FooterTop: FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
      <div className="mb-8 lg:mb-0">
        <TransitionLink href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="СИБКОМПЛЕКТ"
            width={175}
            height={35}
            className="h-25"
            priority
          />
        </TransitionLink>
      </div>

      <div className="w-full lg:w-auto">
        <div className="lg:hidden w-full space-y-4 mb-8 lg:mb-0">
          {mobileNavigationItems.map((item) => (
            <div key={item.link} className="border-b border-white/30 pb-4">
              <TransitionLink
                href={item.link}
                className="flex justify-between items-center text-white"
              >
                <span>{item.name}</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </TransitionLink>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex justify-center items-center w-full">
          <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
            {desktopNavigationItems.map((item) => (
              <TransitionLink
                key={item.link}
                href={item.link}
                className="text-white hover:text-white/80 text-sm whitespace-nowrap relative select-none group transition-colors"
              >
                {item.name}
                <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
              </TransitionLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterTop
