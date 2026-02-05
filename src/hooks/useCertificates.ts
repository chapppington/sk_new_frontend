import { useQuery } from "@tanstack/react-query"
import certificatesService from "@/services/certificates.service"
import type {
  ICertificateGroupsListParams,
  ICertificatesListParams,
} from "@/types/certificates.types"

export function useCertificates(params?: ICertificatesListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["certificates", params],
    queryFn: () => certificatesService.getList(params),
  })

  return {
    certificates: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}

export function useCertificateGroups(params?: ICertificateGroupsListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["certificate-groups", params],
    queryFn: () => certificatesService.getGroupsList(params),
  })

  return {
    groups: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}
