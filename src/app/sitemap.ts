import type { MetadataRoute } from "next"
import productsService from "@/services/products.service"
import newsService from "@/services/news.service"
import portfoliosService from "@/services/portfolios.service"

const baseUrl = "https://sibkomplekt.ru"

const staticRoutes: {
  path: string
  priority: number
  changeFreq: MetadataRoute.Sitemap[0]["changeFrequency"]
}[] = [
  { path: "", priority: 1.0, changeFreq: "daily" },
  { path: "/catalog", priority: 0.9, changeFreq: "monthly" },
  { path: "/portfolio", priority: 0.8, changeFreq: "monthly" },
  { path: "/news", priority: 0.7, changeFreq: "monthly" },
  { path: "/about", priority: 0.6, changeFreq: "monthly" },
  { path: "/production", priority: 0.6, changeFreq: "monthly" },
  { path: "/certificates", priority: 0.5, changeFreq: "monthly" },
  { path: "/vacancies", priority: 0.5, changeFreq: "monthly" },
  { path: "/contacts", priority: 0.5, changeFreq: "monthly" },
  { path: "/quality", priority: 0.5, changeFreq: "monthly" },
  { path: "/privacy", priority: 0.3, changeFreq: "yearly" },
  { path: "/questionnaire", priority: 0.5, changeFreq: "monthly" },
  { path: "/questionnaire/ktp", priority: 0.5, changeFreq: "monthly" },
  { path: "/questionnaire/krun", priority: 0.5, changeFreq: "monthly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = []

  staticRoutes.forEach((route) => {
    sitemap.push({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq,
      priority: route.priority,
    })
  })

  try {
    const [productsRes, newsRes, portfoliosRes] = await Promise.all([
      productsService.getList({ limit: 1000, is_shown: true }),
      newsService.fetchNews({ limit: 1000 }),
      portfoliosService.getList({ limit: 1000 }),
    ])

    const products = productsRes?.data?.items ?? []
    const news = newsRes?.data?.items ?? []
    const portfolios = portfoliosRes?.data?.items ?? []

    products.forEach((p) => {
      sitemap.push({
        url: `${baseUrl}/product/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      })
    })

    news.forEach((n) => {
      sitemap.push({
        url: `${baseUrl}/news/${n.slug}`,
        lastModified: n.updated_at ? new Date(n.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      })
    })

    portfolios.forEach((p) => {
      sitemap.push({
        url: `${baseUrl}/portfolio/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    })
  } catch (e) {
    console.error("Sitemap fetch error:", e)
  }

  return sitemap
}
