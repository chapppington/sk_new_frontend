import * as THREE from "three"
import { lentaVertexShader, lentaFragmentShader } from "../shaders/lentaShader"

export const createLentaMaterial = (texture: THREE.Texture) => {
  return new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#ffffff") },
    },
    vertexShader: lentaVertexShader,
    fragmentShader: lentaFragmentShader,
  })
}
