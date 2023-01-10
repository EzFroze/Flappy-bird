import React, { useState } from 'react'
import {
  Container,
  Box,
  Avatar,
  Typography,
  List,
  Input,
  Link,
} from '@mui/material'
import { ListChild } from './ListItem'
import { ButtonPrim } from '../../profile-pass-change/components/Button'

export const Profile: React.FC = () => {
  const [modal, setModal] = useState(false)
  const closeModal = () => setModal(false)
  const openModal = () => setModal(true)
  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          backgroundColor: '#131517',
          height: '100vh',
          pt: '3rem',
        }}>
        <Box
          sx={{
            width: 885,
            height: 690,
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
              onClick={openModal}
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
              <ListChild label="Почта" text="ard@mail.ru" disabled="true" />
              <ListChild label="Имя" text="Иван" disabled="true" />
              <ListChild label="Фамилия" text="Иванов" disabled="true" />
              <ListChild label="Логин" text="Иван" disabled="true" />
              <ListChild label="Телефон" text="+79998887766" disabled="true" />
              <Box sx={{ mt: '6rem' }}>
                <Link
                  sx={{
                    color: '#176acb',
                    fontWeight: '600',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '16px',
                    display: 'block',
                    cursor: 'pointer',
                    mb: '.5rem',
                  }}
                  underline="none"
                  onClick={openModal}>
                  Изменить аватар
                </Link>
                <Link
                  sx={{
                    color: '#176acb',
                    fontWeight: '600',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '16px',
                    display: 'block',
                    mb: '.5rem',
                  }}
                  underline="none"
                  href="/profile-pass-change">
                  Изменить пароль
                </Link>
                <Link
                  sx={{
                    fontWeight: '600',
                    fontFamily: "'Open Sans', sans-serif",
                    fontSize: '16px',
                    display: 'block',
                  }}
                  color="error"
                  underline="none"
                  href="/">
                  Выйти
                </Link>
              </Box>
            </List>
          </Container>
        </Box>
      </Container>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          zIndex: '999',
          backgroundColor: '#131517cc',
          position: 'fixed',
          display: modal ? 'block' : 'none',
          top: '0',
        }}
        onClick={e => {
          if (e.target === e.currentTarget) {
            closeModal()
          }
        }}>
        <Box
          sx={{
            width: '450px',
            height: '200px',
            color: 'white',
            backgroundColor: '#212329',
            borderRadius: '10px',
            m: '15.5rem auto auto',
            p: '15px',
            textAlign: 'center',
          }}>
          <Typography variant="h5" sx={{ fontWeight: '600', mt: '1rem' }}>
            Загрузите ваш аватар
          </Typography>
          <form id="avatar-form">
            <Input
              id="avatar"
              type="file"
              name="avatar"
              sx={{ mt: '1.5rem', color: 'white' }}
              onClick={closeModal}
            />
            <Box sx={{ mt: '2rem' }}>
              <ButtonPrim text="Сохранить" />
            </Box>
          </form>
        </Box>
      </Box>
    </>
  )
}
