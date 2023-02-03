import React, { FormEvent, useState } from 'react'
import {
  Container,
  Box,
  Avatar,
  Typography,
  Input,
  Link,
  Button,
  Modal,
} from '@mui/material'
import userAvatar from '../../../assets/img/userAvatar.jpg'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ListChild } from './ListChild'
import { Stack } from '@mui/system'
import { avatarChange } from '../services/ChangeAvatar'
import { logout } from '../services/LogOut'
import { getUser, clearUser } from '../services/authSlice'
import { RoutesEnum } from '../../../app/router/types'
import { useStore, useSet } from '../../../app/store/hooks'
import { BASE_URL } from '../../../app/api/variables'
import { fetchGetUser } from '../services/GetUser'

export const Profile: React.FC = () => {
  const set = useSet()
  const user = useStore(getUser)
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const toggleModal = () => setModal(!modal)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    avatarChange(form)
      .then(resp => {
        if (resp.status === 200) {
          toggleModal()
          navigate(RoutesEnum.Profile)
          set(fetchGetUser())
        } else {
          // TODO: Добавить обработку ошибок и вывода пользователю
        }
      })
      .catch(() => navigate(RoutesEnum.ServerError))
  }

  const handleLogOut = () => {
    logout()
      .then(resp => {
        if (resp.status === 200) {
          set(clearUser())
        }
      })
      .catch(() => navigate(RoutesEnum.ServerError))
  }

  return (
    <>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          backgroundColor: '#131517',
          height: '100vh',
          pt: 3,
        }}>
        <Box
          sx={{
            width: 885,
            height: 750,
            backgroundColor: '#212329',
            m: '0 auto',
            borderRadius: 3,
          }}>
          <Container
            sx={{
              p: 3,
            }}>
            <Avatar
              alt="User Avatar"
              src={
                user.data?.avatar
                  ? `${BASE_URL}/resources/${user.data?.avatar}`
                  : userAvatar
              }
              sx={{ width: 120, height: 120, m: 'auto' }}
              onClick={toggleModal}
            />
            <Typography
              sx={{
                fontSize: 21,
                fontWeight: 600,
                mt: 2,
              }}
              color="white"
              align="center">
              {user.data?.first_name}
            </Typography>
            <Stack color="white" spacing={1} component="nav">
              <ListChild label="Почта" defaultVal={user.data?.email} />
              <ListChild label="Имя" defaultVal={user.data?.first_name} />
              <ListChild
                label="Имя в игре"
                defaultVal={user.data?.display_name}
              />
              <ListChild label="Фамилия" defaultVal={user.data?.second_name} />
              <ListChild label="Логин" defaultVal={user.data?.login} />
              <ListChild label="Телефон" defaultVal={user.data?.phone} />
            </Stack>
            <Box mt={4} color="#176acb" fontWeight={600} fontSize={16}>
              <Link
                mb={1}
                sx={{
                  fontFamily: "'Open Sans', sans-serif",
                  display: 'block',
                  cursor: 'pointer',
                }}
                underline="none"
                onClick={toggleModal}>
                Изменить аватар
              </Link>
              <Link
                mb={1}
                sx={{
                  fontFamily: "'Open Sans', sans-serif",
                  display: 'block',
                }}
                component={RouterLink}
                underline="none"
                to={RoutesEnum.Password}>
                Изменить пароль
              </Link>
              <Link
                mb={1}
                sx={{
                  fontFamily: "'Open Sans', sans-serif",
                  display: 'block',
                }}
                component={RouterLink}
                underline="none"
                to={RoutesEnum.ProfileChange}>
                Изменить данные
              </Link>
              <Link
                mb={1}
                sx={{
                  fontFamily: "'Open Sans', sans-serif",
                  display: 'block',
                }}
                color="error"
                underline="none"
                onClick={handleLogOut}>
                Выйти
              </Link>
            </Box>
          </Container>
        </Box>
      </Container>
      <Modal
        sx={{
          backgroundColor: '#131517cc',
        }}
        open={modal}
        onClose={toggleModal}>
        <Box
          sx={{
            width: 450,
            height: 200,
            color: 'white',
            backgroundColor: '#212329',
            borderRadius: 3,
            m: '15.5rem auto auto',
            p: 1,
            textAlign: 'center',
          }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mt: 2 }}>
            Загрузите ваш аватар
          </Typography>
          <form id="avatar-form" onSubmit={handleSubmit}>
            <Input
              id="avatar"
              type="file"
              name="avatar"
              sx={{ mt: 3, color: 'white' }}
            />
            <Box sx={{ mt: 4 }}>
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
        </Box>
      </Modal>
    </>
  )
}
