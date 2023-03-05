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
      <Stack spacing={4} direction="row" alignContent="center">
        <Stack
          sx={{ width: '25vw' }}
          spacing={2}
          divider={<Divider orientation="horizontal" flexItem />}
        >
          <Stack>
            <Typography variant="h4" gutterBottom>
              Simulate a Generated Post
            </Typography>
            <Typography variant="body1" gutterBottom>
              Generate a social posted based on the simulated values below.
            </Typography>
          </Stack>
          <SimulatedEventForm />
        </Stack>
        <div style={{ width: 600, height: 800, background: "black" }}>
          <Canvas>
            <OrthographicCamera makeDefault position={[0, 0, 200]}/>
            <Layer />
          </Canvas>
        </div>
      </Stack>
    </main>
  )
}
