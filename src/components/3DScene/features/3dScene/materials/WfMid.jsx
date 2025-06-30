import * as THREE from "three";
import { useMemo } from "react";
import vertexSahder from "../shaders/worldWF.vert.glsl";
import fragmentShader from "../shaders/v2WF.frag.glsl";
export function WfMid() {
  return useMemo(() => {
    return new THREE.ShaderMaterial({
      wireframe: true,
      transparent: false,
      depthTest: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },

        uColor: { value: new THREE.Vector3(0.059, 0.051, 0.122) },

        uRevealPosition: { value: new THREE.Vector3(1, 1, 1) },
        uRevealDistance: { value: 1000.0 },

        uAlpha: { value: 1.0 },

        uFluctuationFrequency: { value: 0.0 },
        uFluctuationAmplitude: { value: 0.0 },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexSahder,
    });
  }, []);
}
