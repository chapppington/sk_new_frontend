"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import ReactLenis from "lenis/react"
import { ViewTransitions } from "next-view-transitions"
import { type PropsWithChildren, useState } from "react"
import { Toaster } from "sonner"
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
      <Toaster
        position="top-center"
        theme="dark"
        duration={5000}
        toastOptions={{
          classNames: {
            success: "!bg-blue-600 !text-white !border-blue-500",
            error: "!bg-red-600 !text-white !border-red-500",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
