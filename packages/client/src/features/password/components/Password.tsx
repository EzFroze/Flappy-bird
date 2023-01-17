import React from 'react'
import {
  Stack,
  Container,
  Box,
  Avatar,
  Typography,
  Button,
} from '@mui/material'
import { ListChild } from '../../profile/components/ListChild'
import userAvatar from '../../../assets/img/userAvatar.jpg'

export const Password: React.FC = () => {
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        backgroundColor: '#131517',
        height: '100vh',
        pt: '6rem',
      }}>
      <Box
        sx={{
          width: 885,
          height: 550,
          backgroundColor: '#212329',
          m: '0 auto',
          borderRadius: 3,
        }}>
        <Container
          sx={{
            p: 2,
          }}>
          <Avatar
            alt="Remy Sharp"
            src={userAvatar}
            sx={{ width: 120, height: 120, m: 'auto' }}
          />
          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 600,
              mt: 1,
            }}
            color="white"
            align="center">
            {'Name'}
          </Typography>
          <Stack color="white" spacing={1} component="nav">
            <ListChild label="Старый пароль" disabled={false} />
            <ListChild label="Новый пароль" disabled={false} />
            <ListChild label="Подтвердите пароль" disabled={false} />
          </Stack>
          <Box sx={{ mt: '4rem', ml: '13rem' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#176acb',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: 16,
                p: 1,
                width: 350,
              }}>
              Сохранить
            </Button>
          </Box>
        </Container>
      </Box>
    </Container>
  )
}
