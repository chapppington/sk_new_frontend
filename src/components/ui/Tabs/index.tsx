import gsap from "gsap"
import { useLenis } from "lenis/react"
import {
  Children,
  createContext,
  type FC,
  isValidElement,
  type ReactElement,
  useEffect,
  useRef,
  useState,
} from "react"
import { TabButton } from "./components/TabButton"
import { TabContent } from "./components/TabContent"
import type { TabContentProps } from "./components/TabContent/types"
import { TabLine } from "./components/TabLine"
import type { TabsContextType, TabsProps } from "./types"

const TabsContext = createContext<TabsContextType | null>(null)

export const Tabs: FC<TabsProps> = ({
  children,
  defaultTab,
  onChange,
  size,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab)
  const lineRef = useRef<HTMLDivElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  const handleTabClick = (value: string) => {
    if (lineRef.current && tabsContainerRef.current) {
      const tabsElements = Array.from(tabsContainerRef.current.children)
      const targetTab = tabsElements.find(
        (tab) => tab.getAttribute("data-value") === value,
      ) as HTMLElement

      // Only animate if targetTab is found
      if (targetTab) {
        const targetRect = targetTab.getBoundingClientRect()
        const containerRect = tabsContainerRef.current.getBoundingClientRect()

        gsap.to(lineRef.current, {
          x: targetRect.left - containerRect.left,
          width: targetRect.width,
          duration: 0.1,
          ease: "power2.inOut",
        })
      }
    }
    setActiveTab(value)
    onChange?.(value)

    // Resize Lenis after tab change
    if (lenis) {
      setTimeout(() => {
        lenis.resize()
      }, 50)
    }
  }

  useEffect(() => {
    if (lineRef.current && tabsContainerRef.current) {
      const tabsElements = Array.from(tabsContainerRef.current.children)
      const targetTab = tabsElements.find(
        (tab) => tab.getAttribute("data-value") === activeTab,
      ) as HTMLElement

      // Only set initial position if targetTab is found
      if (targetTab) {
        const targetRect = targetTab.getBoundingClientRect()
        const containerRect = tabsContainerRef.current.getBoundingClientRect()

        gsap.set(lineRef.current, {
          x: targetRect.left - containerRect.left,
          width: targetRect.width,
        })
      }
    }
  }, [])

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>
        <div
          ref={tabsContainerRef}
          className="relative flex border-b border-white/20"
        >
          {Children.map(children, (child) => {
            if (isValidElement(child) && child.type === TabContent) {
              const contentChild = child as ReactElement<TabContentProps>
              return (
                <TabButton
                  key={contentChild.props.value}
                  value={contentChild.props.value}
                  label={contentChild.props.label}
                  isActive={activeTab === contentChild.props.value}
                  onClick={handleTabClick}
                  size={size}
                />
              )
            }
            return null
          })}
          <TabLine lineRef={lineRef} />
        </div>
        <div className="py-4">
          {Children.map(children, (child) => {
            if (isValidElement(child) && child.type === TabContent) {
              const contentChild = child as ReactElement<TabContentProps>
              return activeTab === contentChild.props.value
                ? contentChild.props.children
                : null
            }
            return null
          })}
        </div>
      </div>
    </TabsContext.Provider>
  )
}
export { TabContent }
