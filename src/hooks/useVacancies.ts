import { useQuery } from "@tanstack/react-query"
import vacanciesService from "@/services/vacancies.service"
import type { IVacancyListParams } from "@/types/vacancies.types"

export function useVacancies(params?: IVacancyListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["vacancies", params ?? {}],
    queryFn: () => vacanciesService.getList(params),
  })

  return {
    vacancies: data?.data?.items ?? [],
    pagination: data?.data?.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}
