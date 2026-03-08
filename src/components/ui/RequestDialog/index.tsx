"use client"

import { useEffect } from "react"
import { useLenis } from "lenis/react"
import RequestContactForm from "@/components/contact/RequestContactForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"

interface RequestDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function RequestDialog({ isOpen, onClose }: RequestDialogProps) {
  const lenis = useLenis()

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }
    return () => { lenis?.start() }
  }, [isOpen, lenis])

  const handleClose = () => {
    lenis?.start()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="bg-blue-950 border-white/20 p-0 max-w-4xl text-white h-dvh sm:h-auto sm:max-h-[85vh] [@media(max-height:820px)]:max-h-[96vh] overflow-y-auto"
        showCloseButton={true}
      >
        <DialogHeader className="px-6 pt-6 pb-4 [@media(max-height:820px)]:px-6 [@media(max-height:820px)]:pt-5 [@media(max-height:820px)]:pb-4">
          <DialogTitle className="text-white text-lg font-bold">
            Оставить заявку
          </DialogTitle>
          <p className="text-white/60 text-sm">
            Заполните форму, и мы свяжемся с вами в ближайшее время.
          </p>
        </DialogHeader>

        <div className="px-6 py-6 [@media(max-height:820px)]:px-6 [@media(max-height:820px)]:py-4">
          <RequestContactForm onSuccess={handleClose} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
