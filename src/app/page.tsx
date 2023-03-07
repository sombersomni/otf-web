"use client"
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import SimulatedEventForm from './components/SimulatedEventForm'
import { Card, CardMedia, CardContent, Container, Typography, CardHeader, Avatar, Paper } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <main className={styles.main}>
      <Container>
        <Grid2
          container
          direction="row"
          rowSpacing={50}
          width="100vw"
          height="100vh"
        >
          <Grid2 xs={6} md={4}>
              <SimulatedEventForm />
          </Grid2>
          <Grid2 xs={6} md={8}>
            <Card sx={{ width: 400 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="post">
                  V
                </Avatar>
              }
              title="Jooking dem boys"
              subheader="September 14, 2016"
            />
              <CardMedia
                component="img"
                height="712"
                image="merged-img.png"
                alt="Social Post"
              />
            </Card>
          </Grid2>
        </Grid2>

      </Container>
    </main>
  )
}
