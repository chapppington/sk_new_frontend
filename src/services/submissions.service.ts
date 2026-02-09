import { axiosPublic } from "@/api/axios"
import type { ApiResponse } from "@/types/api.types"
import type {
  ICreateSubmissionData,
  ISubmission,
} from "@/types/submissions.types"

class SubmissionsService {
  private _BASE_URL = "/submissions"

  async create(data: ICreateSubmissionData) {
    const response = await axiosPublic.post<ApiResponse<ISubmission>>(
      this._BASE_URL,
      data,
    )
    return { data: response.data.data }
  }
}

export default new SubmissionsService()
