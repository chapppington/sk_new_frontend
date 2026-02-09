"use client"

import type { FC } from "react"
import CustomContainer from "@/components/ui/CustomContainer"
import FooterBottom from "./components/FooterBottom"
import FooterMain from "./components/FooterMain"
import FooterTop from "./components/FooterTop"

const Footer: FC = () => {
  return (
    <footer id="footer" className="bg-transparent py-12">
      <CustomContainer>
        <FooterTop />
        <FooterMain />
        <FooterBottom />
      </CustomContainer>
    </footer>
  )
}

export default Footer
