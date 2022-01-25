
import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box, Environment, Html, OrbitControls, Sky } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import { Suspense } from 'react/cjs/react.production.min'
import Model from './Models/Model';
import Car from './Objects/PlayerCar';
import NpcCar from './Objects/NpcCarObject';
import { Group } from 'three';



function App() {

  const [gameStarted,setGameStarted]=useState(false);
  const [uiPos,setUiPos]=useState(0);

  const deg2rad = degrees => degrees * (Math.PI / 180);

  function answer()
  {
    console.log("clicked")
  }

   document.addEventListener('keydown', () => {
     setGameStarted(true)
     setUiPos(localStorage.getItem('playerPosZ'))
   })
  
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
        
        <Html distanceFactor={20} position={[0, 0, uiPos]}>
        {gameStarted === false &&
          <div className='relative mt-0 -translate-x-28 -translate-y-56 w-60 h-26 bg-gray-100 rounded-md'>
            {/* <button className='' onClick={answer}>Yo</button> */}
            <p className='text-2xs p-2 text-center font-medium'>Welcome to the research project of Tibo Van Houtte.</p>
            <p className='text-2xs p-2 text-center'>Use the ZQSD keys to move the car.</p>
            <p className='text-2xs p-2 text-center'>Listen to the sound of the incoming ambulance and try to guess which direction it's coming from.</p>
            <p className='text-2xs p-2 font-bold text-center'>Press any button to start the game.</p>
          </div>
        }

        {gameStarted === true &&
          <div className='relative mt-0 -translate-x-28 -translate-y-56 w-60 h-26 bg-gray-100 rounded-md'>
            <div className='flex justify-between '>
              <button className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Front</button>
              <button className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Back</button>
            </div>
            <div className='flex justify-between'>
              <button className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Left</button>
              <button className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Right</button>
            </div>
          </div>
        }
        </Html>
        <Suspense fallback={null}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-15,3,30]} args={[20,100, 20]}>
            <meshStandardMaterial color='grey' />
          </Box>
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

