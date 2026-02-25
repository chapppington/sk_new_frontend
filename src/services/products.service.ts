import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type { IProduct, IProductsListParams } from "@/types/products.types"

class ProductsService {
  private _BASE_URL = "/products"

  async getList(params?: IProductsListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<IProduct>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async getBySlug(slug: string) {
    const response = await axiosPublic.get<ApiResponse<IProduct>>(
      `${this._BASE_URL}/slug/${slug}`,
    )
    return { data: response.data.data }
  }
}

export default new ProductsService()
