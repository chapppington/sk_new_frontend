import { API_URL } from "@/constants"
import type { IQuestionnaireSettings } from "@/types/questionnaire-settings.types"

class QuestionnaireSettingsService {
  async getBySlug(
    slug: string,
    init?: RequestInit,
  ): Promise<IQuestionnaireSettings | null> {
    const url = `${API_URL}/questionnaire-settings/slug/${encodeURIComponent(slug)}`

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

export default new QuestionnaireSettingsService()
