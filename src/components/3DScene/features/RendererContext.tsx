"use client"

import {
  createContext,
  type ReactNode,
  useContext,
  useRef,
  useState,
} from "react"
import type * as THREE from "three"

interface RendererContextType {
  renderer: THREE.WebGLRenderer | null
}

const RendererContext = createContext<RendererContextType | undefined>(
  undefined,
)

export const RendererProvider = ({ children }: { children: ReactNode }) => {
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  return (
    <RendererContext.Provider value={{ renderer: rendererRef.current }}>
      {children}
    </RendererContext.Provider>
  )
}

export const useRendererContext = () => useContext(RendererContext)
