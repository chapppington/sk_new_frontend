import type { Metadata } from "next"
import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/api/types"
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

  async getMetadata(slug: string): Promise<Metadata> {
    try {
      const { data } = await this.getBySlug(slug)
      if (!data) throw new Error("Product not found")

      const description =
        data.description.length > 160
          ? data.description.substring(0, 160) + "..."
          : data.description

      return {
        title: `${data.name} | СибКомплект`,
        description,
      }
    } catch {
      return {
        title: `Продукт ${slug} | СибКомплект`,
        description: "Подробная информация о продукте и его характеристиках",
      }
    }
  }
}

export default new ProductsService()
