import { useLoader } from "@react-three/fiber";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { WfThrough } from "./materials/WfThrough.jsx";
import { WfMid } from "./materials/WfMid.jsx";
import { WfMid2 } from "./materials/WfMid2.jsx";
import { worldWireframe } from "./materials/worldWirframe.jsx";
import gsap from "gsap";
import { Power4 } from "gsap/all";
import { BufferGeometryUtils } from "three/examples/jsm/Addons.js";
import { basicWF } from "./materials/basicWF.jsx";

// TODO: Добавить мемоизацию для всех материалов
// TODO: Добавить в контекст камеры useMemo

// Utility function to merge geometries with the same material
const mergeGeometriesWithMaterial = (scene, material) => {
  const geometriesToMerge = [];

  scene.traverse((node) => {
    if (node.isMesh) {
      const geometry = node.geometry.clone();
      geometry.applyMatrix4(node.matrixWorld);
      geometriesToMerge.push(geometry);
      node.visible = false;
    }
  });

  if (geometriesToMerge.length > 0) {
    const mergedGeometry =
      BufferGeometryUtils.mergeGeometries(geometriesToMerge);
    const mergedMesh = new THREE.Mesh(mergedGeometry, material);
    scene.add(mergedMesh);
    return mergedMesh;
  }
  return null;
};

