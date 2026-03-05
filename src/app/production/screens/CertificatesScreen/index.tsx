"use client"

import { FC } from "react"
import Dropdown from "@/components/ui/Dropdown"
import BracketsText from "@/components/ui/BracketsText"
import CustomContainer from "@/components/ui/CustomContainer"
import DownloadIcon from "@/shared/icons/DownloadIcon"
import { CERTIFICATES_SECTION } from "./data"

const CertificatesScreen: FC = () => {
  return (
    <section
      id="certificates_section"
      className="bg-transparent py-24 relative"
    >
      <CustomContainer>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 pr-0 lg:pr-8 mb-8 lg:mb-0">
            <BracketsText>{CERTIFICATES_SECTION.bracketsText}</BracketsText>
          </div>

          <div className="container mx-auto relative">
            <div className="flex flex-col md:flex-row mx-auto">
              <div className="pl-0 md:pl-8">
                {CERTIFICATES_SECTION.items.map((item, idx) => (
                  <Dropdown
                    key={idx}
                    title={item.title}
                    defaultOpen={idx === 0}
                  >
                    <p className="text-white/60 text-base select-none">
                      {item.content}
                    </p>

                    {item.documents && item.documents.length > 0 && (
                      <div className="space-y-4 mt-6">
                        {item.documents.map((doc, index) => (
                          <div
                            key={index}
                            className="doc-link flex items-center"
                          >
                            <a
                              href={doc.link}
                              className="text-white hover:text-white/80 flex items-center group"
                            >
                              <span>{doc.title}</span>
                              <DownloadIcon className="w-5 h-5 ml-2 text-white/60 group-hover:text-white/80" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </Dropdown>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  )
}

export default CertificatesScreen
