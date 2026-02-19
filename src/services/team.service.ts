import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type { IMember, IMembersListParams } from "@/types/members.types"

class TeamService {
  private _BASE_URL = "/members"

  async getList(params?: IMembersListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<IMember>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async getById(id: string) {
    const response = await axiosPublic.get<ApiResponse<IMember>>(
      `${this._BASE_URL}/${id}`,
    )
    return { data: response.data.data }
  }
}

export default new TeamService()
