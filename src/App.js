import React from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Canvas, useThree, extend } from 'react-three-fiber'

import './App.css'

extend({ OrbitControls }) // extend r3f with OrbitControls

const Cube = (props) => {
  return (
    <mesh {...props}>
      <boxBufferGeometry attach="geometry" args={[2, 2, 1]} />
      <meshStandardMaterial attach="material" color="pink" />
    </mesh>
  )
}

const Scene = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree()

  return (
    <>
      <ambientLight />
      <pointLight intensity={0.3} position={[-1, 2, 4]} />
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 15, 0]} position={[2, 2, 0]} />

      <orbitControls args={[camera, domElement]} />
    </>
  )
}

const App = () => {
  return (
    <Canvas colorManagement>
      <Scene />
    </Canvas>
  )
}

export default App
