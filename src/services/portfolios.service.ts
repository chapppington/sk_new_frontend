import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type { IPortfolio, IPortfolioListParams } from "@/types/portfolios.types"

class PortfoliosService {
  private _BASE_URL = "/portfolios"

  async getList(params?: IPortfolioListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<IPortfolio>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async getBySlug(slug: string) {
    const response = await axiosPublic.get<ApiResponse<IPortfolio>>(
      `${this._BASE_URL}/slug/${slug}`,
    )
    return { data: response.data.data }
  }
}

export default new PortfoliosService()
