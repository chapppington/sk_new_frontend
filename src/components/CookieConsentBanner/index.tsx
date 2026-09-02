"use client"

import { useEffect, useState } from "react"
import { PagesConfig } from "@/config/pages.config"

const STORAGE_KEY = "sk-cookie-consent"

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY)
    if (!accepted) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-3 left-0 right-0 z-40 pointer-events-none"
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookies"
    >
      <div className="container mx-auto max-w-[1620px] px-7 md:px-10 lg:px-10 2xl:px-24">
        <div className="lg:flex lg:justify-center">
          <div className="pointer-events-auto w-full lg:max-w-[640px]">
            <div className="flex items-center gap-3 rounded-lg border border-white/80 bg-[#0b1220]/95 px-3 py-2.5 backdrop-blur-sm">
              <p className="text-white/90 text-[11px] leading-snug md:text-xs">
                Мы используем Cookies. Продолжая использовать наш сайт, вы
                подтверждаете, что ознакомились с{" "}
                <a
                  href={PagesConfig.privacy.href}
                  className="underline hover:text-white"
                >
                  Политикой конфиденциальности
                </a>
                .
              </p>
              <button
                type="button"
                onClick={handleAccept}
                className="shrink-0 rounded-md bg-white px-4 py-1.5 text-[11px] md:text-xs font-medium text-[#0b1220] hover:bg-white/90 transition-colors cursor-pointer"
              >
                Принять
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
