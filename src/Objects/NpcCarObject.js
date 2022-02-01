import React, { useRef, useState, useEffect } from 'react'
import Model from '../Models/NpcCar.js';
import {  useFrame, useLoader, useThree } from '@react-three/fiber'
import * as THREE from 'three'



let playingSound;

//variables that hold the current x and z position of the car
let movementStarted = false

let soundInitialized = 0

//direction: 0->FW, 1->BW, 2->LFT, 3->RGHT
let direction = 0

function NpcCar()
{
  const [playerCarPosZ, setPlayerCarPosZ] = useState(50)
  const [playerCarPosX, setPlayerCarPosX] = useState(-30)
  const [npcRotation, setNpcRotation] = useState(0)

    
  //convert radians to deg
  const deg2rad = degrees => degrees * (Math.PI / 180);

  //calc distance between player and npc
  const calcDistance = () => {
    let npcPos = new THREE.Vector3(playerCarPosX, 0, playerCarPosZ)
    let playerPos = new THREE.Vector3(localStorage.getItem('playerPosX'), 0, localStorage.getItem('playerPosZ'))
    return playerPos.distanceTo(npcPos)
  }

  function Audio({ url }) {
    const sound = useRef()
    const { camera } = useThree()
    const [listener] = useState(() => new THREE.AudioListener())
    const buffer = useLoader(THREE.AudioLoader, url)

    useEffect(() => {
      //only create 2 sounds per reset and only play 2nd
      if (soundInitialized < 2) 
      {
        sound.current.setBuffer(buffer)
        sound.current.setRefDistance(2)
        sound.current.setLoop(true)
        
        if(soundInitialized == 1) 
        {
          sound.current.play()
          playingSound = sound.current
        }
        soundInitialized++
      }
      
     //change volume based on distance
      if(soundInitialized > 1)
      {
        let vol = 1/Math.pow(calcDistance()/100,2)
        if (vol >= 10) 
        {
          playingSound.setVolume(10)
        } 
        else
        {
          playingSound.setVolume(1/Math.pow(calcDistance()/100,2))
        }
       
      }     
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

    document.addEventListener('keydown', handleKeyDown)
    
    return () => {
        document.removeEventListener('keydown', handleKeyDown)
       
    }
    

  }, [])
  
    //updates every frame
    useFrame(() => {
      //reset to random pos on every reset
        if (localStorage.getItem('reset') == "true" && movementStarted)
        {
          setPlayerCarPosX(0)
          setPlayerCarPosZ(0)
          localStorage.setItem('reset', false)
          direction = Math.floor(Math.random() * 4);
          localStorage.setItem('dir', direction)
          if (playingSound != undefined) 
          {
            playingSound.stop()
          }
         
          soundInitialized = 0
          switch(direction)
          {
            case 0:
              setPlayerCarPosX(0)
              setPlayerCarPosZ(100)
              setNpcRotation(deg2rad(180))
              break;
            case 1:
              setPlayerCarPosX(0)
              setPlayerCarPosZ(-100)
              setNpcRotation(deg2rad(0))
              break;
            case 2:
              setPlayerCarPosX(100)
              setPlayerCarPosZ(50)
              setNpcRotation(deg2rad(270))
              break;
            case 3:
              setPlayerCarPosX(-100)
              setPlayerCarPosZ(50)
              setNpcRotation(deg2rad(90))
              break;
          }
          
        }
        else if (movementStarted) 
        {
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
        <Audio url="/siren.wav" />
        </mesh>
        
        <Model position={[playerCarPosX,0,playerCarPosZ]} rotation={[0,npcRotation,0]}/>
        
      </>
    )
}

export default NpcCar;