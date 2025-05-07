import { useLoader } from '@react-three/fiber'
import {DRACOLoader, GLTFLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'
import {useEffect} from "react";
// import {addBarycentricCoordinates} from "../../tools/geom.js";
import {useAnimations} from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { WfThrough } from './materials/WfThrough.jsx';
import { WfFar } from './materials/WfFar.jsx';
import { WfMid } from './materials/WfMid.jsx';
import  WfMain  from './materials/mainShader.jsx'
import { WfMid2 } from './materials/WfMid2.jsx';

export default function Scene(){

  const customShader = WfThrough();
  const customShaderTest = WfMid();
  const customShaderTest2 = WfMid2();
  const scene = new THREE.Scene();
  // const mainShader = new WfMain({
  //   wireframe: false,
  //   сolor: new THREE.Vector3(0.502, 0.502, 0.502),
  // });
  // const geometry = new THREE.BoxGeometry(1,1,1);
  // const material123 = new THREE.MeshBasicMaterial( { color: 0x00A300 } );
    
  const [gltf,terrain] = useLoader(GLTFLoader,['/lab12354.glb','/terrain.glb'],(loader)=>{
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader)
  });
  
  console.log(gltf);
  console.log(terrain);
  
  
  useEffect(() => {
    gltf.scene.traverse((node) => {
      node.material = customShaderTest
      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [gltf,customShaderTest]);
  useEffect(() => {
    terrain.scene.traverse((node) => {
      node.material = customShaderTest2
      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [terrain,customShaderTest]);
  scene.add(gltf.scene);
  scene.add(terrain.scene);
  

  useEffect(() => {
    THREE.Cache.clear() // Очищаем кэш загрузчика
  }, [])

  const particles = {};
  particles.geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(5000 * 3);
  for(let i = 0; i < 5000; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 500;      //x
    positions[i * 3 + 1] = (Math.random() - 0.5) * 150;  //y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;  //z
}
  particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  particles.material = new THREE.ShaderMaterial({
    transparent: true,
            uniforms:
            {
                uColor: { value: new THREE.Color(0xffe600) },
                uAlpha: { value: 1 },
                uTime: { value: 0 },
                uWind: { value:  - 0.0008 } // - 0.0008
            },
            vertexShader: `
    #define M_PI 3.1415926535897932384626433832795

    uniform float uTime;
    uniform float uWind;

    varying float vAlpha;

    highp float random(vec2 co)
    {
        highp float a = 12.9898;
        highp float b = 78.233;
        highp float c = 43758.5453;
        highp float dt = dot(co.xy, vec2(a, b));
        highp float sn = mod(dt, M_PI);

        return fract(sin(sn) * c);
    }

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        float windEffect = uWind * (random(modelPosition.yz) + 0.5);
        modelPosition.x += uTime * windEffect * 10.0;
        modelPosition.y += sin(modelPosition.x * 0.1 + uTime) * 0.5;
        vec4 viewPosition = viewMatrix * modelPosition;
        float distance = distance(vec4(0.0, 0.0, 0.0, 0.0), viewPosition);

        gl_PointSize = 4.0 - clamp((distance - 1.0) * 0.5, 0.0, 2.0);
        gl_Position = projectionMatrix * viewPosition;

        
        vAlpha = 1.0 - clamp(distance * 0.5 / 100.0, 0.0, 1.0);
    }
`,
            fragmentShader: `
                uniform vec3 uColor;
                uniform float uAlpha;

                varying float vAlpha;

                void main()
                {
                    gl_FragColor = vec4(uColor, vAlpha * uAlpha);
                    // gl_FragColor = vec4(uColor, 1.0);
                }
            `
  })
  particles.points = new THREE.Points(particles.geometry, particles.material);
  particles.points.frustumCulled = false;
  console.log(particles);
  scene.add(particles.points);
  
  useFrame(({clock})=>{
    const progress = Math.min(1, clock.getElapsedTime()/5)
    customShader.uniforms.uProgress.value = progress;
    customShader.uniforms.time.value = clock.getElapsedTime();
    customShaderTest.uniforms.uTime.value = clock.getElapsedTime()*1.2;
    particles.material.uniforms.uTime.value = clock.getElapsedTime()*1.2;
    particles.geometry.attributes.position.needsUpdate = true;
    
  })
  const { actions, names } = useAnimations(gltf.animations, gltf.scene)

  useEffect(() => {
    // Play all animations
    names.forEach((name) => {
      actions[name].reset().play()
    })
  }, [actions, names])
  
  


  return (
  <primitive object={scene}/>
  )

}

