import { useQuery } from "@tanstack/react-query"
import teamService from "@/services/team.service"
import type { IMembersListParams } from "@/types/members.types"

export function useTeamMembers(params?: IMembersListParams) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["team-members", params ?? {}],
    queryFn: () => teamService.getList(params),
    enabled: true,
  })

  return {
    members: data?.data.items ?? [],
    pagination: data?.data.pagination ?? null,
    isLoading,
    error,
    refetch,
  }
}
