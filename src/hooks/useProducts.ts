import { useQuery } from "@tanstack/react-query"
import productsService from "@/services/products.service"
import portfoliosService from "@/services/portfolios.service"
import type {
  IProductWithPortfolio,
  IProductsListParams,
} from "@/types/products.types"

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
    queryFn: async () => {
      const { data: product } = await productsService.getBySlug(slug!)
      if (!product) return null

      let portfolio_items: Array<{
        oid: string
        poster: string
        name: string
        description?: string
        year: number | string
        slug: string
      }> = []

      if (product.portfolio_ids?.length > 0) {
        const results = await Promise.all(
          product.portfolio_ids.map((id) =>
            portfoliosService.getById(id).then((res) => res.data),
          ),
        )
        portfolio_items = results
          .filter((p): p is NonNullable<typeof p> => p != null)
          .map((p) => ({
            oid: p.oid,
            poster: p.poster,
            name: p.name,
            description: p.description,
            year: p.year,
            slug: p.slug,
          }))
      }

      return { ...product, portfolio_items }
    },
    enabled: Boolean(slug),
  })

  return {
    product: (data ?? null) as IProductWithPortfolio | null,
    isLoading,
    error,
    refetch,
  }
}
