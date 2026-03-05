"use client"

import type { FC } from "react"
import VacancyContactForm from "@/components/contact/VacancyContactForm"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"

const VacancyFormScreen: FC = () => {
  return (
    <section id="vacancy_form_section" className="bg-transparent py-24">
      <CustomContainer>
        <BracketsText className="mb-8">ОТКЛИКНУТЬСЯ НА ВАКАНСИЮ</BracketsText>
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="lg:w-1/2">
            <GradientHeading className="mb-4">
              Хотите работать в нашей компании?
            </GradientHeading>
            <div className="mt-8 lg:mb-0">
              <p className="text-base md:text-lg font-medium text-white/80 max-w-[600px]">
                Если Вас заинтересовали вакансии нашей компании, заполните форму
                и мы обязательно с Вами свяжемся
              </p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <VacancyContactForm />
          </div>
        </div>
      </CustomContainer>
    </section>
  )
}

export default VacancyFormScreen
