/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
        
import React, { useRef } from 'react'
import { useGLTF, 

 } from '@react-three/drei'


export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/delivery-truck/model.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
<mesh geometry={nodes.Mesh_door.geometry} material={materials['carTire.023']} />
<mesh geometry={nodes.Mesh_door_1.geometry} material={materials['_defaultMat.034']} />
<mesh geometry={nodes.Mesh_body009.geometry} material={materials['lightBack.016']} />
<mesh geometry={nodes.Mesh_body009_1.geometry} material={materials['paintRed.005']} />
<mesh geometry={nodes.Mesh_body009_2.geometry} material={materials['plastic.026']} />
<mesh geometry={nodes.Mesh_body009_3.geometry} material={materials['paintWhite.005']} />
<mesh geometry={nodes.Mesh_body009_4.geometry} material={materials['_defaultMat.033']} />
<mesh geometry={nodes.Mesh_body009_5.geometry} material={materials['lightFront.019']} />
<mesh geometry={nodes.Mesh_body009_6.geometry} material={materials['window.021']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft039.geometry} material={materials['carTire.024']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft039_1.geometry} material={materials['_defaultMat.035']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft039_2.geometry} material={materials['plastic.027']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft041.geometry} material={materials['carTire.026']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft041_1.geometry} material={materials['_defaultMat.037']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft041_2.geometry} material={materials['plastic.029']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft040.geometry} material={materials['carTire.025']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft040_1.geometry} material={materials['_defaultMat.036']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft040_2.geometry} material={materials['plastic.028']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft005.geometry} material={materials['carTire.009']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft005_1.geometry} material={materials['_defaultMat.017']} />
<mesh geometry={nodes.Mesh_wheel_frontLeft005_2.geometry} material={materials['plastic.010']} />

    </group>
  )
}

useGLTF.preload('https://market-assets.fra1.cdn.digitaloceanspaces.com/market-assets/models/delivery-truck/model.gltf')