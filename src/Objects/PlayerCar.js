import React, { useRef, useState, useEffect } from 'react'
import Model from '../Models/Model';
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Mesh } from 'three';

//variable to keep track of witch directions are activated
let forward, backward, left, right = false

//variables that hold the current x and z position of the car
let movmentZ = 0
let movmentX = 0

function Car()
{
    const [playerCarPosZ, setPlayerCarPosZ] = useState(0)
    const [playerCarPosX, setPlayerCarPosX] = useState(0)
 
 
  
  useEffect(() => {
    //check which key is pressed and set direction active
    const handleKeyDown = (e) => {
      console.log(e.code)
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
    useFrame(() => {
        //check what directions are activated and move car
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
      })
    return (
        <Model position={[playerCarPosX,0,playerCarPosZ]}/>
    )
}

export default Car;