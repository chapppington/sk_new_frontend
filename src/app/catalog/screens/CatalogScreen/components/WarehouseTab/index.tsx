"use client"

import gsap from "gsap"
import { useLenis } from "lenis/react"
import { type FC, useEffect, useRef } from "react"
import QuestionnaireCard from "@/app/questionnaire/components/QuestionnaireCard"
import { warehouseDownloadFile } from "./data"

const WarehouseTab: FC = () => {
  const lenis = useLenis()
  const gridRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.children
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => {
            if (lenis) {
              lenis.resize()
            }
          },
        },
      )
    }
  }, [])

  return (
    <div className="flex-1">
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <QuestionnaireCard
          title={warehouseDownloadFile.title}
          description={warehouseDownloadFile.description}
          href={warehouseDownloadFile.href}
          buttonText={warehouseDownloadFile.buttonText}
          external
          download
        />
      </div>
    </div>
  )
}

export default WarehouseTab
