import React from 'react'
import { Link } from 'react-router-dom'
import { default as UILink } from '@mui/material/Link'

export const SignIn: React.FC = () => {
  return (
    <Link to="/sign-up">
      <UILink>Авторизация</UILink>
    </Link>
  )
}
