"use client"

import type { FC } from "react"
import PaperClipIcon from "@/shared/icons/PaperClipIcon"
import type { IFileUploadProgress } from "./useUploadFiles"

export interface IUploadedFile {
  name: string
  url: string
}

interface IFileUploaderProps {
  files: IUploadedFile[]
  uploading: IFileUploadProgress[]
  isUploading: boolean
  isMaxReached: boolean
  disabled?: boolean
  onOpenPicker: () => void
  onRemove: (url: string) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileInputRef: React.RefObject<HTMLInputElement | null>
}

const FileUploader: FC<IFileUploaderProps> = ({
  files,
  uploading,
  isUploading,
  isMaxReached,
  disabled,
  onOpenPicker,
  onRemove,
  onFileChange,
  fileInputRef,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={onFileChange}
        disabled={disabled || isUploading}
      />
      <button
        type="button"
        className="flex items-center text-white/80 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-white/80"
        disabled={disabled || isUploading || isMaxReached}
        onClick={onOpenPicker}
      >
        <PaperClipIcon className="w-5 h-5 mr-2" />
        {isMaxReached ? "Максимум файлов загружено" : "Прикрепить файлы"}
      </button>
      {uploading.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <PaperClipIcon className="w-4 h-4 shrink-0 text-white/40" />
          <span className="text-xs text-white/60 truncate min-w-0">{item.name}</span>
          <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${item.progress}%` }}
            />
          </div>
          <span className="text-xs text-white/40 shrink-0 w-8 text-right">{item.progress}%</span>
        </div>
      ))}
      {files.map((file) => (
        <div key={file.url} className="flex items-center gap-2 text-sm text-white/60">
          <PaperClipIcon className="w-4 h-4 shrink-0" />
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            className="text-white/40 hover:text-white transition-colors shrink-0"
            onClick={() => onRemove(file.url)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default FileUploader
