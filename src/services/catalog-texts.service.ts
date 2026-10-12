import { API_URL } from "@/constants"
import type { CatalogText } from "@/types/catalog-text.types"

class CatalogTextsService {
  async getByCategory(
    category: string,
    init?: RequestInit,
  ): Promise<CatalogText | null> {
    const url = `${API_URL}/catalog-texts/category/${encodeURIComponent(category)}`

    try {
      const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...init,
      })
      if (!res.ok) return null

      const body = await res.json()
      return body.data ?? null
    } catch {
      return null
    }
  }
}

export default new CatalogTextsService()
