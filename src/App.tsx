import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import "./App.css";

function Box(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += delta * 0.5));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => setClicked((prevClicked) => !prevClicked)}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function BreakroomScene() {
  const { camera } = useThree();
  useFrame((state, delta) => (camera.position.z += delta * 0.5));

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </>
  );
}

function App() {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <BreakroomScene />
    </Canvas>
  );
}

export default App;
