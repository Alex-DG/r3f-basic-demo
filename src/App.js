import React, { useState, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useThree, extend, useFrame } from "react-three-fiber";

import "./App.css";

extend({ OrbitControls }); // extend r3f with OrbitControls

const Cube = (props) => {
  const mesh = useRef();

  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHover] = useState(false);

  const size = isBig ? 2 : 1;
  const color = isHovered ? "salmon" : "orange";

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHover(false)}
      onPointerOver={() => setIsHover(true)}
    >
      <boxBufferGeometry attach="geometry" args={[size, size, size]} />
      <meshStandardMaterial attach="material" {...{ color }} />
    </mesh>
  );
};

const Scene = () => {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <>
      <ambientLight />
      <pointLight intensity={0.3} position={[-1, 2, 4]} />
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 16, 0]} position={[2, 2, 0]} />

      <orbitControls args={[camera, domElement]} />
    </>
  );
};

const App = () => {
  return (
    <Canvas colorManagement>
      <Scene />
    </Canvas>
  );
};

export default App;
