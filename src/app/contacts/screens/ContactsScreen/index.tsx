"use client"

import type { FC } from "react"
import ContactForm from "@/components/contact/ContactForm"
import { companyAddress, contactBlocks } from "@/components/Footer/data"
import Breadcrumbs from "@/components/ui/Breadcrumbs"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import YandexMapContainer from "@/components/ui/YandexMapContainer"
import EmailIcon from "@/shared/icons/EmailIcon"
import LocationIcon from "@/shared/icons/LocationIcon"
import PhoneIcon from "@/shared/icons/PhoneIcon"

const iconClassName = "w-4 h-4 text-white shrink-0"

const ContactsScreen: FC = () => {
  return (
    <main>
      <Breadcrumbs
        items={[
          { label: "Главная", href: "/" },
          { label: "Контакты", href: "/contacts", current: true },
        ]}
      />

      <section className="py-16">
        <CustomContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Form */}
            <div>
              <GradientHeading className="mb-8">
                Связаться с нами
              </GradientHeading>
              <p className="text-base md:text-lg font-medium text-white/80 mb-10">
                Заполните форму — мы свяжемся с вами в рабочее время, ответим на
                вопросы и подготовим предложение. При необходимости можно
                прикрепить файлы с ТЗ или спецификацией.
              </p>

              <ContactForm />
            </div>

            {/* Right Column - Contact Information */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {contactBlocks.map((block, idx) => (
                  <div key={idx}>
                    <h3 className="text-base md:text-lg font-medium text-white/80 mb-4">• {block.title}</h3>
                    {block.phone && (
                      <div className="flex items-center gap-2 mb-3">
                        <PhoneIcon className={iconClassName} />
                        <a
                          href={`tel:${block.phoneRaw || block.phone.replace(/\D/g, "")}`}
                          className="text-base font-medium text-white"
                        >
                          {block.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <EmailIcon className={iconClassName} />
                      <a href={`mailto:${block.email}`} className="text-base font-medium text-white">
                        {block.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-base md:text-lg font-medium text-white/80 mb-4">• Адрес</h3>
                <div className="flex items-center gap-2 mb-4">
                  <LocationIcon className={iconClassName} />
                  <span className="text-base font-medium text-white">{companyAddress}</span>
                </div>
                <YandexMapContainer height="300px" />
              </div>
            </div>
          </div>
        </CustomContainer>
      </section>
    </main>
  )
}

export default ContactsScreen
