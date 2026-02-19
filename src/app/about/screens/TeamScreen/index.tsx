"use client"

import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"

import CustomContainer from "@/components/ui/CustomContainer"
import BracketsText from "@/components/ui/BracketsText"
import GradientHeading from "@/components/ui/GradientHeading"
import MainButton from "@/components/ui/MainButton"
import { NavigationButton } from "@/components/ui/NavigationButton"
import { TeamMemberCard } from "./components/TeamMemberCard"
import { useTeamMembers } from "@/hooks/useTeam"

const TEAM_SCREEN = {
  bracketsText: "КОМАНДА",
  title: "Профессиональная команда — основа качественного результата",
  description:
    "За годы работы мы собрали команду опытных специалистов в области энергетики, производства и управления проектами. Каждый сотрудник вносит свой вклад в развитие компании и достижение общих целей.",
  ctaText: "Хотите к нам в команду?",
  ctaButtonText: "Смотреть вакансии",
  ctaButtonHref: "/contacts",
}

export default function TeamScreen() {
  const { members, isLoading } = useTeamMembers({
    sort_field: "order",
    sort_order: 1,
  })
  const hasMembers = members.length > 0

  return (
    <section className="py-20">
      <CustomContainer>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 items-start">
          <div className="md:col-span-1 flex md:block justify-start md:justify-end mb-6 md:mb-0">
            <BracketsText className="md:mt-2">
              {TEAM_SCREEN.bracketsText}
            </BracketsText>
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
            <GradientHeading className="leading-tight text-4xl md:text-5xl">
              {TEAM_SCREEN.title}
            </GradientHeading>
            {isLoading && <p className="text-white/60">Загрузка...</p>}
            {!isLoading && hasMembers && (
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <p className="text-white/60 max-w-2xl mb-4 md:mb-0">
                    {TEAM_SCREEN.description}
                  </p>
                  <div className="hidden md:flex items-center space-x-3">
                    <NavigationButton
                      direction="prev"
                      sliderId="team"
                      className="slider-prev-team"
                    />
                    <NavigationButton
                      direction="next"
                      sliderId="team"
                      className="slider-next-team"
                    />
                  </div>
                </div>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".slider-next-team",
                    prevEl: ".slider-prev-team",
                  }}
                  breakpoints={{
                    300: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                  }}
                  loop={true}
                  autoplay={false}
                  touchMoveStopPropagation={true}
                  className="mt-12"
                >
                  {members.map((member) => (
                    <SwiperSlide key={member.oid}>
                      <TeamMemberCard
                        name={member.name}
                        position={member.position}
                        email={member.email ?? undefined}
                        image={member.image}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="flex md:hidden items-center justify-center space-x-3 mt-6">
                  <NavigationButton
                    direction="prev"
                    sliderId="team"
                    className="slider-prev-team"
                  />
                  <NavigationButton
                    direction="next"
                    sliderId="team"
                    className="slider-next-team"
                  />
                </div>
              </div>
            )}
            {!isLoading && !hasMembers && (
              <p className="text-white/60 max-w-2xl">
                {TEAM_SCREEN.description}
              </p>
            )}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-6 border-t border-white/20 pt-4">
              <div className="text-white text-xl md:text-2xl font-light">
                {TEAM_SCREEN.ctaText}
              </div>
              <MainButton
                text={TEAM_SCREEN.ctaButtonText}
                href={TEAM_SCREEN.ctaButtonHref}
              />
            </div>
          </div>
        </div>
      </CustomContainer>
    </section>
  )
}
