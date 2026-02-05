import { axiosPublic } from "@/api/axios"
import type { ApiResponse, ListPaginatedResponse } from "@/types/api.types"
import type {
  ICertificate,
  ICertificateGroup,
  ICertificateGroupsListParams,
  ICertificatesListParams,
} from "@/types/certificates.types"

class CertificatesService {
  private _CERTIFICATES_URL = "/certificates"
  private _GROUPS_URL = "/certificate-groups"

  async getList(params?: ICertificatesListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<ICertificate>>
    >(this._CERTIFICATES_URL, { params })
    return { data: response.data.data }
  }

  async getById(id: string) {
    const response = await axiosPublic.get<ApiResponse<ICertificate>>(
      `${this._CERTIFICATES_URL}/${id}`,
    )
    return { data: response.data.data }
  }

  async getGroupsList(params?: ICertificateGroupsListParams) {
    const response = await axiosPublic.get<
      ApiResponse<ListPaginatedResponse<ICertificateGroup>>
    >(this._GROUPS_URL, { params })
    return { data: response.data.data }
  }

  async getGroupById(id: string) {
    const response = await axiosPublic.get<ApiResponse<ICertificateGroup>>(
      `${this._GROUPS_URL}/${id}`,
    )
    return { data: response.data.data }
  }
}

export default new CertificatesService()
