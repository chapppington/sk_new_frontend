export interface Questionnaire {
  id: string
  title: string
  description: string
  href: string
  buttonText?: string
  external?: boolean
  download?: boolean
}

export const questionnaires: Questionnaire[] = [
  {
    id: "ktp",
    title: "КТП",
    description:
      "Опросный лист на изготовление комплектной трансформаторной подстанции",
    href: "/questionnaire/ktp",
  },
  {
    id: "krun",
    title: "КРУН/ЯКНО",
    description:
      "Опросный лист на изготовление комплектного распределительного устройства наружной установки",
    href: "/questionnaire/krun",
  },
  {
    id: "kru-file",
    title: "КРУ",
    description: "Скачать опросный лист на КРУ в формате .docx",
    href: "./Опросный лист на КРУ.docx",
    buttonText: "Скачать файл",
    external: true,
    download: true,
  },
  {
    id: "kso-file",
    title: "КСО",
    description: "Скачать опросный лист на КСО в формате .docx",
    href: "./Опросный лист на КСО.docx",
    buttonText: "Скачать файл",
    external: true,
    download: true,
  },
  {
    id: "parn-file",
    title: "ПАРН",
    description: "Скачать опросный лист на ПАРН в формате .docx",
    href: "./Опросный лист на ПАРН.docx",
    buttonText: "Скачать файл",
    external: true,
    download: true,
  },
]
