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
  const savedTimeRef = useRef(0)

  const handleClose = () => {
    if (videoRef.current) {
      savedTimeRef.current = videoRef.current.currentTime
      videoRef.current.pause()
    }
    onClose()
  }

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (videoRef.current) {
          savedTimeRef.current = videoRef.current.currentTime
          videoRef.current.pause()
        }
        onClose()
      }
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

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current && savedTimeRef.current > 0) {
      videoRef.current.currentTime = savedTimeRef.current
      videoRef.current.pause()
    } else {
      videoRef.current?.play()
    }
  }

  if (!isOpen) return null
  if (typeof document === "undefined") return null

  return createPortal(
    <div
      className="fixed inset-0 bg-black/80 z-99999 flex items-center justify-center p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-blue-600 bg-white hover:bg-white/90 transition-colors z-10 cursor-pointer"
          onClick={handleClose}
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
          onLoadedMetadata={handleVideoLoadedMetadata}
        />
      </div>
    </div>,
    document.body,
  )
}

export default VideoPopup
