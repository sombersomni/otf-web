"use client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import SimulatedEventForm from './components/SimulatedEventForm'
import { Divider, Stack, Typography } from '@mui/material'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>
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
    </main>
  )
}
