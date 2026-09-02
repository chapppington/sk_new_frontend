type IBreadcrumbItem = {
  label: string
  href: string
  current?: boolean
}

export interface IBreadcrumbsProps {
  items: IBreadcrumbItem[]
  className?: string
  disableContainer?: boolean
  /** Не дублировать JSON-LD, если разметка уже в SSR (например, на странице товара) */
  hideSchema?: boolean
}
