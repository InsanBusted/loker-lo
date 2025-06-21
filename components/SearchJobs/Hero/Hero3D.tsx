"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF,  } from "@react-three/drei";

function WorkerModel() {
  const { scene } = useGLTF("/models/worker.glb");
  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, -2, 0]}
    />
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0.5, 4], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={1} />
      <Environment preset="studio" />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate />

      <WorkerModel />
    </Canvas>
  );
}
