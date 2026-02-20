"use client"

import dynamic from "next/dynamic"
import { useNewsBySlug } from "@/hooks/useNews"
import ArticleContentSection, {
  ArticleContentSectionSkeleton,
} from "./screens/ArticleContentScreen"

const ContactUsScreen = dynamic(
  () => import("@/components/contact/ContactUsScreen"),
)

interface Props {
  slug: string
}

const NewsDetails = ({ slug }: Props) => {
  const { news, isLoading } = useNewsBySlug(slug)

  if (isLoading) {
    return <ArticleContentSectionSkeleton />
  }

  if (!news) {
    return <div>News not found</div>
  }

  return (
    <main>
      <ArticleContentSection news={news} />
      <ContactUsScreen />
    </main>
  )
}

export default NewsDetails
