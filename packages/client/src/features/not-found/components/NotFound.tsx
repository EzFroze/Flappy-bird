import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { NotFoundTypes } from '../types'
import { Typography, Container, Box, Link as MuiLink } from '@mui/material'

export const NotFound: React.FC<NotFoundTypes> = ({
  title,
  description,
  link,
  linkText,
}) => {
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
          }}
          align="center"
          color="primary">
          {title}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
          }}
          align="center"
          color="primary">
          {description}
        </Typography>

        <MuiLink
          color="#fff"
          component={RouterLink}
          to={link}
          type="button"
          variant="button"
          underline="none"
          sx={{
            display: 'block',
            textAlign: 'center',
            fontSize: 16,
            padding: '6px 16px',
            lineHeight: 1.75,
            textTransform: 'uppercase',
            borderWidth: '3px',
            borderRadius: '10px',
            mt: 2,
            backgroundColor: '#2a2f3f',
            '&:hover': {
              background: '#1976d2',
            },
          }}>
          {linkText}
        </MuiLink>
      </Box>
    </Container>
  )
}
