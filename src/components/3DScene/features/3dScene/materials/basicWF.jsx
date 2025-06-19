import * as THREE from "three";
import { useMemo } from "react";
import vertexSahder from '../shaders/simpleOutline.vert.glsl'
import fragmentShader from '../shaders/simpleOutline.frag.glsl' 
export function basicWF() {
  return useMemo(()=>{
      return new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: true,
        side: THREE.DoubleSide,
        uniforms:
            {
                uColor: { value: new THREE.Color(0x0f0d1f) },  // Blue main color
            },
        fragmentShader: fragmentShader,
        vertexShader: vertexSahder,
      });
  
    },[]);
}