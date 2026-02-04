export const INDICATOR_COUNT = 40
export const INDICATOR_ACTIVE_GROUP = 5

export type SwiperInstance = {
  slides?: Element[]
  realIndex?: number
  destroy: (a: boolean, b: boolean) => void
}

export function getProductHref(slug: string) {
  return `/catalog?tab=products&category=${encodeURIComponent(slug)}#catalog_section`
}

export function updateProductsIndicators(
  swiper: { slides?: Element[]; realIndex?: number } | null,
  productsCount: number,
) {
  if (!swiper?.slides || !productsCount) return

  const slideCount = Array.from(swiper.slides).filter(
    (s) => !s.classList.contains("swiper-slide-duplicate"),
  ).length
  if (slideCount === 0) return

  const currentIndex = (swiper.realIndex ?? 0) % slideCount
  const totalPositions = INDICATOR_COUNT - INDICATOR_ACTIVE_GROUP
  const progress = slideCount > 1 ? currentIndex / (slideCount - 1) : 0
  const position = Math.round(progress * totalPositions)

  document.querySelectorAll(".products-indicator-bar").forEach((el, index) => {
    const bar = el as HTMLElement
    bar.style.width = "6px"
    if (index >= position && index < position + INDICATOR_ACTIVE_GROUP) {
      const relativePos = index - position
      if (relativePos === 2) bar.style.width = "40px"
      else if (relativePos === 1 || relativePos === 3) bar.style.width = "20px"
      else bar.style.width = "4px"
    }
  })
}
