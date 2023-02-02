import React, { FormEvent } from 'react'
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
import { passChange } from '../services/ChangePassServ'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../app/store/hooks'
import { getUser } from '../../profile/services/authSlice'
import { BASE_URL } from '../../../app/api/variables'

export const Password: React.FC = () => {
  const navigate = useNavigate()
  const user = useStore(getUser)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data: any = {}
    formData.forEach((key, value) => (data[value] = key))
    passChange(data)
      .then(resp => {
        if (resp.status === 200) {
          navigate('/profile')
        } else {
          // TODO: Добавить обработку ошибок и вывода пользователю
        }
      })
      .catch(() => navigate('/500'))
  }
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
            alt="User Avatar"
            src={
              user.data?.avatar
                ? `${BASE_URL}/resources/${user.data?.avatar}`
                : userAvatar
            }
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
            {user.data?.first_name}
          </Typography>
          <form id="passChange" onSubmit={handleSubmit}>
            <Stack color="white" spacing={1} component="nav">
              <ListChild label="Старый пароль" name="oldPassword" />
              <ListChild label="Новый пароль" name="newPassword" />
              <ListChild label="Подтвердите пароль" />
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
                }}
                type="submit">
                Сохранить
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </Container>
  )
}
