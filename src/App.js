
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, OrbitControls } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { Suspense } from 'react/cjs/react.production.min'
import Model from './Models/Model';
import Car from './Objects/PlayerCar';



function App() {



  return (
    <>
    <audio src="/carSound.mp3" crossOrigin="anonymous" ></audio>
    <div className="App">
      <Canvas style={{height: window.innerHeight}}>
        <Suspense fallback={null}>
          <Car />
          <OrbitControls />
          <Environment preset="sunset" background />
          
        </Suspense>
      </Canvas>
    </div>
    </>
  )
}

export default App;

