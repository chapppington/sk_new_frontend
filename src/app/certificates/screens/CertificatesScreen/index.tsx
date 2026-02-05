"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import gsap from "gsap"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import GradientHeading from "@/components/ui/GradientHeading"
import CustomContainer from "@/components/CustomContainer"
import CategoryButton from "@/components/ui/CategoryButton"
import { useCertificateGroups } from "@/hooks/useCertificates"
import CertificateGroupDropdown from "./components/CertificateGroupDropdown"

export default function CertificatesScreen() {
  const [activeTab, setActiveTab] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  const { groups, isLoading } = useCertificateGroups({
    is_active: true,
    sort_field: "order",
    sort_order: 1,
    limit: 100,
  })

  const sections = useMemo(() => [...new Set(groups.map((g) => g.section))], [groups])
  const safeTab = Math.min(activeTab, sections.length - 1) || 0
  const filteredGroups = groups.filter((g) => g.section === sections[safeTab])

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 })
    }
  }, [safeTab])

  if (isLoading) {
    return (
      <CustomContainer className="mt-32 mb-10">
        <GradientHeading>Сертификаты и документация</GradientHeading>
        <p className="mt-8 text-white/60">Загрузка…</p>
      </CustomContainer>
    )
  }

  if (!sections.length) {
    return (
      <CustomContainer className="mt-32 mb-10">
        <GradientHeading>Сертификаты и документация</GradientHeading>
        <p className="mt-8 text-white/60">Пока нет данных</p>
      </CustomContainer>
    )
  }

  return (
    <div className="mb-10">
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Сертификаты", href: "/certificates" },
        ]}
      />

      <CustomContainer className="mt-8 mb-12">
        <GradientHeading>
          Сертификаты <br />и документация
        </GradientHeading>
      </CustomContainer>

      <CustomContainer>
        <div className="flex flex-col lg:flex-row gap-8">
          <ul className="w-full lg:w-1/4 space-y-4">
            {sections.map((section, index) => (
              <li key={section}>
                <CategoryButton
                  onClick={() => setActiveTab(index)}
                  isActive={safeTab === index}
                  className="w-full"
                >
                  {section}
                </CategoryButton>
              </li>
            ))}
          </ul>

          <div ref={contentRef} key={safeTab} className="flex-1 lg:pl-8">
            {filteredGroups.map((group) => (
              <CertificateGroupDropdown key={group.oid} group={group} />
            ))}
          </div>
        </div>
      </CustomContainer>
    </div>
  )
}
