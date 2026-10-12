import { API_URL } from "@/constants"
import type { IWarehouseFile } from "@/types/warehouse-file.types"

class WarehouseFileService {
  async getFile(init?: RequestInit): Promise<IWarehouseFile | null> {
    try {
      const res = await fetch(`${API_URL}/warehouse-file`, {
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

export default new WarehouseFileService()
