import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import type { FeederData } from "@/app/questionnaire/shared/components/QuestionDropdown/components/FeederSectionOption/types"
import type { QuestionnaireType } from "@/app/questionnaire/shared/components/Questionnaire/types"
import type {
  IFormState,
  IQuestion,
  IQuestionOption,
} from "@/app/questionnaire/shared/types"

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
})

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Roboto",
    fontSize: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
  },
  metaBlock: {
    marginBottom: 24,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  metaRow: {
    marginBottom: 4,
    fontSize: 10,
  },
  metaLabel: {
    fontWeight: 600,
  },
  questionBlock: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 12,
  },
  questionTitle: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 6,
  },
  answerText: {
    fontSize: 10,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: 600,
    marginTop: 10,
    marginBottom: 6,
  },
  feederRow: {
    flexDirection: "row",
    marginLeft: 16,
    marginBottom: 4,
    fontSize: 10,
    color: "#333",
  },
  feederLabel: {
    fontWeight: 600,
    width: 70,
  },
})

function findOptionLabel(
  options: IQuestionOption[] | undefined,
  value: string | number,
): string {
  if (!options) return String(value)
  for (const opt of options) {
    if (opt.value === value) return opt.label
    if (opt.nestedOptions) {
      const nested = findOptionLabel(opt.nestedOptions, value)
      if (nested !== String(value)) return `${opt.label}: ${nested}`
    }
  }
  return String(value)
}

function formatAnswer(question: IQuestion, answer: unknown): string {
  if (answer === undefined || answer === null || answer === "") return "—"
  if (Array.isArray(answer)) {
    if (answer.length === 0) return "—"
    return answer.map((v) => findOptionLabel(question.options, v)).join(", ")
  }
  if (typeof answer === "object" && answer !== null) {
    return "" // feeder_sections rendered separately
  }
  return findOptionLabel(question.options, answer as string | number)
}

const QUESTIONNAIRE_TYPE_LABELS: Record<QuestionnaireType, string> = {
  ktp: "КТП",
  krun: "КРУН/ЯКНО",
  kso: "КСО",
}

interface QuestionnaireClientData {
  name: string
  email: string
  phone: string
}

interface QuestionnairePdfDocumentProps {
  formState: IFormState
  questions: IQuestion[]
  questionnaireType: QuestionnaireType
  title: string
  clientData: QuestionnaireClientData
}

export function QuestionnairePdfDocument({
  formState,
  questions,
  questionnaireType,
  title,
  clientData,
}: QuestionnairePdfDocumentProps) {
  const visibleQuestions = questions.filter(
    (q) => !q.showIf || q.showIf(formState),
  )
  const generatedAt = new Date().toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Заполненный опросный лист</Text>
        <View style={styles.metaBlock}>
          <Text style={[styles.metaRow, styles.metaLabel]}>
            Тип опросного листа: {QUESTIONNAIRE_TYPE_LABELS[questionnaireType]}
          </Text>
          <Text style={styles.metaRow}>ФИО: {clientData.name || "—"}</Text>
          <Text style={styles.metaRow}>Email: {clientData.email || "—"}</Text>
          <Text style={styles.metaRow}>Телефон: {clientData.phone || "—"}</Text>
          <Text style={styles.metaRow}>Дата и время: {generatedAt}</Text>
        </View>
        {visibleQuestions.map((question) => {
          const answer = formState[question.id]
          const isFeederSections = question.type === "feeder_sections"

          if (
            isFeederSections &&
            typeof answer === "object" &&
            answer !== null
          ) {
            const feeder = answer as Record<string, FeederData[]>
            const hasData = Object.values(feeder).some((items) =>
              items?.some((i) => i.current || i.count),
            )
            return (
              <View key={question.id} style={styles.questionBlock}>
                <Text style={styles.questionTitle}>{question.title}</Text>
                {hasData ? (
                  Object.entries(feeder)
                    .sort(
                      ([a], [b]) =>
                        parseInt(a.replace("section-", ""), 10) -
                        parseInt(b.replace("section-", ""), 10),
                    )
                    .map(([sectionKey, items]) => {
                      const sectionNum = sectionKey.replace("section-", "")
                      const filledItems = items?.filter(
                        (i) => i.current || i.count,
                      )
                      if (!filledItems?.length) return null
                      return (
                        <View key={sectionKey}>
                          <Text style={styles.sectionHeader}>
                            Секция {sectionNum}
                          </Text>
                          {items?.map((item, idx) => (
                            <View key={idx} style={styles.feederRow}>
                              <Text style={styles.feederLabel}>
                                Фидер {idx + 1}:
                              </Text>
                              <Text>
                                {item.current || "—"} А — {item.count || "—"} шт
                              </Text>
                            </View>
                          ))}
                        </View>
                      )
                    })
                ) : (
                  <Text style={styles.answerText}>—</Text>
                )}
              </View>
            )
          }

          const displayValue = formatAnswer(question, answer)
          return (
            <View key={question.id} style={styles.questionBlock}>
              <Text style={styles.questionTitle}>{question.title}</Text>
              <Text style={styles.answerText}>{displayValue}</Text>
            </View>
          )
        })}
      </Page>
    </Document>
  )
}
