"use client"

import { useEffect, useRef, type FC } from "react"
import { createPortal } from "react-dom"

interface VideoPopupProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  posterSrc?: string
}

const VideoPopup: FC<VideoPopupProps> = ({
  isOpen,
  onClose,
  videoSrc,
  posterSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play()
    }
  }, [isOpen])

  if (!isOpen) return null
  if (typeof document === "undefined") return null

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 z-99999 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 bg-white hover:bg-white/90 transition-colors z-10"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          controls
          className="w-full h-full object-cover"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>,
    document.body,
  )
}

export default VideoPopup
