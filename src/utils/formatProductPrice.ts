export function formatProductPrice(
  price: string | null | undefined,
  showFrom = true,
): string | null {
  const trimmed = price?.trim()
  if (!trimmed) return null

  const withoutRuble = trimmed.replace(/\s*(?:₽|руб\.?)\s*$/i, "").trim()
  const digitsOnly = withoutRuble.replace(/\s/g, "")

  let formatted: string
  if (/^\d+$/.test(digitsOnly)) {
    formatted = `${digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ₽`
  } else {
    formatted = /(?:₽|руб\.?)$/i.test(trimmed) ? trimmed : `${trimmed} ₽`
  }

  return showFrom ? `от ${formatted}` : formatted
}
