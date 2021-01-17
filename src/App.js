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
// const Cube = (props) => {
//   const mesh = useRef();

//   const [isBig, setIsBig] = useState(false);
//   const [isHovered, setIsHover] = useState(false);

//   const { size, x } = useSpring({
//     size: isBig ? [2, 2, 2] : [1, 1, 1],
//     x: isBig ? 2 : 0,
//   });

//   const color = isHovered ? "salmon" : "pink";

//   useFrame(() => {
//     mesh.current.rotation.x += 0.008;
//   });

//   return (
//     <a.mesh
//       {...props}
//       ref={mesh}
//       scale={size}
//       position-x={x}
//       onClick={() => setIsBig(!isBig)}
//       onPointerOut={() => setIsHover(false)}
//       onPointerOver={() => setIsHover(true)}
//     >
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
//       <meshBasicMaterial attach="material" {...{ color }} />
//     </a.mesh>
//   );
// };

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

  const color = isHovered ? "yellow" : "salmon";

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
      receiveShadow
      castShadow
    >
      <sphereBufferGeometry attach="geometry" args={[1, 8, 6]} />
      <meshPhongMaterial
        flatShading
        shininess={100}
        roughness={1}
        metalness={0.5}
        attach="material"
        {...{ color }}
      />
    </a.mesh>
  );
};

// const Cylinder = (props) => {
//   const mesh = useRef();

//   const [isBig, setIsBig] = useState(false);
//   const [isHovered, setIsHover] = useState(false);

//   const { size, x } = useSpring({
//     size: isBig ? [2, 2, 2] : [1, 1, 1],
//     x: isBig ? 2 : 0,
//   });

//   const color = isHovered ? "salmon" : "red";

//   useFrame(() => {
//     mesh.current.rotation.x += 0.01;
//     mesh.current.rotation.y += 0.01;
//   });

//   return (
//     <a.mesh
//       {...props}
//       ref={mesh}
//       scale={size}
//       position-x={x}
//       onClick={() => setIsBig(!isBig)}
//       onPointerOut={() => setIsHover(false)}
//       onPointerOver={() => setIsHover(true)}
//     >
//       <cylinderBufferGeometry attach="geometry" args={[1, 1, 2, 20]} />
//       <meshStandardMaterial attach="material" {...{ color }} />
//     </a.mesh>
//   );
// };

const Plane = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -5]}>
      <planeBufferGeometry
        attach="geometry"
        args={[20, 20]}
        position={[0, -2, 0]}
      />
      <meshStandardMaterial attach="material" color="#D3D3D3" />
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
      <spotLight castShadow intensity={0.6} position={[0, 5, 2]} />

      <Plane />
      <Sphere rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Sphere rotation={[10, 20, 0]} position={[2, 2, 0]} />

      {/* 
      <Sphere rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]} />
      <Cylinder rotation={[10, 20, 0]} position={[-2, -3, 0]} /> 
      */}

      <orbitControls args={[camera, domElement]} />
    </>
  );
};

const App = () => {
  return (
    <Canvas shadowMap>
      <Scene />
    </Canvas>
  );
};

export default App;
