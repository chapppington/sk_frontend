import * as THREE from "three";
import { useMemo } from "react";
import vertexSahder from '../shaders/worldWF.vert.glsl'
import fragmentShader from '../shaders/v2WF.frag.glsl' 
export function worldWireframe() {
  return useMemo(()=>{
      return new THREE.ShaderMaterial({
        wireframe: false,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        
        uniforms:
            {
                uTime: { value: 0 },

                uColor: { value: new THREE.Vector3(1, 1, 1) },

                uRevealPosition: { value: new THREE.Vector3(1, 1, 1) },
                uRevealDistance: { value: 1000.0 },

                uAlpha: { value: 0.05 },

                uFluctuationFrequency: { value: 1.0 },
                uFluctuationAmplitude: { value: 1.0 }
            },
        fragmentShader: fragmentShader,
        vertexShader: vertexSahder,
      });
  
    },[]);
}