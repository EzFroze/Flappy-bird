import React from 'react'
import { Button } from '@mui/material'
import { Buttons } from '../types'
export const ButtonPrim: React.FC<Buttons> = ({ text, width }) => {
  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#176acb',
          textTransform: 'none',
          fontWeight: '700',
          fontSize: '16px',
          p: '10px',
          width: width ?? '350px',
          display: 'inline',
        }}>
        {text}
      </Button>
    </>
  )
}
