import { useQuery } from "@tanstack/react-query"
import reviewsService from "@/services/reviews.service"
import type { IReviewsListParams } from "@/types/reviews.types"

export function useReviews(params?: IReviewsListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reviews", params],
    queryFn: () => reviewsService.getList(params),
  })

  return {
    reviews: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}

export function useReviewById(id: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["reviews", "id", id],
    queryFn: () => reviewsService.getById(id!),
    enabled: Boolean(id),
  })

  return {
    review: data?.data ?? null,
    isLoading,
    error,
    refetch,
  }
}
