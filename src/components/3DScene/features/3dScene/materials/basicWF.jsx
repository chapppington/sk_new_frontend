import { useMemo } from "react"
import * as THREE from "three"
import fragmentShader from "../shaders/simpleOutline.frag.glsl"
import vertexSahder from "../shaders/simpleOutline.vert.glsl"
export function basicWF() {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      depthWrite: false,
      depthTest: true,
      transparent: true,
      fragmentShader: fragmentShader,
      vertexShader: vertexSahder,
    })
  }, [])
}
