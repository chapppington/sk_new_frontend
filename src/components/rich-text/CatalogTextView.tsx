import type { ReactNode } from "react"
import type {
  CatalogTextMark,
  CatalogTextNode,
} from "@/types/catalog-text.types"
import styles from "./styles.module.css"

function hasVisibleText(node: CatalogTextNode): boolean {
  if (node.type === "text" && node.text?.trim()) return true
  return node.content?.some(hasVisibleText) ?? false
}

function applyMarks(text: string, marks: CatalogTextMark[] | undefined) {
  return (marks ?? []).reduce<ReactNode>((node, mark) => {
    if (mark.type === "bold") return <strong>{node}</strong>
    if (mark.type === "italic") return <em>{node}</em>
    return node
  }, text)
}

function renderNode(node: CatalogTextNode, path: string): ReactNode {
  const children = node.content?.map((child, index) =>
    renderNode(child, `${path}.${index}`),
  )

  switch (node.type) {
    case "heading":
      if (node.attrs?.level === 3) return <h3 key={path}>{children}</h3>
      return <h2 key={path}>{children}</h2>
    case "paragraph":
      return <p key={path}>{children}</p>
    case "bulletList":
      return <ul key={path}>{children}</ul>
    case "orderedList":
      return (
        <ol key={path} start={node.attrs?.start}>
          {children}
        </ol>
      )
    case "listItem":
      return <li key={path}>{children}</li>
    case "hardBreak":
      return <br key={path} />
    case "text":
      return <span key={path}>{applyMarks(node.text ?? "", node.marks)}</span>
    default:
      return null
  }
}

type CatalogTextViewProps = {
  content: CatalogTextNode | null
}

export default function CatalogTextView({ content }: CatalogTextViewProps) {
  if (!content || content.type !== "doc" || !hasVisibleText(content)) {
    return null
  }

  return (
    <div className={styles.root}>
      {content.content?.map((node, index) => renderNode(node, String(index)))}
    </div>
  )
}
