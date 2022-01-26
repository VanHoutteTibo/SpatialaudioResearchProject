import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef, useState, useEffect } from 'react'

function UI()
{
    
    

    const [ gameStarted, setGameStarted ]= useState(false);
    const [ resetTime, setResetTime ]= useState(0);
    const [ timeDiff, setTimeDiff ]= useState(0);
    const [ reset, setReset ]= useState(false);
    const [uiPos ,setUiPos ]= useState([0,0,0]);
    const [ score, setScore ] = useState(0)
    const [uiPosX ,setUiPosX ]= useState(0);

    const deg2rad = degrees => degrees * (Math.PI / 180);

    const correctAnswer = () => {
      setScore(Math.round(score + (100 * timeDiff)))
      localStorage.setItem('reset', true)
      setReset(true)
    }
    

     const answer = (event) => {    
      let dirAnswer = event.target.getAttribute('index')
      let dir = localStorage.getItem('dir')

      if (dirAnswer == "front" && dir == 0) correctAnswer()
      else if (dirAnswer == "back" && dir == 1) correctAnswer()
      else if (dirAnswer == "left" && dir == 2) correctAnswer()
      else if (dirAnswer == "right" && dir == 3) correctAnswer()
      else setScore(Math.round(score - 100))

      console.log(score)
    }
    

    document.addEventListener('keydown', () => {
        setGameStarted(true)
        
    })

   

    useFrame(({ clock }) => {

      
        //setUiPosZ(localStorage.getItem('playerPosZ'))
        if (gameStarted) {
            setUiPos([localStorage.getItem('playerPosX'),1,localStorage.getItem('playerPosZ')])
        }
        
       if (reset == true)
       {
        setResetTime(clock.getElapsedTime())
        setReset(false)
       }
        
        if (localStorage.getItem('reset') == "false") {
          setTimeDiff(clock.getElapsedTime() - resetTime)
          if (clock.getElapsedTime() - resetTime > 15) {
            localStorage.setItem('reset', true)
            setResetTime(clock.getElapsedTime())
          }
        }
        
      })

    return (
        <Html distanceFactor={20} position={uiPos}>
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
            <div  className='text-center'>score: {score}</div>
            <div className='flex justify-between '>
              <button index="front" className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Front</button>
              <button index='back' className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Back</button>
            </div>
            <div className='flex justify-between'>
              <button index='left' className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Left</button>
              <button index='right' className='text-center w-1/2 hover:bg-slate-200 active:bg-slate-300 py-2 rounded-md' onClick={answer}>Right</button>
            </div>
          </div>
        }
        </Html>
    )
}

export default UI;