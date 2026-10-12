"use client"

import gsap from "gsap"
import { useLenis } from "lenis/react"
import { type FC, Suspense, useEffect, useRef, useState } from "react"

import CustomContainer from "@/components/ui/CustomContainer"
import type { CatalogTextNode } from "@/types/catalog-text.types"
import CatalogTabButton from "./components/CatalogTabButton"
import ProductsTab from "./components/ProductsTab"
// import ServicesTab from "./components/ServicesTab"
import WarehouseTab from "./components/WarehouseTab"
import type { CatalogTab } from "./utils"

type CatalogSectionContentProps = {
  content: CatalogTextNode | null
}

const CatalogSectionContent: FC<CatalogSectionContentProps> = ({ content }) => {
  const lenis = useLenis()
  const [activeTab, setActiveTab] = useState<CatalogTab>("products")

  const activeTabIndicatorRef = useRef<HTMLDivElement | null>(null)
  const productsGridRef = useRef<HTMLDivElement | null>(null)
  // const servicesGridRef = useRef<HTMLDivElement | null>(null)
  const noResultsRef = useRef<HTMLDivElement | null>(null)
  const paginationRef = useRef<HTMLDivElement | null>(null)

  // GSAP animations for tab switching
  useEffect(() => {
    if (activeTabIndicatorRef.current) {
      const xPos = activeTab === "products" ? "0%" : "100%"
      gsap.to(activeTabIndicatorRef.current, {
        x: xPos,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          if (lenis) {
            lenis.resize()
          }
        },
      })
    }
  }, [activeTab])

  return (
    <section id="catalog_section" className="bg-transparent pt-4 pb-24">
      <CustomContainer>
        {/* Navigation - Unified for both mobile and desktop */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 w-full xl:w-auto">
            <CatalogTabButton
              label="Продукция"
              isActive={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
            {/* <CatalogTabButton
              label="Услуги"
              isActive={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            /> */}
            <CatalogTabButton
              label="Товары со склада"
              isActive={activeTab === "warehouse"}
              onClick={() => setActiveTab("warehouse")}
            />
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 mt-8 xl:mt-0">
          {activeTab === "products" && (
            <ProductsTab
              productsGridRef={productsGridRef}
              paginationRef={paginationRef}
              noResultsRef={noResultsRef}
              content={content}
            />
          )}
          {/* {activeTab === "services" && (
            <ServicesTab
              servicesGridRef={servicesGridRef}
              noResultsRef={noResultsRef}
            />
          )} */}
          {activeTab === "warehouse" && <WarehouseTab />}
        </div>
      </CustomContainer>
    </section>
  )
}

const CatalogSection: FC<CatalogSectionContentProps> = ({ content }) => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <CatalogSectionContent content={content} />
    </Suspense>
  )
}

export default CatalogSection
