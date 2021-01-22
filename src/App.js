import * as THREE from 'three'
import React, { useRef } from 'react'
import { OrbitControls } from 'drei'
import { Canvas, useFrame } from 'react-three-fiber'
import './App.css'

const tempObject = new THREE.Object3D()

const Boxes = () => {
  const ref = useRef()

  useFrame(() => {
    let i = 0
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        for (let z = 0; z < 10; z++) {
          const id = i++
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.updateMatrix()
          ref.current.setMatrixAt(id, tempObject.matrix)
        }
      }
    }

    ref.current.rotation.x += 0.005
    ref.current.rotation.z += 0.005
  })

  return (
    <instancedMesh ref={ref} args={[null, null, 1000]}>
      <boxBufferGeometry attach="geometry" args={[0.7, 0.7, 0.7]} />
      <meshPhongMaterial attach="material" color="teal" />
    </instancedMesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight />
      <pointLight intensity={0.6} position={[0, 10, 4]} />
      <Boxes />
      <OrbitControls />
    </>
  )
}

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 20] }}>
        <Scene />
      </Canvas>
    </>
  )
}

export default App
