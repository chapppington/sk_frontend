import { useLoader } from '@react-three/fiber'
import {DRACOLoader, GLTFLoader, OBJLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'
import {useEffect, useMemo, useRef} from "react";
import Stats from 'three/examples/jsm/libs/stats.module.js';
// import {addBarycentricCoordinates} from "../../tools/geom.js";
import {useAnimations} from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { WfThrough } from './materials/WfThrough.jsx';
import { WfFar } from './materials/WfFar.jsx';
import { WfMid } from './materials/WfMid.jsx';
import  WfMain  from './materials/mainShader.jsx'
import { WfMid2 } from './materials/WfMid2.jsx';
import gsap from 'gsap';
import { Power1,Power4 } from 'gsap/all';
import buildingsList from '@public/buildings.json';
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

export default function Scene(){

   const isFirstRender = useRef(true);

  // TODO: Добавить кастомные шейдеры для мелких объектов (Машины, рельсы)
  
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
    
  const [terrain,gltf,env,cars,logo,road,main] = useLoader(GLTFLoader,[
    '/Scene/buildings.glb',
    '/Scene/walls.glb',
    '/Scene/env.glb',
    '/Scene/cars.glb',
    '/Scene/logo.glb',
    '/Scene/road.glb',
    '/Scene/main.glb'
  ],(loader)=>{
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader)
  });
  const [build_b,build_c,build_d,build_e] = useLoader(GLTFLoader,[
    '/Scene/buildings/build_b.glb',
    '/Scene/buildings/build_c.glb',
    '/Scene/buildings/build_d.glb',
    '/Scene/buildings/build_e.glb'
  ],(loader)=>{
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderConfig({ type: 'js' });
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(dracoLoader)
  }); 

  console.log(gltf);
  console.log(terrain);


  // TODO: Дописать блок для создания инстансов зданий

  const buildings = [build_b, build_c, build_d, build_e];
  // console.log(buildings);

  // const instances = [];
  // const dummy = new THREE.Object3D();
  // const count = buildingsList.length;
  // //Создание инстансов
  // buildings.forEach((building, index) => {
  //   const instanceCount = Math.floor(buildingsList.length/buildings.length);
  //   const geometry = building.scene.children[0].geometry;
  //   const material = building.scene.children[0].material;
  //   const instanceMesh = new THREE.InstancedMesh(geometry, material, instanceCount);
  //   scene.add(instanceMesh);
  //   instances.push(instanceMesh);

  // })
  // // распределение инстансов по сцене
  // const shuffledPositions = [...buildingsList].sort(() => Math.random() - 0.5);
  // let positionIndex = 0;
  // console.log(shuffledPositions);
  // instances.forEach((instanceMesh, index) => {
  //   for(let i =0;i<instanceMesh.count;i++){
  //     if (positionIndex >= shuffledPositions.length) break;
  //     const position = shuffledPositions[positionIndex].position;
  //     dummy.position.set(position.x,position.y,position.z);
  //     // dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
  //     dummy.updateMatrix();
  //     instanceMesh.setMatrixAt(i, dummy.matrix);
  //     positionIndex++;
  //   }
  //   instanceMesh.instanceMatrix.needsUpdate = true;

  // })

useEffect(() => {
  // Массив для хранения геометрии
  const geometriesToMerge = [];
  
  terrain.scene.traverse((node) => {
    if (node.isLineSegments) {
      // Клонируем геометрию с учетом мировой матрицы
      const geometry = node.geometry.clone();
      geometry.applyMatrix4(node.matrixWorld);
      geometriesToMerge.push(geometry);
      
      // Делаем исходный объект невидимым
      node.visible = false;
    }
  });

  if (geometriesToMerge.length > 0) {
    // Объединяем все геометрии в одну
    const mergedGeometry = BufferGeometryUtils.mergeGeometries(geometriesToMerge);
    
    // Создаем один большой LineSegments объект
    const mergedLines = new THREE.LineSegments(
      mergedGeometry,
      customShaderTest2
    );
    
    // Добавляем объединенный объект в сцену
    terrain.scene.add(mergedLines);
    console.log(mergedLines)
  }
  
}, [terrain, customShaderTest2]);









  

   const renderer = new THREE.WebGLRenderer();
  let gl = renderer.getContext();
    let debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    let vendor='unk';
    let gpu = 'unk';
    try {
         vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
         gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    } catch (err) {
    }
    console.log(vendor, gpu);
  
  // terrain.scene.position.set(0,-1000,0);
  
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
    main.scene.traverse((node) => {
      node.material = customShaderTest
      
      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [gltf,customShaderTest]);
  useEffect(() => {
    logo.scene.traverse((node) => {
      node.material = customShaderTest
      
      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [gltf,customShaderTest]);
  useEffect(() => {
    env.scene.traverse((node) => {
      node.material = customShaderTest
      
      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [env,customShaderTest]);
  // useEffect(() => {
  //   terrain.scene.traverse((node) => {
  //     node.material = customShaderTest2
      
  //     // mesh.position.copy(node.position);
  //     // mesh.rotation.copy(node.rotation);
  //     // mesh.scale.copy(node.scale);
  //     // scene.add(mesh);
  //   });
  // }, [terrain,customShaderTest]);
  useEffect(() => {
    road.scene.traverse((node) => {
      node.material = customShaderTest
      
      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [road,customShaderTest]);
  useEffect(() => {
    cars.scene.traverse((node) => {
      node.material = customShaderTest2
      
      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [cars,customShaderTest]);


  scene.add(gltf.scene);
  // Террейн выключен из-за ненадобности
  // scene.add(terrain.scene);
  // TODO: Изменить визуально сцену
  scene.add(env.scene);
  scene.add(cars.scene);
  scene.add(logo.scene);
  scene.add(road.scene);
  scene.add(main.scene);
  scene.add(terrain.scene);
  
  

 

//   const particles = {};
//   particles.geometry = new THREE.BufferGeometry();
//   const positions = new Float32Array(5000 * 3);
//   for(let i = 0; i < 5000; i++) {
//     positions[i * 3] = (Math.random() - 0.5) * 500;      //x
//     positions[i * 3 + 1] = (Math.random() - 0.5) * 150;  //y
//     positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;  //z
// }
//   particles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

//   particles.material = new THREE.ShaderMaterial({
//     transparent: true,
//             uniforms:
//             {
//                 uColor: { value: new THREE.Color(0xffe600) },
//                 uAlpha: { value: 1 },
//                 uTime: { value: 0 },
//                 uWind: { value:  - 0.0008 } // - 0.0008
//             },
//             vertexShader: `
//     #define M_PI 3.1415926535897932384626433832795

//     uniform float uTime;
//     uniform float uWind;

//     varying float vAlpha;

//     highp float random(vec2 co)
//     {
//         highp float a = 12.9898;
//         highp float b = 78.233;
//         highp float c = 43758.5453;
//         highp float dt = dot(co.xy, vec2(a, b));
//         highp float sn = mod(dt, M_PI);

//         return fract(sin(sn) * c);
//     }

//     void main()
//     {
//         vec4 modelPosition = modelMatrix * vec4(position, 1.0);
//         float windEffect = uWind * (random(modelPosition.yz) + 0.5);
//         modelPosition.x += uTime * windEffect * 10.0; 
//         modelPosition.y += sin(modelPosition.x * 0.1 + uTime) * 0.5;
//         vec4 viewPosition = viewMatrix * modelPosition;
//         float distance = distance(vec4(0.0, 0.0, 0.0, 0.0), viewPosition);

//         gl_PointSize = 1.0 - clamp((distance - 1.0) * 0.5, 0.0, 2.0);
//         gl_Position = projectionMatrix * viewPosition;

        
//         vAlpha = 1.0 - clamp(distance * 0.5 / 100.0, 0.0, 1.0);
//     }
// `,
//             fragmentShader: `
//                 uniform vec3 uColor;
//                 uniform float uAlpha;

//                 varying float vAlpha;

//                 void main()
//                 {
//                     gl_FragColor = vec4(uColor, vAlpha * uAlpha);
//                     // gl_FragColor = vec4(uColor, 1.0);
//                 }
//             `
//   })
//   particles.points = new THREE.Points(particles.geometry, particles.material);
//   particles.points.frustumCulled = false;
//   console.log(particles);
//   scene.add(particles.points);
  
  useFrame(({clock})=>{
    const progress = Math.min(1, clock.getElapsedTime()/5)
    customShader.uniforms.uProgress.value = progress;
    customShader.uniforms.time.value = clock.getElapsedTime();
    customShaderTest.uniforms.uTime.value = clock.getElapsedTime()*1.2;
    customShaderTest2.uniforms.uTime.value = clock.getElapsedTime()*1.2;
    // particles.material.uniforms.uTime.value = clock.getElapsedTime()*1.2;
    // particles.geometry.attributes.position.needsUpdate = true;
    
  })
  const mainAnimations = useAnimations(main.animations, main.scene);
  const roadAnimations = useAnimations(road.animations, road.scene);
  const carsAnimations = useAnimations(cars.animations, cars.scene);

  useEffect(() => {
    // Play all animations
    mainAnimations.names.forEach((name) => {
    mainAnimations.actions[name].reset().play();
    });
    carsAnimations.names.forEach((name) => {
    carsAnimations.actions[name].reset().play();
    });
    roadAnimations.names.forEach((name) => {
    roadAnimations.actions[name].reset().play();
    });



  }, [mainAnimations,carsAnimations])

  useEffect(() => {  
    if (isFirstRender.current) {
      const tl = gsap.timeline();
      tl.to(customShaderTest.uniforms.uRevealDistance, {
        value: 1,
        duration: 1.5,
        delay: 0,
        ease: Power4.easeOut
      },0)
      .to(customShaderTest.uniforms.uFluctuationFrequency, {
        value: 1,
        duration: 0,
        delay: 0,
      },2)
      .to(customShaderTest.uniforms.uFluctuationAmplitude, {
        value: 1,
        duration: 0,
        delay: 0,
      },2)
      .to(customShaderTest.uniforms.uColor.value, {
        x: 1, y: 1, z: 1,
        duration: 2,
        ease: Power1.easeOut
      },2.0)
      .to(terrain.scene.position, {
        y: 0,
        duration: 3,
        delay: 0,
        ease: Power4.easeOut
      },0.5)
      .to(customShaderTest2.uniforms.uRevealDistance, {
        value: 1,
        duration: 5,
        delay: 0,
        ease: Power4.easeOut
      },0.5)
      .to(customShaderTest2.uniforms.uFluctuationFrequency, {
        value: 1,
        duration: 0,
        delay: 0,
      },6)
      .to(customShaderTest2.uniforms.uFluctuationAmplitude, {
        value: 1,
        duration: 0,
        delay: 0,
      },6)

      // .to(customShaderTest2.uniforms.uColor.value, {
      //   x: 1, y: 1, z: 1,
      //   duration: 2,
      //   ease: Power1.easeOut
        
      // },4.0);

      // Отмечаем, что первый рендер прошел
      isFirstRender.current = false;
      
    }
  }, [customShaderTest]);
  useEffect(() => {
    if (isFirstRender.current) {
      // Создаем timeline
      const tl = gsap.timeline();
     
      

      // Отмечаем, что первый рендер прошел
      isFirstRender.current = false;
    }
  }, [customShaderTest2]);
  
  


  return (
  <primitive object={scene}/>
  )

}

