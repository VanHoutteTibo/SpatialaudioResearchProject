import { Box, Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import React, {  useState } from 'react'
import { TextureLoader } from 'three';

function GreyBuilding(pos)
{
    const colorMap = useLoader(TextureLoader, 'greyGlass.jpg')
    //colorMap.repeat.set(1,1)

    return (
        <Box position={[pos.x,pos.y,pos.z]} args={[20,80, 20]}>
            <meshStandardMaterial map={colorMap} />
        </Box>
    )
}

export default GreyBuilding