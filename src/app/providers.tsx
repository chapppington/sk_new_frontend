"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ReactLenis from "lenis/react"
import { ViewTransitions } from "next-view-transitions"
import { type PropsWithChildren, useState } from "react"
import { PageTransitionProvider } from "@/context/PageTransitionProvider"
import { WebGLProvider } from "@/context/WebGLProvider"

export function Providers({ children }: PropsWithChildren) {
  const [client] = useState(new QueryClient())

  return (
    <QueryClientProvider client={client}>
      <WebGLProvider>
        <ViewTransitions>
          <PageTransitionProvider>
            <ReactLenis
              root
              options={{
                lerp: 0.16,
                wheelMultiplier: 1,
                smoothWheel: true,
                orientation: "vertical",
                gestureOrientation: "vertical",
                infinite: false,
                syncTouch: true,
              }}
            >
              {children}
            </ReactLenis>
          </PageTransitionProvider>
        </ViewTransitions>
      </WebGLProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
