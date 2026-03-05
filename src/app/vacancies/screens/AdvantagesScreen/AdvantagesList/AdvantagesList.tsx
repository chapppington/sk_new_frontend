"use client"

import {
  Factory,
  FileCheck,
  GraduationCap,
  Handshake,
  Lightbulb,
  Users,
} from "lucide-react"
import type { FC } from "react"

const ADVANTAGES = [
  {
    icon: FileCheck,
    text: "Официальное трудоустройство, стабильная зарплата и ДМС после испытательного срока",
  },
  {
    icon: Handshake,
    text: "Сотрудничество с крупными клиентами: «Черкизово», «ЕВРАЗ», «АЛТАЙ ТАРА»",
  },
  {
    icon: Users,
    text: "Корпоративные мероприятия, «Олимпийские игры СК», проект «Бережливое производство»",
  },
  {
    icon: Factory,
    text: "Алтайский производитель с большим современным цехом и новейшим оборудованием",
  },
  {
    icon: GraduationCap,
    text: "Собственный «Центр развития компетенций» с наставниками. Аттестация рабочих мест по системе СОУТ",
  },
  {
    icon: Lightbulb,
    text: "Проектная работа со студентами ВУЗов, реализация уникальных дипломных идей",
  },
] as const

const AdvantagesList: FC = () => {
  return (
    <div className="w-full lg:w-1/2 relative z-10 order-last lg:order-first">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-16 w-full">
        {ADVANTAGES.map(({ icon: Icon, text }, idx) => (
          <div key={idx} className="flex items-start w-full gap-3">
            <Icon className="w-8 h-8 text-white mt-1 shrink-0" />
            <p className="text-white/80 text-base md:text-lg w-full">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdvantagesList
