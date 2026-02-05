import Image from "next/image"
import { VisuallyHidden } from "radix-ui"
import type { FC } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog"

interface ReviewPopupProps {
  image: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

const ReviewPopup: FC<ReviewPopupProps> = ({ image, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex items-center justify-center bg-transparent border-none p-0 shadow-none max-w-none w-auto h-[90vh]"
        showCloseButton={false}
      >
        <VisuallyHidden.Root>
          <DialogTitle>Отзыв клиента</DialogTitle>
        </VisuallyHidden.Root>

        <div className="relative h-full aspect-[210/297]">
          <Image
            src={image}
            alt="Отзыв клиента"
            fill
            className="rounded-lg bg-white object-contain shadow-2xl"
          />

          <button
            type="button"
            className="absolute -right-14 top-0 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white bg-black/60 hover:bg-black/80 transition-colors"
            onClick={() => onOpenChange(false)}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewPopup
