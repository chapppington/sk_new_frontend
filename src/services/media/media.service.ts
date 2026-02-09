import { axiosPublic } from "@/api/axios"
import type { ApiResponse } from "@/types/api.types"
import type { UploadFileResult } from "@/types/media.types"

class MediaService {
  private _BASE_URL = "/media"

  async uploadFile(
    file: File,
    bucketName: string,
    onProgress?: (progress: number) => void,
  ): Promise<UploadFileResult> {
    const formData = new FormData()
    formData.append("files", file)
    formData.append("bucket_name", bucketName)

    const response = await axiosPublic.post<ApiResponse<UploadFileResult[]>>(
      `${this._BASE_URL}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) {
            onProgress?.(Math.round((e.loaded / e.total) * 100))
          }
        },
      },
    )

    return response.data.data[0]
  }
}

export default new MediaService()
