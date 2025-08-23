import * as THREE from "three";
import { useMemo } from "react";
import vertexSahder from '../shaders/simpleOutline.vert.glsl'
import fragmentShader from '../shaders/simpleOutline.frag.glsl' 
export function basicWF() {
  return useMemo(()=>{
      return new THREE.ShaderMaterial({
        depthWrite: false,
        depthTest: true,
        transparent: true,
        fragmentShader: fragmentShader,
        vertexShader: vertexSahder,
      });
  
    },[]);
}