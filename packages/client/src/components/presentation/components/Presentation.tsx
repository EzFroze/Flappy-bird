import React from 'react'
import { Box, Typography } from '@mui/material'
import { SpaceBar, ArrowUpward } from '@mui/icons-material'
import forest from '/background/forest.png'
import bird_1 from '/bird/frame-1.png'
import bird_2 from '/bird/frame-2.png'

export const Presentation: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: 'auto',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '10px',
          borderRadius: '25px',
        }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bolder',
          }}
          color="black"
          align="center">
          {'Flappy-bird'}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bolder',
          }}
          color="black"
          align="center">
          {'Просто жми '}
          <SpaceBar /> {'или'} <ArrowUpward />
        </Typography>
        <Box
          sx={{
            borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
            width: '40vh',
            height: '40vh',
            position: 'relative',
            overflow: 'hidden',
          }}>
          <img
            src={forest}
            style={{
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'translateX(100%)',
              animationName: 'forest2',
              animationDuration: '20s',
              animationIterationCount: '1',
              animationTimingFunction: 'linear',

              animationDelay: '0s',
            }}></img>
          <img
            src={forest}
            style={{
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'translateX(100%)',
              animationName: 'forest',
              animationDuration: '40s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDelay: '0s',
            }}></img>
          <img
            src={forest}
            style={{
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              transform: 'translateX(100%)',
              animationName: 'forest',
              animationDuration: '40s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDelay: '20s',
            }}></img>

          <img
            src={bird_1}
            style={{
              width: '20%',
              height: '20%',
              position: 'absolute',
              top: '40%',
              left: '40%',

              transform: 'translateX(0px)',
              animationName: 'bird1, birdY',
              animationDuration: '0.3s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDelay: '0s',
            }}></img>
          <img
            src={bird_2}
            style={{
              width: '20%',
              height: '20%',
              position: 'absolute',
              top: '40%',
              left: '40%',
              opacity: '0',
              transform: 'translateY(0px)',
              animationName: 'bird2, birdY',
              animationDuration: '0.3s',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDelay: '0s',
            }}></img>
        </Box>
      </Box>
    </>
  )
}
