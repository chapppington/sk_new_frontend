import Image from "next/image"

interface ReviewSlideProps {
  name: string
  position: string | null
  image: string | null
  onClick: () => void
}

const ReviewSlide = ({ name, position, image, onClick }: ReviewSlideProps) => {
  return (
    <div className="border border-white/20 p-10 backdrop-blur-sm h-full flex flex-col justify-around">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 bg-gray-400/40 flex items-center justify-center rounded-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white/60 text-lg font-medium">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="text-white font-medium">{name}</p>
          {position && <p className="text-white/60 text-sm">{position}</p>}
        </div>
      </div>
      <button
        type="button"
        className="mt-6 px-4 py-2 bg-white/10 text-white rounded hover:bg-white/20 text-sm"
        onClick={onClick}
      >
        Открыть отзыв
      </button>
    </div>
  )
}

export default ReviewSlide
