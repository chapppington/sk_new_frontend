"use client"

import { type FC, useRef } from "react"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import { MiniLoader } from "@/components/ui/MiniLoader"
import { useVacancies } from "@/hooks/useVacancies"
import JobList from "./components/JobList"

const TITLE = "Список вакансий"
const SUBTITLE =
  "В нашей компании регулярно открываются вакансии, как для опытных специалистов, так и для тех, кто только начинает свою карьеру. Вы можете ознакомиться с нашими вакансиями на сайте или откликнуться на одну из них через сайт hh.ru."

const VacanciesScreen: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { vacancies, isLoading, error } = useVacancies()

  const jobs = vacancies.map((v) => ({
    title: v.title,
    requirements: v.requirements,
    experience: v.experience,
    salary: v.salary,
  }))

  if (error) {
    return (
      <section id="jobs_list_section" className="py-20 relative">
        <div
          className="absolute inset-x-0 top-0 h-[512px] bg-linear-to-b from-black to-transparent"
          style={{ zIndex: -1 }}
        />
        <CustomContainer>
          <div className="text-center text-white">Ошибка загрузки вакансий</div>
        </CustomContainer>
      </section>
    )
  }

  if (isLoading) {
    return (
      <section id="jobs_list_section" className="py-20 relative">
        <div
          className="absolute inset-x-0 top-0 h-[512px] bg-linear-to-b from-black to-transparent"
          style={{ zIndex: -1 }}
        />
        <CustomContainer>
          <div className="flex justify-center py-20">
            <MiniLoader isDark width={40} height={40} />
          </div>
        </CustomContainer>
      </section>
    )
  }

  return (
    <section id="jobs_list_section" className="py-20 relative">
      <div
        className="absolute inset-x-0 top-0 h-[512px] bg-linear-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />
      <div ref={containerRef}>
        <CustomContainer>
          <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
            <div className="mb-8 md:mb-0">
              <BracketsText>ВАКАНСИИ</BracketsText>
            </div>

            <div className="flex flex-col md:max-w-3xl pt-5 lg:pt-0">
              <GradientHeading>{TITLE}</GradientHeading>
              <p className="text-white/80 mt-6">{SUBTITLE}</p>
            </div>
          </div>
          <JobList jobs={jobs} />
        </CustomContainer>
      </div>
    </section>
  )
}

export default VacanciesScreen
