import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Box,
  Button,
  Typography,
  Link as MuiLink,
  FormHelperText,
} from '@mui/material'
import { useSearchParams, Link as RouterLink } from 'react-router-dom'
import { validatePassword, validateLogin } from '../../../utils/validation'
import { Input } from '../../../components/input/components/Input'
import { PasswordInput } from '../../../components/passwordInput/components/PasswordInput'
import { RoutesEnum } from '../../../app/router/types'
import { useStore } from '../../../app/store/hooks'
import { getUser } from '../../profile/services/authSlice'
import { useSignInSubmit } from '../hooks/useSignInSubmit'
import { useValidationRoute } from '../../../hooks/useValidationRoute'
import { oAuthAutorize } from '../services/oauth'
import { fetchGetUser } from '../../profile/services/GetUser'
import { useSet } from '../../../app/store/hooks'
import { getOAuthUrl, getServiceId } from '../services/oauth'

export const SignIn: React.FC = () => {
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

  const user = useStore(getUser)

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const { onSubmit, serverError } = useSignInSubmit()

  useValidationRoute(RoutesEnum.Game, user)

  const [searchParams] = useSearchParams()

  const handleOAuth = () => {
    getServiceId()
      .then(response => response.json())
      .then(result => window.location.replace(getOAuthUrl(result.service_id)))
  }

  const set = useSet()

  useEffect(() => {
    const code = searchParams.get(`code`)
    if (code) {
      oAuthAutorize(code).then(response => {
        if (response.status === 200) {
          set(fetchGetUser())
        } else {
          return response
        }
      })
    }
  }, [searchParams])

  return (
    <Box
      sx={{
        marginTop: 'auto',
        boxSizing: 'border-box',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '25px',
      }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bolder',
        }}
        color="black"
        align="center">
        {'Вход'}
      </Typography>
      <FormHelperText
        sx={{
          color: 'red',
          fontSize: 16,
        }}>
        {serverError}
      </FormHelperText>

      <form
        style={{ display: 'flex', gap: '10px', flexGrow: 1 }}
        onSubmit={handleSubmit(onSubmit)}>
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
      </form>

      <Button
        type="button"
        onClick={handleOAuth}
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
        Войти с Яндекс ID
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
          width: '100%',
          backgroundColor: '#2a2f3f',
          '&:hover': {
            background: '#1976d2',
          },
        }}>
        Зарегистрироваться
      </MuiLink>
    </Box>
  )
}
