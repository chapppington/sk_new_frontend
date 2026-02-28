import type { IStatItem } from "@/components/ui/BlackBoxWithStats/types"

export const FIRST_SCREEN = {
  title: "О компании и нашей команде",
  subtitle:
    "Превращаем амбициозные идеи в эффективные решения по всей России и Дальнему Востоку. Наша команда экспертов создаёт проекты, где инновации и надёжность работают на ваш успех",
  buttonText: "Смотреть видео о компании",
  videoSrc: "/videos/about.mp4",
  bgImage: "/about.jpg",
  stats: [
    { value: "20+", description: "лет на рынке", showOnMobile: true },
    { value: "80+", description: "сотрудников", showOnMobile: true },
    {
      value: "8500",
      unit: { text: "м²", isSuperscript: false },
      description: "производственной площади",
      showOnMobile: false,
    },
  ],
} satisfies {
  title: string
  subtitle: string
  buttonText: string
  videoSrc: string
  bgImage: string
  stats: IStatItem[]
}
