import React, { useRef, useState, useEffect } from 'react'
import Model from '../Models/NpcCar.js';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Mesh } from 'three';
import { once } from 'events';
import { Box, PositionalAudio } from '@react-three/drei';

//variable to keep track of witch directions are activated
let forward, backward, left, right = false

let playingSound;

//variables that hold the current x and z position of the car
let movementStarted = false
let movmentX = 0

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

let soundInitialized = 0

const panner = new StereoPannerNode(audioCtx)

//direction: 0->FW, 1->BW, 2->LFT, 3->RGHT
let direction = 0

// const track = audioContext.createMediaElementSource(audioElement);

// track.connect(audioContext.destination)
// track.loop = true
// track.start()

//var panner = audioContext.createPanner();

function NpcCar()
{
     const [playerCarPosZ, setPlayerCarPosZ] = useState(50)
     const [playerCarPosX, setPlayerCarPosX] = useState(-30)

    

    const deg2rad = degrees => degrees * (Math.PI / 180);
 
  const initSound = (audioElement) => {
    const track = audioCtx.createMediaElementSource(audioElement);

    console.log(track)
    //track.connect(panner.destination)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
      audioElement.play();
    }
    track.connect(panner).connect(audioCtx.destination);
    soundInitialized = true;
  }

  const calcDistance = () => {
    let npcPos = new THREE.Vector3(playerCarPosX, 0, playerCarPosZ)
    let playerPos = new THREE.Vector3(localStorage.getItem('playerPosX'), 0, localStorage.getItem('playerPosZ'))
    return playerPos.distanceTo(npcPos)
  }

  function Sound({ url }) {
    const sound = useRef()
    const { camera } = useThree()
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader, url)

    useEffect(() => {
      if (soundInitialized < 2) {
        
        sound.current.setBuffer(buffer)
        sound.current.setRefDistance(2)
        
        sound.current.setLoop(true)
        
        console.log(playingSound)
        if(soundInitialized == 1) {
          sound.current.play()
          playingSound = sound.current
        }
        soundInitialized++
      }
      
      //console.log(1/Math.pow(calcDistance()/100,2))
      if(soundInitialized > 1)playingSound.setVolume(1/Math.pow(calcDistance()/100,2))
      
      listener.position.x = playerCarPosX
      listener.position.z = playerCarPosZ
      
      camera.add(listener)
      
      return () => {
        
        camera.remove(listener)
      }
    }, [])
    return <positionalAudio ref={sound} args={[listener]} />
  }
  
  useEffect(() => {
    
    

    //check which key is pressed and set direction active
    const handleKeyDown = (e) => {
     movementStarted = true
      
    }
    const handleKeyUp = (e) => {
        if(e.code === "KeyW") forward = false;
        else if(e.code === "KeyS") backward = false

        if(e.code === "KeyD") right = false;
        else if(e.code === "KeyA") left = false

        if(e.code === "KeyK")
        {
          if (playingSound != undefined) {
            
            playingSound.stop()
          }
        }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)

    
    return () => {
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('keyup', handleKeyUp)
    }
    

  }, [])
  
    //updates every frame
    useFrame(() => {
        //check what directions are activated and move car
        // console.log(panner.pan.value)
        // panner.pan.value =
        // panner.positionX = playerCarPosX
        // panner.positionZ = playerCarPosZ
      

        if (localStorage.getItem('reset') == "true" && movementStarted){
          setPlayerCarPosX(0)
          setPlayerCarPosZ(0)
          localStorage.setItem('reset', false)
          direction = Math.floor(Math.random() * 4);
          console.log("reset")
          if (playingSound != undefined) {
            playingSound.stop()
          }
         
          soundInitialized = 0
          switch(direction)
          {
            case 0:
              setPlayerCarPosX(0)
              setPlayerCarPosZ(50)
              
              break;
            case 1:
              setPlayerCarPosX(0)
              setPlayerCarPosZ(-50)
              break;
            case 2:
              setPlayerCarPosX(30)
              setPlayerCarPosZ(50)
              break;
            case 3:
              setPlayerCarPosX(-30)
              setPlayerCarPosZ(50)
              break;
          }
          
        }
        else if (movementStarted) {
          switch(direction)
          {
            case 0:
              setPlayerCarPosZ(playerCarPosZ - 0.1)
              break;
            case 1:
              setPlayerCarPosZ(playerCarPosZ + 0.1)
              break;
            case 2:
              setPlayerCarPosX(playerCarPosX - 0.1)
              break;
            case 3:
              setPlayerCarPosX(playerCarPosX + 0.1)
              break;
          }
            
        }
      

       
        
      })

    return (
      <>
        <mesh position={[playerCarPosX,0,playerCarPosZ]}>
        <Sound url="/siren.wav" />
        </mesh>
        
        <Model position={[playerCarPosX,0,playerCarPosZ]} rotation={[0,deg2rad(90),0]}/>
        
      </>
    )
}

export default NpcCar;