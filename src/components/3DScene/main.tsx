"use client"

import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"
import React, { Suspense, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import Camera3D from "@/components/3DScene/features/3dScene/Camera3D"
import { CameraProvider } from "./features/CameraContext"

const TempScene = dynamic(() => import("./features/3dScene/Scene"), {
  ssr: false,
})

const MainScene = React.memo(() => {
  const [dpr, setDpr] = useState(2)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Мемоизируем настройки Canvas
  const canvasSettings = useMemo(
    () => ({
      style: {
        height: "100vh",
        width: "100vw",
        position: "absolute" as const,
        top: 0,
      },
      camera: {
        position: [0, 0, 10] as [number, number, number],
        fov: 70,
        near: 10.1,
        far: 5000,
      },
      gl: {
        antialias: true,
        powerPreference: "high-performance" as const,
        stencil: false,
        depth: false,
        outputColorSpace: THREE.SRGBColorSpace,
        alpha: true,
      },
      dpr: [1, 2] as [number, number],
      scene: {
        background: new THREE.Color("#121f54"),
      },
    }),
    [],
  )

  return (
    <div className="app-container fixed -z-10">
      <div className="canvas-container pointer-events-auto">
        <Canvas
          ref={canvasRef}
          style={canvasSettings.style}
          camera={canvasSettings.camera}
          scene={canvasSettings.scene}
          gl={canvasSettings.gl}
          dpr={dpr}
        >
          <CameraProvider>
            <Suspense fallback={null}>
              <TempScene />
            </Suspense>
          </CameraProvider>
          <Camera3D />
        </Canvas>
      </div>
    </div>
  )
})

MainScene.displayName = "MainScene"

export default MainScene
