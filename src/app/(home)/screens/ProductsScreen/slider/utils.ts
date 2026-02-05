import {
  INDICATOR_ACTIVE_GROUP,
  INDICATOR_COUNT,
  type SwiperInstance,
  updateSliderIndicators,
} from "@/utils/sliderIndicators";

export { INDICATOR_COUNT, INDICATOR_ACTIVE_GROUP, type SwiperInstance };

export function getProductHref(slug: string) {
  return `/catalog?tab=products&category=${encodeURIComponent(
    slug
  )}#catalog_section`;
}

export function updateProductsIndicators(
  swiper: { slides?: Element[]; realIndex?: number } | null,
  productsCount: number
) {
  updateSliderIndicators(swiper, productsCount, {
    barClass: "products-indicator-bar",
    dimension: "width",
    sizes: { default: "6px", active: ["4px", "20px", "40px", "20px", "4px"] },
  });
}
