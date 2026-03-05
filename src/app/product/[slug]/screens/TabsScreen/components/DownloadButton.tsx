import { Download } from "lucide-react"
import type { FC } from "react"
import type { Documentation } from "@/types/products.types"

interface DownloadButtonProps {
  documentation: Documentation[] | null
}

const DownloadButton: FC<DownloadButtonProps> = ({ documentation }) => {
  if (!documentation?.length) return null

  return (
    <div className="flex flex-col gap-2">
      {documentation.map((doc) => (
        <a
          key={doc.url}
          href={doc.url}
          download
          className="flex items-center text-white border-b border-white hover:opacity-80 w-fit"
        >
          <span>{doc.title || "Скачать документацию"}</span>
          <Download className="h-5 w-5 ml-2" />
        </a>
      ))}
    </div>
  )
}

export default DownloadButton
