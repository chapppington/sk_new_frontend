import { API_URL } from "@/constants"
import type { ISeoSettings } from "@/types/seo.types"
import { normalizePath, toMetadata } from "./seo.helpers"

class SeoSettingsService {
  async fetchSeoSettings(
    pagePath: string,
    init?: RequestInit,
  ): Promise<ISeoSettings | null> {
    const path = normalizePath(pagePath)
    const url = `${API_URL}/seo-settings/path/${encodeURIComponent(path)}`

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

  async getMetadata(pagePath: string, init?: RequestInit) {
    const seo = await this.fetchSeoSettings(pagePath, init)
    return toMetadata(seo)
  }
}

export default new SeoSettingsService()
