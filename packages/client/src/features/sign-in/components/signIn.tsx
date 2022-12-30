import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import {
  createTheme,
  ThemeProvider,
  Container,
  CssBaseline,
  Box,
  Button,
  Typography,
  Link as MuiLink,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Input } from './input'
import { PasswordInput } from './passwordInput'
import {
  validateName,
  validateEmail,
  validateLogin,
  validatePhone,
  validatePassword,
} from '../services/validation'
import { SignInData } from '../types'

const theme = createTheme()

export function SignIn() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      first_name: '',
      second_name: '',
      login: '',
      phone: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onChange',
  })

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onSubmit = (data: SignInData) => console.log(data)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          minHeight: '100vh',
          display: 'flex',
        }}>
        <Box
          sx={{
            margin: 'auto',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            padding: '25px',
            borderRadius: '25px',
            width: '400px',
          }}>
          <Typography
            sx={{
              fontSize: '32px',
              fonrWeight: 'bolder',
            }}
            color="black"
            align="center">
            {'Create account'}
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
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
            <PasswordInput
              name="password"
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
                  if (watch('password') != value) {
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
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                borderRadius: '10px',
                fontSize: 16,
                mt: 2,
                backgroundColor: '#2a2f3f',
                '&:hover': {
                  background: '#1976d2',
                },
              }}>
              Создать аккаунт
            </Button>
            <MuiLink
              color="#fff"
              component={RouterLink}
              to={'/sign-up'}
              type="button"
              variant="button"
              underline="none"
              sx={{
                display: 'block',
                textAlign: 'center',
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
              Войти
            </MuiLink>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
