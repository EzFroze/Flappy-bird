import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { NotFoundTypes } from '../types'
import { Typography, Container, Box, Link as MuiLink } from '@mui/material'
import { styles } from '../../profile/styles/styles'

export const NotFound: React.FC<NotFoundTypes> = ({
  title,
  description,
  link,
  linkText,
}) => {
  return (
    <Container component="main" maxWidth="md">
      <Box sx={styles.boxMain}>
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
          sx={styles.link}>
          {linkText}
        </MuiLink>
      </Box>
    </Container>
  )
}
