import { useQuery } from "@tanstack/react-query"
import newsService from "@/services/news.service"
import type { INewsListParams } from "@/types/news.types"

export function useNews(params?: INewsListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["news", params ?? {}],
    queryFn: () => newsService.fetchNews(params),
  })

  return {
    news: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}

export function useNewsBySlug(slug: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["news", "slug", slug],
    queryFn: () => newsService.getBySlug(slug!),
    enabled: Boolean(slug),
  })

  return {
    news: data?.data ?? null,
    isLoading,
    error,
    refetch,
  }
}
