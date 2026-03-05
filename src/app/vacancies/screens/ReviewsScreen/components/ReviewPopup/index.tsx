import Image from "next/image"
import type { FC } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import type { ReviewPopupProps } from "./types"

const ReviewPopup: FC<ReviewPopupProps> = ({ open, onOpenChange, review }) => {
  if (!review) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="bg-blue-950 border-white/20 p-4 sm:p-8 max-w-4xl text-white"
        showCloseButton={true}
      >
        <DialogHeader>
          <div className="flex flex-col sm:flex-row items-start lg:items-end gap-4 sm:gap-6 mb-4 sm:mb-8">
            <div className="w-24 h-24 sm:w-48 sm:h-48 rounded-lg overflow-hidden bg-white shrink-0">
              <Image
                src={review.image}
                alt={review.name}
                width={192}
                height={192}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <DialogTitle className="text-white text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                {review.name}
              </DialogTitle>
              <p className="text-white/80 text-base sm:text-lg">
                {review.position}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="text-white/90 text-sm sm:text-lg leading-relaxed">
          «{review.text}»
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewPopup
