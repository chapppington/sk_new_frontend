import type { Metadata } from "next"
import newsService from "@/services/news.service"
import NewsDetails from "./NewsDetails"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return newsService.getMetadata((await params).slug)
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <NewsDetails slug={slug} />
}
