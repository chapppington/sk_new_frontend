import type { FC } from "react"

const ContactInfo: FC = () => {
  const email = "sales@sibkomplekt.ru"
  const phone = "+7 (800) 600-39-89"

  const linkClassName =
    "text-white text-sm px-8 flex items-center h-full select-none relative overflow-hidden group"

  return (
    <div className="flex items-center h-full">
      {phone && (
        <a href={`tel:${phone.replace(/\s/g, "")}`} className={linkClassName}>
          <span className="relative z-10 group-hover:text-gray-900 transition-colors">
            {phone}
          </span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      )}
      {email && phone && (
        <div className="h-full w-px bg-white/30 shrink-0" aria-hidden />
      )}
      {email && (
        <a href={`mailto:${email}`} className={linkClassName}>
          <span className="relative z-10 group-hover:text-gray-900 transition-colors">
            {email}
          </span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      )}
    </div>
  )
}

export default ContactInfo
