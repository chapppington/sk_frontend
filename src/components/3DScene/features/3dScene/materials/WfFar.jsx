import * as THREE from "three";
import { useMemo } from "react";
import vertexSahder from '../shaders/wireframe.vert.glsl'
import fragmentShader from '../shaders/wireframe.frag.glsl' 


export function WfFar() {
  return useMemo(()=>{
      return new THREE.ShaderMaterial({
        extensions: {
          derivatives: true,
        },
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          time: { value: 0 },
          fill: { value: new THREE.Color("#0f0d1f") },
          stroke: { value: new THREE.Color("#747480") },
          noiseA: { value: false },
          noiseB: { value: false },
          dualStroke: { value: false },
          seeThrough: { value: true },
          insideAltColor: { value: true },
          thickness: { value: 0.01 },
          secondThickness: { value: 0.1 },
          dashEnabled: { value: true },
          dashRepeats: { value: 1 },
          dashOverlap: { value: true },
          dashLength: { value: 0.4 },
          dashAnimate: { value: true },
          squeeze: { value: true },
          squeezeMin: { value: 0.01 },
          squeezeMax: { value: 0.3 },
          uProgress: { value: 0 },
          uDissolveScale: { value: 30.0 },
        },
        fragmentShader: fragmentShader,
        vertexShader: vertexSahder,
      });
  
    },[]);
}