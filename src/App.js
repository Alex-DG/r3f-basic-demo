import React, { useState, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useThree, extend, useFrame } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";

import "./App.css";

extend({ OrbitControls }); // extend r3f with OrbitControls

/**
 * Cube
 *
 * box args=[width,height,depth]}
 */
const Cube = (props) => {
  const mesh = useRef();

  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHover] = useState(false);

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  const color = isHovered ? "salmon" : "purple";

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <a.mesh
      {...props}
      ref={mesh}
      scale={size}
      position-x={x}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHover(false)}
      onPointerOver={() => setIsHover(true)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" {...{ color }} />
    </a.mesh>
  );
};

/**
 * Sphere
 *
 * sphere args=[radius,widthSegments,heightSegments]}
 */
const Sphere = (props) => {
  const mesh = useRef();

  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHover] = useState(false);

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  const color = isHovered ? "salmon" : "orange";

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <a.mesh
      {...props}
      ref={mesh}
      scale={size}
      position-x={x}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHover(false)}
      onPointerOver={() => setIsHover(true)}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 20, 20]} />
      <meshStandardMaterial attach="material" {...{ color }} />
    </a.mesh>
  );
};

const Cylinder = (props) => {
  const mesh = useRef();

  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHover] = useState(false);

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  const color = isHovered ? "salmon" : "red";

  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <a.mesh
      {...props}
      ref={mesh}
      scale={size}
      position-x={x}
      onClick={() => setIsBig(!isBig)}
      onPointerOut={() => setIsHover(false)}
      onPointerOver={() => setIsHover(true)}
    >
      <cylinderBufferGeometry attach="geometry" args={[1, 1, 2, 20]} />
      <meshStandardMaterial attach="material" {...{ color }} />
    </a.mesh>
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

      <Sphere rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]} />
      <Cylinder rotation={[10, 20, 0]} position={[-2, -3, 0]} />

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
