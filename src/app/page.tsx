"use client"
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import SimulatedEventForm from './components/SimulatedEventForm'
import {Layer } from './components/BoundingBox';
import { Divider, Stack, Typography } from '@mui/material'
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className={styles.main}>
      <Stack>
        <div style={{ width: "80vw", height: "80vh", background: "black" }}>
          <Canvas>
            <OrthographicCamera makeDefault position={[0, 0, 200]}/>
            <Layer />
          </Canvas>
        </div>
      </Stack>
    </main>
  )
}
