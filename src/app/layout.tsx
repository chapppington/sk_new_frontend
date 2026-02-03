import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "@/app/providers"
import CustomScrollbar from "@/components/CustomScrollbar"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "СибКомплект",
  description: "Корпоративный сайт компании СибКомплект",
  manifest: "/manifest.json",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <Providers>
          <CustomScrollbar />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
