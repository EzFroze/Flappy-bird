import React, { FormEvent, useState } from 'react'
import {
  Container,
  Box,
  Avatar,
  Typography,
  Input,
  Link as MuiLink,
  Button,
} from '@mui/material'
import userAvatar from '../../../assets/img/userAvatar.jpg'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ListProfile } from './ListProfile'
import { Stack } from '@mui/system'
import { avatarChange } from '../services/ChangeAvatar'
import { logout } from '../services/LogOut'
import { getUser, clearUser } from '../services/authSlice'
import { RoutesEnum } from '../../../app/router/types'
import { useStore, useSet } from '../../../app/store/hooks'
import { BASE_URL } from '../../../app/api/variables'
import { fetchGetUser } from '../services/GetUser'
import { ChangeAvatarModal } from '../../../components/changeAvatarModal/components/ChangeAvatarModal'

export const Profile: React.FC = () => {
  const set = useSet()
  const user = useStore(getUser)
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
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
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
            variant="h4"
            sx={{
              fontWeight: 600,
            }}
            align="center"
            color="primary">
            {user.data?.first_name}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <ListProfile label="Почта" defaultVal={user.data?.email} />
            <ListProfile label="Имя" defaultVal={user.data?.first_name} />
            <ListProfile
              label="Имя в игре"
              defaultVal={user.data?.display_name}
            />
            <ListProfile label="Фамилия" defaultVal={user.data?.second_name} />
            <ListProfile label="Логин" defaultVal={user.data?.login} />
            <ListProfile label="Телефон" defaultVal={user.data?.phone} />
          </Box>

          <Button
            type="button"
            fullWidth
            onClick={toggleModal}
            variant="contained"
            sx={{
              borderRadius: '10px',
              fontSize: 16,
              mt: 2,
              color: 'white',
              backgroundColor: '#2a2f3f',
              '&:hover': {
                background: '#1976d2',
              },
            }}>
            Изменить аватар
          </Button>

          <MuiLink
            color="#fff"
            component={RouterLink}
            to={RoutesEnum.Password}
            type="button"
            variant="button"
            underline="none"
            sx={{
              display: 'block',
              textAlign: 'center',
              width: 'calc(100% - 32px)',
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
            Изменить пароль
          </MuiLink>
          <MuiLink
            color="#fff"
            component={RouterLink}
            to={RoutesEnum.ProfileChange}
            type="button"
            variant="button"
            underline="none"
            sx={{
              display: 'block',
              textAlign: 'center',
              width: 'calc(100% - 32px)',
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
            Изменить данные
          </MuiLink>
          <Button
            type="button"
            fullWidth
            onClick={handleLogOut}
            variant="contained"
            sx={{
              borderRadius: '10px',
              fontSize: 16,
              mt: 2,
              color: 'white',
              backgroundColor: '#2a2f3f',
              '&:hover': {
                background: '#1976d2',
              },
            }}>
            Выйти
          </Button>
        </Box>
      </Container>
      <ChangeAvatarModal
        modal={modal}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
      />
    </>
  )
}
