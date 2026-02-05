import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type { IReview, IReviewsListParams } from "@/types/reviews.types"

class ReviewsService {
  private _BASE_URL = "/reviews"

  async getList(params?: IReviewsListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<IReview>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async getById(id: string) {
    const response = await axiosPublic.get<ApiResponse<IReview>>(
      `${this._BASE_URL}/${id}`,
    )
    return { data: response.data.data }
  }
}

export default new ReviewsService()
