import React, { FormEvent, useState } from 'react'
import { Container, Box, Avatar, Typography, Button } from '@mui/material'
import { Input } from '../../../components/input/components/Input'
import userAvatar from '../../../assets/img/userAvatar.jpg'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { avatarChange } from '../../profile/services/ChangeAvatar'
import { getUser } from '../../profile/services/authSlice'
import { RoutesEnum } from '../../../app/router/types'
import { useStore, useSet } from '../../../app/store/hooks'
import { BASE_URL } from '../../../app/api/variables'
import { profileChange } from '../services/ProfileChange'
import { fetchGetUser } from '../../profile/services/GetUser'
import { ChangeAvatarModal } from '../../../components/changeAvatarModal/components/ChangeAvatarModal'
import {
  validateName,
  validateEmail,
  validateLogin,
  validatePhone,
} from '../../../utils/validation'

export const ProfileChange: React.FC = () => {
  const set = useSet()
  const user = useStore(getUser)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.data.email ? user.data.email : '',
      first_name: user.data.first_name ? user.data.first_name : '',
      second_name: user.data.second_name ? user.data.second_name : '',
      display_name: user.data.display_name ? user.data.display_name : '',
      login: user.data.login ? user.data.login : '',
      phone: user.data.phone ? user.data.phone : '',
    },
    mode: 'onChange',
  })

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
  const onSubmit = data => {
    profileChange(data)
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
            color="primary"
            align="center">
            {user.data?.first_name}
          </Typography>
          <form id="profileChange" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="email"
              control={control}
              rules={validateEmail}
              errors={errors}
              label="Введите Email"
            />
            <Input
              name="first_name"
              control={control}
              rules={validateName}
              errors={errors}
              label="Введите Имя"
            />
            <Input
              name="second_name"
              control={control}
              rules={validateName}
              errors={errors}
              label="Введите Фамилию"
            />
            <Input
              name="display_name"
              control={control}
              rules={validateName}
              errors={errors}
              label="Имя в игре"
            />
            <Input
              name="login"
              control={control}
              rules={validateLogin}
              errors={errors}
              label="Введите Логин"
            />
            <Input
              name="phone"
              control={control}
              rules={validatePhone}
              errors={errors}
              label="Введите Телефон"
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: '10px',
                fontSize: 16,
                mt: 2,
                color: 'white',
                backgroundColor: '#2a2f3f',
                '&:hover': {
                  background: '#1976d2',
                },
              }}
              type="submit">
              Сохранить
            </Button>
          </form>
        </Box>
      </Container>
      <ChangeAvatarModal
        modal={modal}
        toggleModal={toggleModal}
        handleSubmit={handleSubmitAvatar}
      />
    </>
  )
}

/*<Stack color="white" spacing={1} component="nav">
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
              </Stack>*/
