export function formatWarehouseFileDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

export function buildWarehouseDownloadFileName(date: Date): string {
  return `Товары со склада ${formatWarehouseFileDate(date)} СибКомплект.xlsx`
}

export function buildWarehouseContentDisposition(filename: string): string {
  const encoded = encodeURIComponent(filename)
  return `attachment; filename="warehouse-stock.xlsx"; filename*=UTF-8''${encoded}`
}
