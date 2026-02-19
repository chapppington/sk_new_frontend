"use client"

import type { FC } from "react"
import { usePortfolios } from "@/hooks/usePortfolios"
import CustomContainer from "@/components/ui/CustomContainer"
import GradientHeading from "@/components/ui/GradientHeading"
import BracketsText from "@/components/ui/BracketsText"
import CustomSlider from "@/components/CustomSlider"
import ProjectSlide from "./components/ProjectSlide"

const MoreProjectsScreen: FC = () => {
  const { portfolios, isLoading } = usePortfolios({})

  return (
    <section className="bg-transparent py-24 relative">
      <CustomContainer className="h-full flex flex-col relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16">
          {/* Main Title (left) */}
          <div className="mb-4 lg:mb-0 lg:max-w-[60%]">
            <GradientHeading>Другие проекты</GradientHeading>
          </div>

          {/* Category Label (right) */}
          <div className="self-end lg:self-start">
            <BracketsText>ОПЫТ</BracketsText>
          </div>
        </div>

        {/* Slider Section */}
        <div className="grid grid-cols-1 gap-4">
          {/* Projects Slider */}
          <div className="overflow-hidden">
            {isLoading ? (
              <div className="text-center py-8">Загрузка...</div>
            ) : (
              <CustomSlider
                slidesPerView={2}
                spaceBetween={20}
                loop={true}
                showIndicators={true}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                }}
              >
                {portfolios.map((project) => (
                  <ProjectSlide
                    key={project.slug}
                    slug={project.slug}
                    title={project.name}
                    image={project.poster}
                    year={String(project.year)}
                  />
                ))}
              </CustomSlider>
            )}
          </div>
        </div>
      </CustomContainer>
    </section>
  )
}

export default MoreProjectsScreen
