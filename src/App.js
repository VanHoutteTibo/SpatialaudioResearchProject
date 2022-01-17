
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { Suspense } from 'react/cjs/react.production.min'
import Model from './Models/Model';
import Car from './Objects/PlayerCar';



function App() {

  function GroundPlane() {
    return (
      <mesh receiveShadow rotation={[-1.555, 0, 0]} position={[0, 0, 0]}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="green" />
      </mesh>
    );
  }

  return (
    <>
    <audio src="/carSound.mp3" crossOrigin="anonymous" ></audio>
    <div className="App">
      <Canvas style={{height: window.innerHeight}}>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Car />
          <OrbitControls />
          <Sky  distance={450000} sunPosition={[5, 1, 8]}  azimuth={0.25}/>
          <GroundPlane/>
        </Suspense>
      </Canvas>
    </div>
    </>
  )
}

export default App;

