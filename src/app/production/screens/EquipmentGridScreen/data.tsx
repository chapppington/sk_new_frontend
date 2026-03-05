import React from "react"

export const EQUIPMENT_GRID = {
  sectionHeader: {
    bracketsText: "Оборудование",
    heading: (
      <>
        Используемое <br /> оборудование
      </>
    ),
    description:
      "Производство оснащено современным оборудованием, что обеспечивает высокое качество, надёжность и соответствие продукции современным стандартам отрасли.",
    desktopOrder: {
      bracketsText: 3,
      heading: 1,
      description: 2,
    },
  },
  equipment: [
    {
      id: "1",
      title: "Листогибочный пресс РВН 80/2500",
      subtitle:
        "Современная система ЧПУ оптимизирует работу пресса и выводит на дисплей оператора каждый шаг с возможными ошибками. Система сочетает технологическую мощность с простотой использования.",
      image: "/production/equipment1.webp",
      colSpan: 2,
    },
    {
      id: "2",
      title: "Порошковая окраска",
      subtitle: "",
      image: "/production/equipment2.webp",
      colSpan: 1,
    },
    {
      id: "3",
      title: "Листогибочный пресс РВС 110/3100",
      subtitle:
        "Гидравлический листогибочный пресс РВС-110/3100 6V-AXIS обеспечивает высокоточную и скоростную гибку листового металла длиной до 3 метров.",
      image: "/production/equipment3.webp",
      colSpan: 2,
    },
    {
      id: "4",
      title: "Обитаемая камера напыления",
      subtitle: "",
      image: "/production/equipment4.webp",
      colSpan: 1,
    },
    {
      id: "5",
      title:
        "Автоматизированный комплекс лазерной резки «SMD YA3015GA» 3000 ВТ",
      subtitle:
        "Комплекс способен легко справляться с резкой листов металла большого формата размером до 1500 х 3000 мм и толщиной до 16 мм.",
      image: "/production/equipment5.webp",
      colSpan: 3,
    },
    {
      id: "6",
      title: "Камера полимеризации",
      subtitle: "",
      image: "/production/equipment6.webp",
      colSpan: 1,
    },
  ],
}
