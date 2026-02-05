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
  const tabContentRef = useRef<HTMLDivElement>(null)

  const { groups, isLoading: groupsLoading } = useCertificateGroups({
    is_active: true,
    sort_field: "order",
    sort_order: 1,
    limit: 100,
  })

  const sections = useMemo(() => {
    const uniqueSections = [...new Set(groups.map((g) => g.section))]
    return uniqueSections
  }, [groups])

  const currentSection = sections[activeTab]

  const filteredGroups = useMemo(() => {
    return groups.filter((g) => g.section === currentSection)
  }, [groups, currentSection])

  useEffect(() => {
    if (tabContentRef.current) {
      gsap.fromTo(
        tabContentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      )
    }
  }, [activeTab])

  const safeActiveTab = Math.min(activeTab, Math.max(0, sections.length - 1))

  if (groupsLoading) {
    return (
      <div className="mb-10">
        <CustomContainer className="mt-8 mb-12">
          <GradientHeading>Сертификаты и документация</GradientHeading>
        </CustomContainer>
        <CustomContainer>Загрузка…</CustomContainer>
      </div>
    )
  }

  if (!sections.length) {
    return (
      <div className="mb-10">
        <CustomContainer className="mt-8 mb-12">
          <GradientHeading>Сертификаты и документация</GradientHeading>
        </CustomContainer>
        <CustomContainer>Пока нет данных</CustomContainer>
      </div>
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
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <ul className="space-y-4">
              {sections.map((section, index) => (
                <li key={section}>
                  <CategoryButton
                    onClick={() => setActiveTab(index)}
                    isActive={safeActiveTab === index}
                    className="w-full"
                  >
                    {section}
                  </CategoryButton>
                </li>
              ))}
            </ul>
          </div>

          <div className="container mx-auto relative">
            <div className="flex flex-col md:flex-row mx-auto">
              <div className="pl-0 md:pl-8 w-full">
                <div ref={tabContentRef} key={`tab-content-${safeActiveTab}`}>
                  {filteredGroups.map((group) => (
                    <CertificateGroupDropdown key={group.oid} group={group} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  )
}
