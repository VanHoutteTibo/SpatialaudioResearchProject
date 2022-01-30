
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box, Environment, Html, OrbitControls, Sky, useTexture } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { Suspense } from 'react/cjs/react.production.min'
import Model from './Models/Model';
import Car from './Objects/PlayerCar';
import NpcCar from './Objects/NpcCarObject';
import { Group, TextureLoader } from 'three';
import UI from './Objects/Ui';
import Building from './Objects/Building';
import GreyBuilding from './Objects/GreyBuilding';



function App() {

  const name = (type) => `${type}.jpg`;
  
  const deg2rad = degrees => degrees * (Math.PI / 180);

  localStorage.setItem('reset', true)

  function GroundPlane() {
    
    return (
      <mesh receiveShadow rotation={[deg2rad(-90), 0, 0]} position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="yellow" />
      </mesh>
    );
  }

  return (
    <>
    
    <audio src="/carSound.mp3" crossOrigin="anonymous" ></audio>
    <div className="App">
      
      <Canvas camera={{ position: [0,0,1], rotation: [deg2rad(10),deg2rad(180),0]}} style={{height: window.innerHeight}}>
        
        <UI/>
          <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Building x={20} y={3} z={30}/>
          <GreyBuilding x={40} y={3} z={30}/>
          <GreyBuilding x={-40} y={3} z={30}/>
          <Building x={-20} y={3} z={30}/>
          <Building x={20} y={3} z={70}/>
          <Building x={-20} y={3} z={70}/>
          <NpcCar position={[0,0,5]}/>
          <Car />
          {/* <OrbitControls /> */}
          <Sky  distance={450000} sunPosition={[5, 1, 8]}  azimuth={0.25}/>
          <GroundPlane/>
          </Suspense>
      </Canvas>
    </div>
    
    </>
  )
}

export default App;

