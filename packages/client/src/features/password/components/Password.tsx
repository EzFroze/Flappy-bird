import React, { useState, FormEvent } from 'react'
import { validatePassword } from '../../../utils/validation'
import { PassData } from '../types'
import {
  Container,
  Box,
  Avatar,
  Typography,
  Button,
  FormHelperText,
} from '@mui/material'
import { PasswordInput } from '../../../components/passwordInput/components/PasswordInput'
import userAvatar from '../../../assets/img/userAvatar.jpg'
import { passChange } from '../services/ChangePassServ'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../../app/store/hooks'
import { getUser } from '../../profile/services/authSlice'
import { BASE_URL } from '../../../app/api/variables'
import { RoutesEnum } from '../../../app/router/types'
import { useForm } from 'react-hook-form'
import { useServerError } from '../../../hooks/useServerError'
import { styles } from '../../profile/styles/styles'

export const Password: React.FC = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirm_password: '',
    },
    mode: 'onChange',
  })
  const navigate = useNavigate()
  const user = useStore(getUser)
  const { serverError, setError } = useServerError()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const onSubmit = (data: PassData) => {
    passChange(data)
      .then(resp => {
        if (resp.status === 200) {
          navigate(RoutesEnum.Profile)
        } else {
          setError(new Error(`Что-то пошло не так...`))
        }
      })
      .catch(() => navigate('/500'))
  }
  return (
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
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bolder',
            mt: 1,
          }}
          color="primary"
          align="center">
          {user.data?.first_name}
        </Typography>
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: 16,
          }}>
          {serverError}
        </FormHelperText>
        <form id="passChange" onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            name="oldPassword"
            control={control}
            rules={validatePassword}
            errors={errors}
            label="Введите Пароль"
            handleShow={showPassword}
            handleClick={handleClickShowPassword}
            handleMouseDown={handleMouseDownPassword}
          />
          <PasswordInput
            name="newPassword"
            control={control}
            rules={validatePassword}
            errors={errors}
            label="Введите Пароль"
            handleShow={showPassword}
            handleClick={handleClickShowPassword}
            handleMouseDown={handleMouseDownPassword}
          />
          <PasswordInput
            name="confirm_password"
            control={control}
            rules={{
              required: '⚠ Поле не может быть пустым',
              validate: (value: string) => {
                if (watch('newPassword') != value) {
                  return '⚠ Пароли не совпадают'
                }
              },
            }}
            errors={errors}
            label="Повторите Пароль"
            handleShow={showPassword}
            handleClick={handleClickShowPassword}
            handleMouseDown={handleMouseDownPassword}
          />

          <Button
            variant="contained"
            fullWidth
            sx={styles.button}
            type="submit">
            Сохранить
          </Button>
        </form>
      </Box>
    </Container>
  )
}
