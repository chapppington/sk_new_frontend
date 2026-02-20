export interface IParallaxImageProps {
  src: string
  alt: string
  priority?: boolean
  fetchPriority?: "high" | "low" | "auto"
  quality?: number
  className?: string
  parallaxFactor?: number
  isMobile?: boolean
}
