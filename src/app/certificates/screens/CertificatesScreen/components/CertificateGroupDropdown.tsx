import Dropdown from "@/components/ui/Dropdown"
import DownloadIcon from "@/shared/icons/DownloadIcon"
import { useCertificates } from "@/hooks/useCertificates"

interface CertificateGroupDropdownProps {
  group: {
    oid: string
    title: string
    content: string
  }
}

export default function CertificateGroupDropdown({ group }: CertificateGroupDropdownProps) {
  const { certificates, isLoading } = useCertificates({
    certificate_group_id: group.oid,
    sort_field: "order",
    sort_order: 1,
    limit: 100,
  })

  return (
    <Dropdown title={group.title} defaultOpen={false}>
      <p className="text-white/60 text-base select-none">{group.content}</p>

      {isLoading ? (
        <p className="text-white/40 mt-4">Загрузка документов...</p>
      ) : certificates.length > 0 ? (
        <div className="space-y-4 mt-6">
          {certificates.map((doc) => (
            <div key={doc.oid} className="doc-link flex items-center">
              <a
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 flex items-center group"
              >
                <span>{doc.title}</span>
                <DownloadIcon className="w-5 h-5 ml-2 text-white/60 group-hover:text-white/80" />
              </a>
            </div>
          ))}
        </div>
      ) : null}
    </Dropdown>
  )
}
