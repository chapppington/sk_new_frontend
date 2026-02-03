"use client"

import type { FC } from "react"
import { companyAddress, contactBlocks } from "@/components/Footer/mock_data"

const PhoneIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const EmailIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LocationIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const FooterMain: FC = () => {
  const firstColumn = contactBlocks.slice(0, 2)
  const secondColumn = contactBlocks.slice(2, 4)

  return (
    <div className="md:border-t md:border-white/30 md:pt-12 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-8 md:flex md:flex-col md:justify-between">
          {firstColumn.map((block, index) => (
            <div key={index} className="h-24">
              <p className="text-white/80 mb-4">• {block.title}</p>
              <div className="grid grid-cols-1 gap-3">
                {block.phone && (
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="w-4 h-4 text-white shrink-0" />
                    <a
                      href={`tel:${block.phoneRaw || block.phone.replace(/\D/g, "")}`}
                      className="text-white"
                    >
                      {block.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <EmailIcon className="w-4 h-4 text-white shrink-0" />
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
                    <PhoneIcon className="w-4 h-4 text-white shrink-0" />
                    <a
                      href={`tel:${block.phoneRaw || block.phone.replace(/\D/g, "")}`}
                      className="text-white"
                    >
                      {block.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <EmailIcon className="w-4 h-4 text-white shrink-0" />
                  <a href={`mailto:${block.email}`} className="text-white">
                    {block.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-white/80 mb-4">• Адрес</p>
          <div className="flex items-center gap-2 mb-3">
            <LocationIcon className="w-4 h-4 text-white shrink-0" />
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
