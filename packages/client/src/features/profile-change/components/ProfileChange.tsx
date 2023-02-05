import React, { FormEvent, useState } from 'react'
import {
  Container,
  Box,
  Avatar,
  Typography,
  Input,
  Button,
  Modal,
} from '@mui/material'
import userAvatar from '../../../assets/img/userAvatar.jpg'
import { useNavigate } from 'react-router-dom'
import { ListChild } from '../../profile/components/ListChild'
import { Stack } from '@mui/system'
import { avatarChange } from '../../profile/services/ChangeAvatar'
import { getUser } from '../../profile/services/authSlice'
import { RoutesEnum } from '../../../app/router/types'
import { useStore, useSet } from '../../../app/store/hooks'
import { BASE_URL } from '../../../app/api/variables'
import { profileChange } from '../services/ProfileChange'
import { fetchGetUser } from '../../profile/services/GetUser'

export const ProfileChange: React.FC = () => {
  const set = useSet()
  const user = useStore(getUser)
  const [modal, setModal] = useState(false)
  const navigate = useNavigate()
  const toggleModal = () => setModal(!modal)
  const handleSubmitAvatar = (e: FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    avatarChange(form)
      .then(resp => {
        if (resp.status === 200) {
          toggleModal()
          navigate(RoutesEnum.ProfileChange)
          set(fetchGetUser())
        } else {
          // TODO: Добавить обработку ошибок и вывода пользователю
        }
      })
      .catch(() => navigate(RoutesEnum.ServerError))
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const form = new FormData(e.target as HTMLFormElement)
    profileChange(Object.fromEntries(form.entries()) as any)
      .then(resp => {
        if (resp.status === 200) {
          navigate('/profile')
          set(fetchGetUser())
        } else {
          // TODO: Добавить обработку ошибок и вывода пользователю
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
          pt: 6,
        }}>
        <Box
          sx={{
            width: 885,
            height: 690,
            backgroundColor: '#212329',
            m: '0 auto',
            borderRadius: 3,
          }}>
          <Box
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
            <form id="profileChange" onSubmit={handleSubmit}>
              <Stack color="white" spacing={1} component="nav">
                <ListChild label="Почта" name="email" text={user.data?.email} />
                <ListChild
                  label="Имя"
                  name="first_name"
                  text={user.data?.first_name}
                />
                <ListChild
                  label="Имя в игре"
                  name="display_name"
                  text={user.data?.display_name}
                />
                <ListChild
                  label="Фамилия"
                  name="second_name"
                  text={user.data?.second_name}
                />
                <ListChild label="Логин" name="login" text={user.data?.login} />
                <ListChild
                  label="Телефон"
                  name="phone"
                  text={user.data?.phone}
                />
              </Stack>
              <Box sx={{ mt: '2rem', ml: '16rem' }}>
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
          <form id="avatar-form" onSubmit={handleSubmitAvatar}>
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
