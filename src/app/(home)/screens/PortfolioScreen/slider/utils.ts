import { PagesConfig } from "@/config/pages.config"
import {
  INDICATOR_ACTIVE_GROUP,
  INDICATOR_COUNT,
  type SwiperInstance,
  updateSliderIndicators,
} from "@/utils/sliderIndicators"

export { INDICATOR_COUNT, INDICATOR_ACTIVE_GROUP, type SwiperInstance }

export function getPortfolioHref(slug: string) {
  return `${PagesConfig.portfolio.href}/${slug}`
}

export function updatePortfolioIndicators(
  swiper: { slides?: Element[]; realIndex?: number } | null,
  portfoliosCount: number,
) {
  updateSliderIndicators(swiper, portfoliosCount, {
    barClass: "portfolio-indicator-bar",
    dimension: "height",
  })
}
