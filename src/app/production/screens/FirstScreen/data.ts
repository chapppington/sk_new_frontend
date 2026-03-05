import type { IStatItem } from "@/components/ui/BlackBoxWithStats/types"

export const FIRST_SCREEN = {
  title: "Собственное производство полного цикла",
  subtitle:
    "Инженерные решения для сложных технических задач и любых условий эксплуатации",
  buttonText: "Просмотр 3D тура",
  buttonHref: "#",
  bgImage: "/production-bg.jpg",
  stats: [
    {
      value: "8500",
      unit: { text: "м²", isSuperscript: false },
      description: "собственная производственная площадка",
      showOnMobile: true,
    },
    {
      value: "от 7 дней",
      description: "срок сборки типового оборудования",
      showOnMobile: true,
    },
    {
      value: "90%",
      description: "оборудования — современные станки с ЧПУ",
      showOnMobile: true,
    },
  ],
} satisfies {
  title: string
  subtitle: string
  buttonText: string
  buttonHref: string
  bgImage: string
  stats: IStatItem[]
}
