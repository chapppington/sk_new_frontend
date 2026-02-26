import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/api/types"
import type { IVacancy, IVacancyListParams } from "@/types/vacancies.types"

class VacanciesService {
  private _BASE_URL = "/vacancies"

  async getList(params?: IVacancyListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<IVacancy>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }
}

export default new VacanciesService()
