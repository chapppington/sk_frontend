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
  useFrame(({clock})=>{
    const progress = Math.min(1, clock.getElapsedTime()/5)
    customShader.uniforms.uProgress.value = progress;
    customShader.uniforms.time.value = clock.getElapsedTime();
    customShaderTest.uniforms.uTime.value = clock.getElapsedTime()*1.2;
    
  })

  useEffect(() => {
    THREE.Cache.clear() // Очищаем кэш загрузчика
  }, [])
  
  
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

