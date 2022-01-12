import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, OrbitControls } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { Suspense } from 'react/cjs/react.production.min'
import Model from './Models/Model';

const Modela = () => {

  const gltf = useLoader(DRACOLoader, './model.gltf')
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas style={{height: window.innerHeight}}>
        <Suspense fallback={null}>
          <Model/>
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas>
    </div>
  )
}

