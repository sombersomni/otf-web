import React, { Suspense } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Image() {
  const texture = useLoader(TextureLoader, 'nba.jpg')
  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  )
}

export const Example = () => (
  <Canvas>
      <Image />
  </Canvas>
)