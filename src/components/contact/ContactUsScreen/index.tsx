"use client"

import type { FC, ReactNode } from "react"
import ContactForm from "@/components/contact/ContactForm"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"

interface ContactUsScreenProps {
  heading?: ReactNode
  description?: string
}

const ContactUsScreen: FC<ContactUsScreenProps> = ({
  heading = "Хотите обсудить проект или получить предложение?",
  description = "Если вы заинтересованы в нашей продукции или ищете техническое решение — оставьте свои контакты, и наш специалист свяжется с вами в ближайшее время.",
}) => {
  return (
    <section id="contact_us_section" className="bg-transparent py-24">
      <CustomContainer>
        <BracketsText className="mb-8">СВЯЗАТЬСЯ С НАМИ</BracketsText>
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="lg:w-1/2">
            <GradientHeading className="mb-4">{heading}</GradientHeading>
            <div className="mt-8 lg:mb-0">
              <p className="text-base md:text-lg font-medium text-white/70 max-w-[600px]">{description}</p>
            </div>
          </div>
          <div className="lg:w-1/2">
            <ContactForm />
          </div>
        </div>
      </CustomContainer>
    </section>
  )
}

export default ContactUsScreen
