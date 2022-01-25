import React, { useRef, useState, useEffect } from 'react'
import Model from '../Models/Model';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Mesh } from 'three';
import { once } from 'events';
import { Box, PositionalAudio } from '@react-three/drei';



//variable to keep track of witch directions are activated
let forward, backward, left, right = false

//variables that hold the current x and z position of the car
let movmentZ = 0
let movmentX = 0

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

let soundInitialized = 0

const panner = new StereoPannerNode(audioCtx)

// const track = audioContext.createMediaElementSource(audioElement);

// track.connect(audioContext.destination)
// track.loop = true
// track.start()

//var panner = audioContext.createPanner();

const myInitObject = {}


function Car()
{
  let started = false
    const [playerCarPosZ, setPlayerCarPosZ] = useState(0)
    const [playerCarPosX, setPlayerCarPosX] = useState(0)
 
  const initSound = (audioElement) => {
    const track = audioCtx.createMediaElementSource(audioElement);

  
    //track.connect(panner.destination)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
      audioElement.play();
    }
    track.connect(panner).connect(audioCtx.destination);
    soundInitialized = true;
  }

  function Sound({ url }) {
    const sound = useRef()
    const { camera } = useThree()
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader, url)

    useEffect(() => {
      if (soundInitialized < 2) {
        sound.current.setBuffer(buffer)
        sound.current.setRefDistance(1)
        sound.current.setLoop(true)
        //sound.current.play()
        console.log("test")
        soundInitialized++
      }
      
      //listener.position.x = playerCarPosX
      //listener.position.z = playerCarPosZ
      camera.position.set(playerCarPosX,3,playerCarPosZ-5)
      //camera.add(listener)
      
      return () => {
        
        camera.remove(listener)
      }
    }, [])
    return <positionalAudio ref={sound} args={[listener]} />
  }
  
  useEffect(() => {
    
    //check which key is pressed and set direction active
    const handleKeyDown = (e) => {
      const audioElement = document.querySelector('audio');
      console.log(e.code)
      if (soundInitialized == false) {
        //initSound(audioElement)
        
      }
      
       
      if(e.code === "KeyW") forward = true;
      else if(e.code === "KeyS") backward = true

      if(e.code === "KeyD") right = true;
      else if(e.code === "KeyA") left = true
    }
    const handleKeyUp = (e) => {
        if(e.code === "KeyW") forward = false;
        else if(e.code === "KeyS") backward = false

        if(e.code === "KeyD") right = false;
        else if(e.code === "KeyA") left = false

        
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
    

  }, [])
  
    //updates every frame
    useFrame(({clock}) => {
        //check what directions are activated and move car
        // console.log(panner.pan.value)
        // panner.pan.value =
        // panner.positionX = playerCarPosX
        // panner.positionZ = playerCarPosZ
        if (forward === true) {
            movmentZ += 0.1
            setPlayerCarPosZ(movmentZ)
        }
        else if(backward === true)
        {
            movmentZ -= 0.1
            setPlayerCarPosZ(movmentZ)
        }

        if (forward === true || backward === true) {
            
            if(right === true)
            {
                movmentX -= 0.05
                setPlayerCarPosX(movmentX)
            } 
            else if(left === true)
            {
                movmentX += 0.05
                setPlayerCarPosX(movmentX)
            }
        }
        localStorage.setItem('playerPosX', movmentX);
        localStorage.setItem('playerPosZ', movmentZ);
       
        
        
        
        
      })

    return (
      <>
        <mesh position={[playerCarPosX,0,playerCarPosZ]}>
        <Sound url="/carSound.mp3" />
        </mesh>
        
        <Model position={[playerCarPosX,0,playerCarPosZ]}/>
        
      </>
    )
}

export default Car;