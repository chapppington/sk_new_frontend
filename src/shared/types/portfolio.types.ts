import type { IPortfolio } from "@/types/portfolios.types"

export interface IPortfolioItem {
  id: string
  oid: string
  name: string
  slug: string
  poster: string
  posterAlt: string
  year: number
  taskTitle: string
  taskDescription: string
  solutionTitle: string
  solutionDescription: string
  solutionSubtitle: string
  solutionSubdescription: string
  solutionImages: string[]
  description: string
  hasReview: boolean
  reviewTitle: string | null
  reviewText: string | null
  reviewName: string | null
  reviewImage: string | null
  reviewRole: string | null
  previewVideoPath?: string | null
  fullVideoPath?: string | null
}

export function mapPortfolioFromApi(api: IPortfolio): IPortfolioItem {
  const images: string[] = []
  if (api.solution_image_left) images.push(api.solution_image_left)
  if (api.solution_image_right) images.push(api.solution_image_right)

  return {
    id: api.oid,
    oid: api.oid,
    name: api.name,
    slug: api.slug,
    poster: api.poster,
    posterAlt: api.poster_alt,
    year: api.year,
    taskTitle: api.task_title,
    taskDescription: api.task_description,
    solutionTitle: api.solution_title,
    solutionDescription: api.solution_description,
    solutionSubtitle: api.solution_subtitle,
    solutionSubdescription: api.solution_subdescription,
    solutionImages: images,
    description: api.description,
    hasReview: api.has_review,
    reviewTitle: api.review_title,
    reviewText: api.review_text,
    reviewName: api.review_name,
    reviewImage: api.review_image,
    reviewRole: api.review_role,
    previewVideoPath: (api as IPortfolio & { preview_video_path?: string })
      .preview_video_path,
    fullVideoPath: (api as IPortfolio & { full_video_path?: string })
      .full_video_path,
  }
}
