import { Box, Html } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import React, {  useState } from 'react'
import { TextureLoader } from 'three';

function Building(pos)
{
    const colorMap = useLoader(TextureLoader, 'glass.jpg')

    return (
        <Box position={[pos.x,pos.y,pos.z]} args={[20,100, 20]}>
            <meshStandardMaterial map={colorMap} />
        </Box>
    )
}

export default Building