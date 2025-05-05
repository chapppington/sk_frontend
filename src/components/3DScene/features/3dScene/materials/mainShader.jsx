import * as THREE from 'three';
import vertexShader from '../shaders/v2WF.vert.glsl'
import fragmentShader from '../shaders/v2WF.frag.glsl' 

export default class WfMain {
    constructor(options = {} ) {
        const materialOptions = {
            uniforms: {
                uTime: { value: 0 },
                
                                uColor: options.color ?? { value: new THREE.Vector3(1, 1, 1) },
                
                                uRevealPosition: { value: new THREE.Vector3(0, 0, 0) },
                                uRevealDistance: { value: 1.0 },
                
                                uAlpha: { value: 1 },
                
                                uFluctuationFrequency: { value: 1.0 },
                                uFluctuationAmplitude: { value: 1.0 }
            },
            wireframe: options.wireframe ?? false,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        };
        
        
    }
}