import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Container,
  Box,
  Button,
  Typography,
  Link as MuiLink,
  FormHelperText,
} from '@mui/material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { validatePassword, validateLogin } from '../../../utils/validation'
import { SignInData } from '../types'
import { Input } from '../../../components/input/components/Input'
import { PasswordInput } from '../../../components/passwordInput/components/PasswordInput'
import { signin } from '../services/SignIn'
import { getUser } from '../../profile/services/GetUser'
import { useServerError } from '../../../hooks/useServerError'
import { RoutesEnum } from '../../../app/router/types'

export const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onChange',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const onSubmit = (data: SignInData) => {
    signin(data)
      .then(response => {
        if (response.status === 200) {
          navigate('/game')
        } else {
          return response.json()
        }
      })
      .then(result => {
        setServerError(`⚠ ${result.reason}`)
      })
      .catch(useServerError)
  }

  useEffect(() => {
    getUser().then(response => {
      if (response.status === 200) {
        navigate('/game')
      }
    })
  }, [])

  return (
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
          variant="h4"
          sx={{
            fontWeight: 'bolder',
          }}
          color="black"
          align="center">
          {'Enter to your account'}
        </Typography>
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: 16,
          }}>
          {serverError}
        </FormHelperText>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="login"
            control={control}
            rules={validateLogin}
            errors={errors}
            label="Введите Логин"
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
            Войти
          </Button>
          <MuiLink
            color="#fff"
            component={RouterLink}
            to={RoutesEnum.SignUp}
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
            Зарегистрироваться
          </MuiLink>
        </form>
      </Box>
    </Container>
  )
}
