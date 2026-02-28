"use client"

import { useState, useEffect, useRef } from "react"
import CustomContainer from "@/components/ui/CustomContainer"
import Questionnaire from "../Questionnaire"
import QuestionnaireLeftMenu from "../QuestionnaireLeftMenu"
import { initializeFormState } from "../../utils/initializeFormState"
import { IFormState } from "@/app/questionnaire/shared/types"
import { FeederData } from "../QuestionDropdown/components/FeederSectionOption/types"
import { useLenis } from "lenis/react"
import { QuestionnaireWrapperProps } from "./types"

export default function QuestionnaireWrapper({
  questions,
  stages,
  questionnaireType,
  title = "Опросный лист",
  subtitle,
  breadcrumbLabel = "Опросный лист",
}: QuestionnaireWrapperProps) {
  const [activeStage, setActiveStage] = useState(1)
  const [formState, setFormState] = useState<IFormState>(() =>
    initializeFormState(questions),
  )
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const isInitialLoad = useRef(true)
  const lenis = useLenis()
  const isScrolling = useRef(false)

  const handleStateChange = (
    key: number,
    value: string | number | string[] | Record<string, FeederData[]>,
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }))
  }

  const handleSuccess = () => {
    setFormState(initializeFormState(questions))
    setActiveStage(1)
  }

  const scrollToStage = (stageIndex: number) => {
    const targetRef = stageRefs.current[stageIndex - 1]
    if (targetRef && lenis) {
      isScrolling.current = true
      setActiveStage(stageIndex)
      lenis.scrollTo(targetRef, {
        offset: -100,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isScrolling.current = false
        },
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (isInitialLoad.current || isScrolling.current) return

      const viewportHeight = window.innerHeight
      const scrollThreshold = viewportHeight * 0.3 // Increased threshold for better detection

      let newActiveStage = activeStage

      stageRefs.current.forEach((ref, index) => {
        if (!ref) return

        const rect = ref.getBoundingClientRect()
        const elementTop = rect.top
        const elementBottom = rect.bottom

        // Check if the element is in the viewport threshold area
        if (elementTop <= scrollThreshold && elementBottom >= 0) {
          newActiveStage = index + 1
        }
      })

      if (newActiveStage !== activeStage) {
        setActiveStage(newActiveStage)
      }
    }

    // Add throttling to prevent too frequent updates
    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll)

    const timer = setTimeout(() => {
      isInitialLoad.current = false
    }, 100)

    return () => {
      window.removeEventListener("scroll", throttledScroll)
      clearTimeout(timer)
    }
  }, [activeStage])

  return (
    <main className="text-white pb-24">
      <CustomContainer>
        <div className="flex flex-col lg:flex-row gap-10">
            <QuestionnaireLeftMenu
              activeStage={activeStage}
              setActiveStage={(stage) => {
                setActiveStage(stage)
                scrollToStage(stage)
              }}
              stages={stages}
              title={title}
              subtitle={subtitle}
              breadcrumbLabel={breadcrumbLabel}
            />

            {/* Right side */}
            <div className="w-full lg:w-1/2 pt-32 pr-4">
              <Questionnaire
                formState={formState}
                handleStateChange={handleStateChange}
                stageRefs={stageRefs}
                onSuccess={handleSuccess}
                questions={questions}
                questionnaireType={questionnaireType}
                title={title}
              />
            </div>
          </div>
      </CustomContainer>
    </main>
  )
}
