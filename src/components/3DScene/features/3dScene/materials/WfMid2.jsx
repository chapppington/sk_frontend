import * as THREE from "three";
import { useMemo } from "react";
import vertexSahder from '../shaders/v2WF.vert.glsl'
import fragmentShader from '../shaders/v2WF.frag.glsl' 
export function WfMid2() {
  return useMemo(()=>{
      return new THREE.ShaderMaterial({
        wireframe: false,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        uniforms:
            {
                uTime: { value: 0 },

                uColor: { value: new THREE.Vector3(1,1,1) },

                uRevealPosition: { value: new THREE.Vector3(1, 1, 1) },
                uRevealDistance: { value: 100.0 },

                uAlpha: { value: 0.03 },

                uFluctuationFrequency: { value: 0.0 },
                uFluctuationAmplitude: { value: 0.0 }
            },
        fragmentShader: fragmentShader,
        vertexShader: vertexSahder,
      });
  
    },[]);
}