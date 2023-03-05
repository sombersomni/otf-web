"use client"
import { useImage } from 'react-image';
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import SimulatedEventForm from './components/SimulatedEventForm'
// import {Example} from './components/BoundingBox';
import { Divider, Stack, Typography } from '@mui/material'

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
        {/* <Example /> */}

      </Stack>
    </main>
  )
}
