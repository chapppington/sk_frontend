import {useFrame, useThree} from "@react-three/fiber";
import {useCameraContext} from "../CameraContext.tsx";
import * as THREE from "three";
import {useEffect, useRef} from "react";


export default function Camera3D() {
    const { camera } = useThree();
    const { activeSectionIndex, totalSections } = useCameraContext();


    // Целевые позиции для каждого раздела
    const cameraPositions = [
        new THREE.Vector3(502.3, 205, -676), // Позиция для Header
        new THREE.Vector3(432.3, 205, -676),  // Позиция для ScrollingText
        new THREE.Vector3(231.15, 42, -469),   // Позиция для MissionSection
        new THREE.Vector3(-9.65, 21.85, -61.8),   // Позиция для ProductsSlider
        new THREE.Vector3(-165.85, 53.86, -119),   // Позиция для PortfolioSection
        new THREE.Vector3(33, 23, 46),  // Позиция для остальных секций
        new THREE.Vector3(33, 23, 46),  // Позиция для остальных секций
    ];

    // Целевые точки, на которые смотрит камера
    const lookAtPositions = [
        new THREE.Vector3(-160, 130, 0),   // Цель для Header
        new THREE.Vector3(-100, 0, 0),  // Цель для ScrollingText
        new THREE.Vector3(-500, 1, 0),   // Цель для MissionSection
        new THREE.Vector3(-350, -60, 100),   // Цель для ProductsSlider
        new THREE.Vector3(1, 0, 0),   // Цель для PortfolioSection
        new THREE.Vector3(34, 23, 46),   // Цель для остальных секций
        new THREE.Vector3(34, 23, 46),   // Цель для остальных секций
    ];

    // Ссылки для плавной анимации
    const currentPos = useRef(new THREE.Vector3());
    const currentLookAt = useRef(new THREE.Vector3());

    // Применяем анимацию в каждом кадре
    useFrame(() => {
        // Плавно интерполируем текущую позицию к целевой
        currentPos.current.lerp(cameraPositions[activeSectionIndex], 0.05);
        currentLookAt.current.lerp(lookAtPositions[activeSectionIndex], 0.05);

        // Обновляем позицию камеры
        camera.position.copy(currentPos.current);

        // Направляем камеру на целевую точку
        camera.lookAt(currentLookAt.current);
    });

    // Инициализация начальной позиции
    useEffect(() => {
        if (camera) {
            camera.position.copy(cameraPositions[0]);
            currentPos.current.copy(cameraPositions[0]);
            currentLookAt.current.copy(lookAtPositions[0]);
            camera.lookAt(lookAtPositions[0]);
        }
    }, [camera]);
   

//   useFrame(({clock})=>{
//     materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
//   })
//   useFrame(({ camera }) => {
//     if (meshRef.current) {
//         // Position mesh in front of camera
//         const distance = 10
//         const vector = new THREE.Vector3(0, 0, -distance)
//         vector.applyQuaternion(camera.quaternion)
//         meshRef.current.position.copy(camera.position).add(vector)
        
//         // Make mesh face camera
//         meshRef.current.quaternion.copy(camera.quaternion)
//     }
    
// })

    return (
        null
            // <mesh ref={meshRef} scale={[10,10,1]}>
            //     <planeGeometry args={[1, 1]} />
            //     <shaderMaterial
            //         ref={materialRef}
            //         side={2}
            //         uniforms={{
            //             uTime: { value: 1.0 },
            //             uColor1: { value: new THREE.Color("#3ba7cd") },
            //             uColor2: { value: new THREE.Color(0.082, 0.055, 0.341) },
            //             uColor3: { value: new THREE.Color("#000000") },
            //             uTimeScale: { value: 0.19 },
            //             uScale: { value: 1.08 },
            //             uScale3: { value: 1.08 },
            //             uScaleVignette: { value: 0.523 },
            //             uVignetteBorderFade: { value: 0.216 },
            //             uAlpha: { value: .8 },
            //         }}
            //         vertexShader={vertexShader}
            //         fragmentShader={fragmentShader}
            //         transparent={true}
            //     />
            // </mesh>
    );
}
// function CameraAnimation() {
//   const { cameraAnimationActive } = useCameraAnimation();
//   const { camera } = useThree();
//   const curveRef = useRef();
//   // const curveRef = useRef();
//   const progress = useRef(0);
//   // const [path, setPath] = useState(null);
//   // const [points, setPoints] = useState([]);
//   //
//   // const getCurve = (curveObj) => {
//   //   curveRef.current = curveObj;
//   //   if (curveObj && curveObj.object) {
//   //     setPath(curveObj.object);
//   //
//   //     // Получаем точки пути для камеры
//   //     const allPoints = [];
//   //     if (curveObj.object.curves) {
//   //       curveObj.object.curves.forEach(curve => {
//   //         allPoints.push(...curve.getPoints(50));
//   //       });
//   //       setPoints(allPoints);
//   //     }
//   //   }
//   // };
//
//   // const [path, setPath] = useState(null);
//   // const [points, setPoints] = useState([]);
//   // const pointsRef = useRef([]);
//
//   // Используем useFrame для анимации камеры в каждом кадре
//   useFrame((state, delta) => {
//     if (!cameraAnimationActive || !curveRef.current || !curveRef.current.points || curveRef.current.points.length === 0) return;
//
//     // console.log(progress);
//     const points = curveRef.current.points;
//
//     // if (!Array.isArray(points) || points.length < 2) return;
//
//
//     progress.current += delta * 0.07; // Контроль скорости
//
//
//     if (progress.current > 1) {
//       progress.current = 0;
//     }
//
//
//     const pointCount = points.length;
//     const index = Math.min(Math.floor(progress.current * (points.length - 1)),pointCount - 2);
//     const nextIndex = Math.min((index + 1) % pointCount, pointCount - 1);
//
//
//     // Интерполируем между текущей и следующей точками
//     const lerpFactor = (progress.current * (points.length - 1)) % 1;
//
//
//     const currentPos = points[index];
//     const nextPos = points[nextIndex];
//
//     if (!currentPos || !nextPos) return;
//
//     if (currentPos && nextPos) {
//       // Интерполяция между точками
//       const position = new THREE.Vector3().lerpVectors(currentPos, nextPos, lerpFactor);
//
//
//       camera.position.copy(position);
//
//
//       // Камера всегда смотрит на следующую точку с небольшим опережением
//       const lookIndex = (index + 5) % points.length;
//       const lookAtPoint = points[lookIndex];
//
//       if (lookAtPoint) {
//         camera.lookAt(lookAtPoint);
//       } else {
//
//         camera.lookAt(0, 0, 0);
//       }
//     }
//   });
//
//   return <Curve ref={curveRef} />;
// }


// function SceneBackground() {
//   const { scene } = useThree()
//
//   useEffect(() => {
//     // Задаем цвет фона
//     scene.background = new THREE.Color('#87CEEB')
//
//     scene.fog = new THREE.Fog('#87CEEB', 100, 500)
//   }, [scene])
//
//   return null
// }
