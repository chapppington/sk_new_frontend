"use client"

import type { FC } from "react"
import { companyAddress, contactBlocks } from "@/components/Footer/data"
import EmailIcon from "@/shared/icons/EmailIcon"
import LocationIcon from "@/shared/icons/LocationIcon"
import PhoneIcon from "@/shared/icons/PhoneIcon"

const iconClassName = "w-4 h-4 text-white shrink-0"

const FooterMain: FC = () => {
  const firstColumn = contactBlocks.slice(0, 2)
  const secondColumn = contactBlocks.slice(2, 4)

  return (
    <div className="md:pt-12 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {firstColumn.map((block, index) => (
            <div key={index} className="h-24">
              <p className="text-white/80 mb-4">• {block.title}</p>
              <div className="grid grid-cols-1 gap-3">
                {block.phone && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className={iconClassName} />
                    <a
                      href={`tel:${block.phoneRaw || block.phone.replace(/\D/g, "")}`}
                      className="text-white"
                    >
                      {block.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <EmailIcon className={iconClassName} />
                  <a href={`mailto:${block.email}`} className="text-white">
                    {block.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {secondColumn.map((block, index) => (
            <div key={index} className="h-24">
              <p className="text-white/80 mb-4">• {block.title}</p>
              <div className="grid grid-cols-1 gap-3">
                {block.phone && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className={iconClassName} />
                    <a
                      href={`tel:${block.phoneRaw || block.phone.replace(/\D/g, "")}`}
                      className="text-white"
                    >
                      {block.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <EmailIcon className={iconClassName} />
                  <a href={`mailto:${block.email}`} className="text-white">
                    {block.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:col-span-3 xl:col-span-1">
          <p className="text-white/80 mb-4">• Адрес</p>
          <div className="flex items-center gap-2 mb-3">
            <LocationIcon className={iconClassName} />
            <span className="text-white">{companyAddress}</span>
          </div>
          <div className="h-48 rounded bg-white/10 flex items-center justify-center text-white/60 text-sm">
            Карта
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterMain
