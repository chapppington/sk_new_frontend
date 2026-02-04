export const INDICATOR_COUNT = 40
export const INDICATOR_ACTIVE_GROUP = 5

export type SwiperInstance = {
  slides?: Element[]
  realIndex?: number
  destroy: (a: boolean, b: boolean) => void
  slidePrev: () => void
  slideNext: () => void
}

export type SliderIndicatorDimension = "width" | "height"

export type SliderIndicatorSizes = {
  default: string
  active: [string, string, string, string, string]
}

const DEFAULT_SIZES: SliderIndicatorSizes = {
  default: "4px",
  active: ["6px", "20px", "40px", "20px", "6px"],
}

export function updateSliderIndicators(
  swiper: { slides?: Element[]; realIndex?: number } | null,
  slidesCount: number,
  options: {
    barClass: string
    dimension: SliderIndicatorDimension
    sizes?: SliderIndicatorSizes
  },
) {
  if (!swiper?.slides || !slidesCount) return

  const slideCount = Array.from(swiper.slides).filter(
    (s) => !s.classList.contains("swiper-slide-duplicate"),
  ).length
  if (slideCount === 0) return

  const currentIndex = (swiper.realIndex ?? 0) % slideCount
  const totalPositions = INDICATOR_COUNT - INDICATOR_ACTIVE_GROUP
  const progress = slideCount > 1 ? currentIndex / (slideCount - 1) : 0
  const position = Math.round(progress * totalPositions)
  const { barClass, dimension, sizes = DEFAULT_SIZES } = options

  document.querySelectorAll(`.${barClass}`).forEach((el, index) => {
    const bar = el as HTMLElement
    bar.style[dimension] = sizes.default
    if (index >= position && index < position + INDICATOR_ACTIVE_GROUP) {
      const relativePos = index - position
      bar.style[dimension] = sizes.active[relativePos] ?? sizes.default
    }
  })
}
