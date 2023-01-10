import React from 'react'
import { Container, Box, Avatar, Typography, List, Button } from '@mui/material'
import { ListChild } from '../../profile/components/ListItem'
import { ButtonPrim } from './Button'

export const ProfilePassChange: React.FC = () => {
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
          borderRadius: '10px',
        }}>
        <Container
          sx={{
            p: '1.5rem',
          }}>
          <Avatar
            alt="Remy Sharp"
            src="https://thumbs.dreamstime.com/b/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C-%D1%81%D0%BC%D0%B8-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%B0-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B0-%D0%BF%D1%80%D0%BE%D1%84%D0%B8%D0%BB%D1%8F-%D0%B0%D0%B2%D0%B0%D1%82%D0%B0%D1%80%D1%8B-%D0%BF%D0%BE-%D1%83%D0%BC%D0%BE%D0%BB%D1%87%D0%B0%D0%BD%D0%B8%D1%8E-176256935.jpg"
            sx={{ width: '120px', height: '120px', m: 'auto' }}
          />
          <Typography
            sx={{
              fontSize: '21px',
              fontWeight: '600',
              mt: '1rem',
            }}
            color="white"
            align="center">
            {'Name'}
          </Typography>
          <List
            sx={{
              m: '1rem',
              color: 'white',
              p: ' 0 2rem',
            }}
            component="nav">
            <ListChild label="Старый пароль" disabled="false" />
            <ListChild label="Новый пароль" disabled="false" />
            <ListChild label="Подтвердите пароль" disabled="false" />
            <Box sx={{ mt: '4rem', ml: '13rem' }}>
              <ButtonPrim text="Сохранить" />
            </Box>
          </List>
        </Container>
      </Box>
    </Container>
  )
}
