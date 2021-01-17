import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";
import { OrbitControls, Torus } from "drei";
import { useControl, Controls } from "react-three-gui";

import "./App.css";

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
const Sphere = ({ animate, ...props }) => {
  const mesh = useRef();

  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHover] = useState(false);

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  const color = isHovered ? "yellow" : "salmon";

  useFrame(() => {
    if (animate) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
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
        roughness={1}
        metalness={0.5}
        shininess={100}
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
  const positionX = useControl("Pos X", {
    type: "number",
    max: 10,
    min: -10,
  });
  const positionY = useControl("Pos Y", {
    type: "number",
    max: 10,
    min: -10,
  });

  const { x, y } = useControl("Rotation", {
    type: "xypad",
  });

  const color = useControl("Torus Color", {
    type: "color",
    value: "gold",
    inline: true,
  });

  return (
    <>
      <ambientLight />
      <spotLight castShadow intensity={0.6} position={[0, 10, 4]} />

      <Sphere rotation={[x, y, 0]} position={[positionX, positionY, 0]} />
      <Sphere rotation={[10, 20, 0]} position={[2, 2, 0]} animate />

      <Torus args={[1, 0.2, 10, 30]} position={[-2, 1, -1]}>
        <meshPhongMaterial
          shininess={100}
          roughness={1}
          metalness={0.5}
          attach="material"
          {...{ color }}
        />
      </Torus>

      <Plane />

      {/* 
      <Sphere rotation={[10, 10, 0]} position={[0, 0, 0]} />
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]} />
      <Cylinder rotation={[10, 20, 0]} position={[-2, -3, 0]} /> 
      */}

      <OrbitControls />
    </>
  );
};

const App = () => {
  return (
    <Controls.Provider>
      <Controls.Canvas shadowMap>
        <Scene />
      </Controls.Canvas>
      <Controls />
    </Controls.Provider>
  );
};

export default App;
