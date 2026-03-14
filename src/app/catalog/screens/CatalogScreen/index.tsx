"use client"

import gsap from "gsap"
import { useLenis } from "lenis/react"
import { useSearchParams } from "next/navigation"
import { type FC, Suspense, useEffect, useRef, useState } from "react"

import CustomContainer from "@/components/ui/CustomContainer"
import CatalogTabButton from "./components/CatalogTabButton"
import ProductsTab from "./components/ProductsTab"
import ServicesTab from "./components/ServicesTab"
import WarehouseTab from "./components/WarehouseTab"
import { validateTabParam, type CatalogTab } from "./utils"

const CatalogSectionContent: FC = () => {
  const lenis = useLenis()
  const searchParams = useSearchParams()

  // Get and sanitize URL params
  const tabParam = validateTabParam(searchParams.get("tab"))

  const [activeTab, setActiveTab] = useState<CatalogTab>(tabParam)

  const activeTabIndicatorRef = useRef<HTMLDivElement | null>(null)
  const productsGridRef = useRef<HTMLDivElement | null>(null)
  const servicesGridRef = useRef<HTMLDivElement | null>(null)
  const noResultsRef = useRef<HTMLDivElement | null>(null)
  const paginationRef = useRef<HTMLDivElement | null>(null)

  // Update URL params when state changes (preserve search, category, page from ProductsTab)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    params.set("tab", activeTab)
    const url = `${window.location.pathname}?${params.toString()}`
    window.history.replaceState(null, "", url)
  }, [activeTab])

  // GSAP animations for tab switching
  useEffect(() => {
    if (activeTabIndicatorRef.current) {
      const xPos =
        activeTab === "products" ? "0%" : activeTab === "services" ? "50%" : "100%"
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
    <section id="catalog_section" className="bg-transparent py-24">
      <CustomContainer>
        {/* Navigation - Unified for both mobile and desktop */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4 w-full xl:w-auto">
            <CatalogTabButton
              label="Продукция"
              isActive={activeTab === "products"}
              onClick={() => setActiveTab("products")}
            />
            <CatalogTabButton
              label="Услуги"
              isActive={activeTab === "services"}
              onClick={() => setActiveTab("services")}
            />
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
            />
          )}
          {activeTab === "services" && (
            <ServicesTab
              servicesGridRef={servicesGridRef}
              noResultsRef={noResultsRef}
            />
          )}
          {activeTab === "warehouse" && <WarehouseTab />}
        </div>
      </CustomContainer>
    </section>
  )
}

const CatalogSection: FC = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
      <CatalogSectionContent />
    </Suspense>
  )
}

export default CatalogSection
