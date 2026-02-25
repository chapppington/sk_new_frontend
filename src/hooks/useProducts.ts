import { useQuery } from "@tanstack/react-query"
import productsService from "@/services/products.service"
import type { IProductsListParams } from "@/types/products.types"

export function useProducts(params?: IProductsListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", params ?? {}],
    queryFn: () => productsService.getList(params),
  })

  return {
    products: data?.data?.items ?? [],
    pagination: data?.data?.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}

export function useProduct(slug: string | undefined) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", "slug", slug],
    queryFn: () => productsService.getBySlug(slug!),
    enabled: Boolean(slug),
  })

  return {
    product: data?.data ?? null,
    isLoading,
    error,
    refetch,
  }
}
