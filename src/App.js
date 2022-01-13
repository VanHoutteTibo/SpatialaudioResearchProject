
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Environment, OrbitControls } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { Suspense } from 'react/cjs/react.production.min'
import Model from './Models/Model';
import Car from './Objects/PlayerCar';



function App() {

//   const [playerCarPosZ, setPlayerCarPosZ] = useState(0)

//   function timeout(delay) {
//     return new Promise( res => setTimeout(res, delay) );
// }
//   let keypressed = false

//   const onKeyPress = ({key}) => {
//     console.log(key)
//     setTimeout(function() {
//       if(key == "w" && keypressed == false)
//       {
//         console.log(playerCarPosZ)
//         setPlayerCarPosZ(playerCarPosZ + 0.1)
//       }
//       keypressed = true  
//       }, 1);
//   }
//   document.addEventListener('keypress', onKeyPress);
  

  

  // useFrame(() => {
  //   console.log("Hey, I'm executing every frame!")
  // })


  return (
    <>
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

