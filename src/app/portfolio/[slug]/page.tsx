import type { Metadata } from "next"
import portfoliosService from "@/services/portfolios.service"
import PortfolioDetailsScreen from "@/app/portfolio/[slug]/PortfolioDetailsScreen"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  return portfoliosService.getMetadata((await params).slug)
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PortfolioDetailsScreen slug={slug} />
}