export default function Scene() {
  const isFirstRender = useRef(true);
  const { camera } = useThree();

  // TODO: Добавить кастомные шейдеры для мелких объектов (Машины, рельсы)
  const customShader = WfThrough();
  const customShaderTest = WfMid();
  const customShaderTest2 = WfMid2();
  const worldMaterial = worldWireframe();
  const basicMaterial = basicWF();
  const scene = new THREE.Scene();

  const texture = useLoader(THREE.TextureLoader, "/Scene/testTexture.png");
  // Optimize texture
  useEffect(() => {
    if (texture) {
      texture.generateMipmaps = true;
      texture.minFilter = THREE.LinearMipMapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 16;
      texture.needsUpdate = true;
    }
  }, [texture]);

  const [
    terrain,
    gltf,
    env,
    cars,
    logo,
    road,
    main,
    wallsOut,
    chairs,
    lenta,
    lenta2,
    main_static,
    road_cars,
  ] = useLoader(
    GLTFLoader,
    [
      "/Scene/buildings.glb",
      "/Scene/walls2.glb",
      "/Scene/env_union.glb",
      "/Scene/cars.glb",
      "/Scene/logo.glb",
      "/Scene/road_union.glb",
      "/Scene/main_active.glb",
      "/Scene/wallsOut.glb",
      "/Scene/chairs_union.glb",
      "/Scene/lenta.glb",
      "/Scene/lenta2.glb",
      "/Scene/main_union.glb",
      "/Scene/road_cars.glb",
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
  const fadeinMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
    },
  });
  const lentaMaterial = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: {
      uTexture: { value: texture },
      uTime: { value: 0 },
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
        `,
  });
  const materialASD = new THREE.MeshBasicMaterial({
    color: new THREE.Color("#ffffff"),
    wireframe: true,
    transparent: true,
    opacity: 0.03,
    side: THREE.FrontSide,
  });

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
      node.material = worldMaterial;
    });
  }, [road, customShaderTest2]);
  useEffect(() => {
    cars.scene.traverse((node) => {
      node.material = customShaderTest2;
      node.renderOrder = 1;
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
  }, [lenta, lentaMaterial]);
  useEffect(() => {
    lenta2.scene.traverse((node) => {
      node.material = lentaMaterial;
    });
  }, [lenta2, lentaMaterial]);
  useEffect(() => {
    chairs.scene.traverse((node) => {
      node.material = materialASD;
      node.renderOrder = 2;
    });
  }, [chairs, materialASD]);
  useEffect(() => {
    road_cars.scene.traverse((node) => {
      node.material = customShaderTest2;
      node.renderOrder = 1;
    });
  }, [road_cars, customShaderTest2]);

  scene.add(gltf.scene);
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
  scene.add(chairs.scene);
  scene.add(road_cars.scene);

  useEffect(() => {
    // Setup frustum culling and optimization for all objects
    const setupOptimizations = (sceneObject) => {
      sceneObject.traverse((node) => {
        if (node.isMesh) {
          // Enable frustum culling
          node.frustumCulled = true;

          // Optimize geometry
          if (node.geometry) {
            node.geometry.computeBoundingSphere();
            node.geometry.computeBoundingBox();
          }

          // Optimize materials
          if (node.material) {
            node.material.precision = "lowp"; // Use low precision for better performance
          }
        }
      });
    };

    // Apply optimizations to all loaded models
    [
      terrain.scene,
      gltf.scene,
      env.scene,
      cars.scene,
      logo.scene,
      road.scene,
      main.scene,
      wallsOut.scene,
      chairs.scene,
      lenta.scene,
      lenta2.scene,
      main_static.scene,
      road_cars.scene,
    ].forEach(setupOptimizations);
  }, [
    terrain,
    gltf,
    env,
    cars,
    logo,
    road,
    main,
    wallsOut,
    chairs,
    lenta,
    lenta2,
    main_static,
    road_cars,
    camera,
  ]);

  // Optimize frame updates
  const lastUpdate = useRef(0);
  const frameInterval = 1000 / 60; // Target 60 FPS for animations

  useFrame(({ clock }) => {
    const currentTime = clock.getElapsedTime() * 1000;

    // Skip frame if not enough time has passed
    if (currentTime - lastUpdate.current < frameInterval) {
      return;
    }

    // Check distance for main scene
    if (main && main.scene) {
      const mainPosition = new THREE.Vector3();
      main.scene.getWorldPosition(mainPosition);
      // TODO: Засунутуь константу в useEffect и добавить плавное появление
      const distanceToCamera = camera.position.distanceTo(mainPosition);
      // Переместить в существующий useEffect
      main.scene.traverse((node) => {
        if (node.isMesh) {
          node.visible = distanceToCamera <= 500;
        }
      });
    }

    lastUpdate.current = currentTime;
    const progress = Math.min(1, clock.getElapsedTime() / 5);

    // Update shaders
    customShader.uniforms.uProgress.value = progress;
    customShader.uniforms.time.value = clock.getElapsedTime();
    customShaderTest.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    customShaderTest2.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    worldMaterial.uniforms.uTime.value = clock.getElapsedTime() * 1.2;
    lentaMaterial.uniforms.uTime.value = clock.getElapsedTime() * 10.2;
  });

  const mainAnimations = useAnimations(main.animations, main.scene);
  const roadAnimations = useAnimations(road_cars.animations, road_cars.scene);
  const carsAnimations = useAnimations(cars.animations, cars.scene);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;

      // Handle main animations
      mainAnimations.names.forEach((name) => {
        const action = mainAnimations.actions[name];
        if (isVisible) {
          action.paused = false;
        } else {
          action.paused = true;
        }
      });

      // Handle cars animations
      carsAnimations.names.forEach((name) => {
        const action = carsAnimations.actions[name];
        if (isVisible) {
          action.paused = false;
        } else {
          action.paused = true;
        }
      });

      // Handle road animations
      roadAnimations.names.forEach((name) => {
        const action = roadAnimations.actions[name];
        if (isVisible) {
          action.paused = false;
        } else {
          action.paused = true;
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Initial setup
    mainAnimations.names.forEach((name) => {
      const action = mainAnimations.actions[name];
      action.reset().play();
      action.setEffectiveTimeScale(0.8); // Slightly slow down animations for performance
    });

    carsAnimations.names.forEach((name) => {
      const action = carsAnimations.actions[name];
      action.reset().play();
      action.setEffectiveTimeScale(0.8);
    });

    roadAnimations.names.forEach((name) => {
      const action = roadAnimations.actions[name];
      action.reset().play();
      action.setEffectiveTimeScale(0.8);
    });

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mainAnimations, carsAnimations, roadAnimations]);

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

      // Отмечаем, что первый рендер прошел
      isFirstRender.current = false;
    }
  }, [customShaderTest]);

  // Modify the useEffect for static objects to use geometry merging
  useEffect(() => {
    // Merge static objects that use worldMaterial
    const staticObjects = [env.scene, road.scene];
    staticObjects.forEach((obj) => {
      mergeGeometriesWithMaterial(obj, worldMaterial);
    });

    // Merge static objects that use customShaderTest2
    const staticObjectsShader2 = [wallsOut.scene, cars.scene];
    staticObjectsShader2.forEach((obj) => {
      const merged = mergeGeometriesWithMaterial(obj, customShaderTest2);
      if (merged) merged.renderOrder = 2;
    });
  }, [env, road, wallsOut, cars, worldMaterial, customShaderTest2]);

  return (
    <>
      <ambientLight intensity={0.7} />
      <primitive object={scene} />
    </>
  );
}
