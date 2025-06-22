import { useLoader } from "@react-three/fiber";
import {
  DRACOLoader,
  GLTFLoader,
  OBJLoader,
} from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { useAnimations, Wireframe, MeshWobbleMaterial, useStencil, Mask, useMask } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { WfThrough } from "./materials/WfThrough.jsx";
import { WfFar } from "./materials/WfFar.jsx";
import { WfMid } from "./materials/WfMid.jsx";
import { WfMid2 } from "./materials/WfMid2.jsx";
import { worldWireframe } from "./materials/worldWirframe.jsx";
import gsap from "gsap";
import { Power1, Power4 } from "gsap/all";
import buildingsList from "@public/buildings.json";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
import {basicWF} from "./materials/basicWF.jsx";


export default function Scene() {
  const isFirstRender = useRef(true);
  
  // TODO: Добавить кастомные шейдеры для мелких объектов (Машины, рельсы)
  // TODO: Использовать маски для отрисовки конвейера из React Drei 
  const customShader = WfThrough();
  const customShaderTest = WfMid();
  const customShaderTest2 = WfMid2();
  const worldMaterial = worldWireframe();
  const basicMaterial = basicWF();
  const scene = new THREE.Scene();

 

  // const mainShader = new WfMain({
  //   wireframe: false,
  //   сolor: new THREE.Vector3(0.502, 0.502, 0.502),
  // });
  // const geometry = new THREE.BoxGeometry(1,1,1);
  // const material123 = new THREE.MeshBasicMaterial( { color: 0x00A300 } );
  const texture = useLoader(THREE.TextureLoader, "/Scene/testTexture.png");
  const [terrain, gltf, env, cars, logo, road, main, wallsOut, invisible, lenta, lenta2, main_static] = useLoader(
    GLTFLoader,
    [
      "/Scene/buildings.glb",
      "/Scene/walls2.glb",
      "/Scene/env.glb",
      "/Scene/cars.glb",
      "/Scene/logo.glb",
      "/Scene/road.glb",
      "/Scene/main_active_mesh.glb",
      "/Scene/wallsOut.glb",
      "/Scene/invisible.glb",
      "/Scene/lenta.glb",
      "/Scene/lenta2.glb",
      "/Scene/main_static.glb",
    ],
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderConfig({ type: "js" });
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      loader.setDRACOLoader(dracoLoader);
    }
  );

  console.log(main.scene);
  console.log(terrain);

  const lentaMaterial = new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 }
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            uv.y = mod(-uv.y + uTime * 0.1, 1.0); 
            vec4 texColor = texture2D(uTexture, uv);
            gl_FragColor = texColor;
          }
        `
      });
  const materialASD = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ffffff"),
    wireframe: true,
    transparent: true,
    opacity: 0.00,
    side: THREE.DoubleSide,
  });

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
        node.renderOrder = 2;
      }
    });

    if (geometriesToMerge.length > 0) {
      // Объединяем все геометрии в одну
      const mergedGeometry =
        BufferGeometryUtils.mergeGeometries(geometriesToMerge);

      // Создаем один большой LineSegments объект
      const mergedLines = new THREE.LineSegments(mergedGeometry, worldMaterial);

      // Добавляем объединенный объект в сцену
      terrain.scene.add(mergedLines);
      console.log(mergedLines);
    }
  }, [terrain, worldMaterial]);

  // const renderer = new THREE.WebGLRenderer();
  // let gl = renderer.getContext();
  // let debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
  // let vendor = "unk";
  // let gpu = "unk";
  // try {
  //   vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
  //   gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  // } catch (err) {}
  // console.log(vendor, gpu);

  // terrain.scene.position.set(0,-1000,0);
  //TODO: БЛЯТЬ Я не знаю как сделать так чтобы оно рендерилось
  // непрзрачно для обеих сторон
  useEffect(() => {
      gltf.scene.traverse((node) => {
        node.renderOrder = 1;     
        node.material = basicMaterial;
      });
  }, [gltf, basicMaterial]);
  useEffect(() => {
    main_static.scene.traverse((node) => {
      node.material = customShaderTest2;
      node.renderOrder = 2;

      // mesh.position.copy(node.position);
      // mesh.rotation.copy(node.rotation);
      // mesh.scale.copy(node.scale);
      // scene.add(mesh);
    });
  }, [main_static, customShaderTest2]);
  useEffect(() => {
    main.scene.traverse((node) => {
      node.material = materialASD;
      node.renderOrder = 2;
    });
  }, [main, materialASD]);
  useEffect(() => {
    logo.scene.traverse((node) => {
      node.material = customShaderTest2;
    });
  }, [gltf, customShaderTest2]);
  useEffect(() => {
    env.scene.traverse((node) => {
      node.material = worldMaterial;

    });
  }, [env, worldMaterial]);
  useEffect(() => {
    road.scene.traverse((node) => {
      node.material = customShaderTest2;

      
    });
  }, [road, customShaderTest2]);
  useEffect(() => {
    cars.scene.traverse((node) => {
      node.material = customShaderTest2;

      
    });
  }, [cars, customShaderTest2]);
  useEffect(() => {
    wallsOut.scene.traverse((node) => {
      node.material = customShaderTest2;

      
    });
  }, [wallsOut, customShaderTest2]);
  useEffect(() => {
    lenta.scene.traverse((node) => {
      node.material = lentaMaterial;
      

      
    });
  }, [lenta,lentaMaterial]);
  useEffect(() => {
    lenta2.scene.traverse((node) => {
      node.material = lentaMaterial;
      

      
    });
  }, [lenta2,lentaMaterial]);
  const uniforms = {
    uTexture: { value: texture},
    uTime: { value: 0 }
  }

  invisible.scene.position.y = 6;
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
  scene.add(wallsOut.scene);
  scene.add(lenta.scene);
  scene.add(lenta2.scene);
  scene.add(main_static.scene);
  

  

  useFrame(({ clock }) => {
    const progress = Math.min(1, clock.getElapsedTime() / 5);
    customShader.uniforms.uProgress.value = progress;
    customShader.uniforms.time.value = clock.getElapsedTime();
    customShaderTest.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    customShaderTest2.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    worldMaterial.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    lentaMaterial.uniforms.uTime.value = clock.getElapsedTime() * 10.2;
    // particles.material.uniforms.uTime.value = clock.getElapsedTime()*1.2;
    // particles.geometry.attributes.position.needsUpdate = true;
  });
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
  }, [mainAnimations, carsAnimations]);

  useEffect(() => {
    if (isFirstRender.current) {
      const tl = gsap.timeline();
      tl.to(
        customShaderTest.uniforms.uRevealDistance,
        {
          value: 1,
          duration: 1.5,
          delay: 0,
          ease: Power4.easeOut,
        },
        0
      );
      tl.to(
        worldMaterial.uniforms.uRevealDistance,
        {
          value: 1,
          duration: 1.5,
          delay: 0,
          ease: Power4.easeOut,
        },
        0
      )
        .to(
          terrain.scene.position,
          {
            y: 0,
            duration: 3,
            delay: 0,
            ease: Power4.easeOut,
          },
          0.5
        )
        .to(
          customShaderTest2.uniforms.uRevealDistance,
          {
            value: 1,
            duration: 5,
            delay: 0,
            ease: Power4.easeOut,
          },
          0.5
        )
        .to(
          materialASD,
          {
            opacity: 0.03,
            duration: 5,
            delay: 3,
            ease: Power4.easeOut,
          },
          0.5
        )
        .to(
          customShaderTest2.uniforms.uFluctuationFrequency,
          {
            value: 1,
            duration: 0,
            delay: 0,
          },
          6
        )
        .to(
          customShaderTest2.uniforms.uFluctuationAmplitude,
          {
            value: 1,
            duration: 0,
            delay: 0,
          },
          6
        );

      // .to(customShaderTest2.uniforms.uColor.value, {
      //   x: 1, y: 1, z: 1,
      //   duration: 2,
      //   ease: Power1.easeOut

      // },4.0);

      // Отмечаем, что первый рендер прошел
      isFirstRender.current = false;
    }
  }, [customShaderTest]);
  

  return (
    <>
    
      <primitive object={scene} />

    
    </>
  );
}
