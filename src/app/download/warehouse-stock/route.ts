import { readFile } from "node:fs/promises"
import path from "node:path"
import warehouseFileService from "@/services/warehouse-file.service"
import {
  buildWarehouseContentDisposition,
  buildWarehouseDownloadFileName,
} from "@/utils/warehouseFileName"

const XLSX_CONTENT_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

const STATIC_WAREHOUSE_FILE = "Товары со склада.xlsx"

async function readStaticWarehouseFile(): Promise<ArrayBuffer | null> {
  try {
    const filePath = path.join(process.cwd(), "public", STATIC_WAREHOUSE_FILE)
    const buffer = await readFile(filePath)
    return buffer.buffer.slice(
      buffer.byteOffset,
      buffer.byteOffset + buffer.byteLength,
    )
  } catch {
    return null
  }
}

function buildFileResponse(
  body: ArrayBuffer,
  updatedAt: Date,
  contentType = XLSX_CONTENT_TYPE,
) {
  const filename = buildWarehouseDownloadFileName(updatedAt)

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": buildWarehouseContentDisposition(filename),
      "Cache-Control": "public, max-age=60",
    },
  })
}

export async function GET() {
  const warehouseFile = await warehouseFileService.getFile({
    next: { revalidate: 60 },
  })

  if (warehouseFile?.file_url) {
    try {
      const remoteResponse = await fetch(warehouseFile.file_url)
      if (remoteResponse.ok) {
        const body = await remoteResponse.arrayBuffer()
        const updatedAt = new Date(warehouseFile.updated_at)
        const contentType =
          remoteResponse.headers.get("Content-Type") ?? XLSX_CONTENT_TYPE

        return buildFileResponse(body, updatedAt, contentType)
      }
    } catch {
      // fallback to static file below
    }
  }

  const staticBody = await readStaticWarehouseFile()
  if (!staticBody) {
    return new Response("Файл не найден", { status: 404 })
  }

  return buildFileResponse(staticBody, new Date())
}
