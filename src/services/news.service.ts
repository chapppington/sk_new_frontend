import type { Metadata } from "next"
import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type { INews, INewsListParams } from "@/types/news.types"

class NewsService {
  private _BASE_URL = "/news"

  async fetchNews(params?: INewsListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<INews>>
    >(this._BASE_URL, { params })
    return { data: response.data.data }
  }

  async getBySlug(slug: string) {
    const response = await axiosPublic.get<ApiResponse<INews>>(
      `${this._BASE_URL}/slug/${slug}`,
    )
    return { data: response.data.data }
  }

  async getMetadata(slug: string): Promise<Metadata> {
    try {
      const { data } = await this.getBySlug(slug)
      if (!data) throw new Error("News not found")

      const description = data.short_content || data.content.substring(0, 160)

      return {
        title: `${data.title} | СибКомплект`,
        description,
      }
    } catch {
      return {
        title: `Новость ${slug} | СибКомплект`,
        description: "Подробная информация о новости и событиях компании",
      }
    }
  }
}

export default new NewsService()
