import { useQuery } from "@tanstack/react-query"
import portfoliosService from "@/services/portfolios.service"
import type { IPortfolioListParams } from "@/types/portfolios.types"

export function usePortfolios(params?: IPortfolioListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["portfolios", params],
    queryFn: () => portfoliosService.getList(params),
    enabled: params !== undefined,
  })

  return {
    portfolios: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}

export function usePortfolioBySlug(slug: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["portfolios", "slug", slug],
    queryFn: () => portfoliosService.getBySlug(slug!),
    enabled: Boolean(slug),
  })

  return {
    portfolio: data?.data ?? null,
    isLoading,
    error,
    refetch,
  }
}
