import { isAxiosError } from "axios"
import { useCallback, useRef, useState } from "react"
import { toast } from "sonner"
import mediaService from "@/services/media/media.service"
import type { IUploadedFile } from "./FileUploader/index"

const MAX_FILES = 5

export interface IFileUploadProgress {
  name: string
  progress: number
}

export function useUploadFiles(bucketName: string) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<IUploadedFile[]>([])
  const [uploading, setUploading] = useState<IFileUploadProgress[]>([])

  const isUploading = uploading.length > 0
  const isMaxReached = files.length >= MAX_FILES

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? [])
      if (selected.length === 0) return

      const remaining = MAX_FILES - files.length
      if (remaining <= 0) {
        toast.error(`Максимум ${MAX_FILES} файлов`)
        e.target.value = ""
        return
      }
      if (selected.length > remaining) {
        toast.error(`Можно добавить ещё ${remaining} файл(ов)`)
        selected.splice(remaining)
      }

      const initialProgress = selected.map((f) => ({
        name: f.name,
        progress: 0,
      }))
      setUploading(initialProgress)

      const results: IUploadedFile[] = []

      await Promise.all(
        selected.map(async (file, idx) => {
          try {
            const result = await mediaService.uploadFile(
              file,
              bucketName,
              (p) => {
                setUploading((prev) =>
                  prev.map((item, i) =>
                    i === idx ? { ...item, progress: p } : item,
                  ),
                )
              },
            )
            if (result?.file_url) {
              results.push({ name: file.name, url: result.file_url })
            }
          } catch (err) {
            if (isAxiosError(err) && err.response?.status === 413) {
              toast.error(
                `Файл слишком большой: ${file.name}, максимальный размер 10MB`,
              )
            } else {
              toast.error(`Ошибка загрузки: ${file.name}`)
            }
          }
        }),
      )

      if (results.length > 0) {
        setFiles((prev) => [...prev, ...results])
        toast.success(`Загружено файлов: ${results.length}`)
      }

      setUploading([])
      e.target.value = ""
    },
    [bucketName, files.length],
  )

  const removeFile = useCallback((url: string) => {
    setFiles((prev) => prev.filter((f) => f.url !== url))
  }, [])

  const resetFiles = useCallback(() => {
    setFiles([])
    setUploading([])
  }, [])

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return {
    fileInputRef,
    files,
    uploading,
    isUploading,
    isMaxReached,
    handleFileChange,
    removeFile,
    resetFiles,
    openFilePicker,
  }
}
