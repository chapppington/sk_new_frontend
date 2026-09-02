import Image from "next/image"
import React, { type FC } from "react"

import CustomContainer from "@/components/ui/CustomContainer"
import MainButton from "@/components/ui/MainButton"

export const OwnerCommentScreen: FC = () => {
  return (
    <section className="relative bg-transparent py-24">
      <div
        className="absolute inset-x-0 top-0 h-[300px] bg-linear-to-b from-black to-transparent"
        style={{ zIndex: -1 }}
      />
      <CustomContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mx-auto items-stretch">
          {/* Photos row for mobile/tablet */}
          <div className="flex gap-4 w-full lg:contents">
            {/* First Person */}
            <div className="flex flex-col gap-2 w-1/2 lg:w-auto order-1">
              <div
                className="border border-white/10 rounded-md overflow-hidden flex items-center justify-center bg-black/20 relative w-full aspect-square"
                style={{
                  clipPath:
                    "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)",
                }}
              >
                <Image
                  src="/polozov-general-director.webp"
                  alt="Полозов Сергей Николаевич"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="border border-white/10 rounded-md px-4 py-3 bg-black/20">
                <div className="text-white text-lg font-medium mb-1">
                  Полозов Сергей <br></br>Николаевич
                </div>
                <div className="text-gray-400 text-sm">
                  Генеральный директор
                </div>
              </div>
            </div>

            {/* Second Person */}
            <div className="flex flex-col gap-2 w-1/2 lg:w-auto order-2 lg:order-3">
              <div
                className="border border-white/10 rounded-md overflow-hidden flex items-center justify-center bg-black/20 relative w-full aspect-square"
                style={{
                  clipPath:
                    "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",
                }}
              >
                <Image
                  src="/malinovskiy-technical-director.webp"
                  alt="Малиновский Михаил Валентинович"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="border border-white/10 rounded-md px-4 py-3 bg-black/20">
                <div className="text-white text-lg font-medium mb-1">
                  Малиновский Михаил <br></br>Валентинович
                </div>
                <div className="text-gray-400 text-sm">
                  Исполнительный директор
                </div>
              </div>
            </div>
          </div>

          {/* Mission and button: centered between photos on desktop */}
          <div className="flex flex-col order-3 lg:order-2">
            <blockquote className="border border-white/10 rounded-md flex items-center p-8 bg-black/20 flex-1">
              <p className="text-white text-center text-2xl md:text-3xl xl:text-4xl">
                "Миссия компании – показать новые горизонты, превосходящие
                ожидания."
              </p>
            </blockquote>
            <MainButton
              text="Cмотреть политику в области качества"
              href="/quality"
              transparent
              fullWidth
            />
          </div>
        </div>
      </CustomContainer>
    </section>
  )
}

export default OwnerCommentScreen
