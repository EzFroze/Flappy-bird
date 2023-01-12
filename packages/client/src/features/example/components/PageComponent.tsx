import { useEffect } from 'react'
import { Button } from '@mui/material'
import { logout, getUser } from '../../../app/api/authApi'
import { useNavigate } from 'react-router-dom'

export const PageComponent: React.FC = () => {
  const navigate = useNavigate()
  const handleClick = () => {
    logout()
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          navigate('/')
        } else {
          return response.json()
        }
      })
      .then(result => {
        console.log(result)
      })
      .catch()
  }
  useEffect(() => {
    getUser().then(response => {
      console.log(response)
      if (response.status !== 200) {
        navigate('/')
      }
    })
  }, [])

  return (
    <>
      <Button
        type="button"
        fullWidth
        variant="contained"
        onClick={handleClick}
        sx={{
          borderRadius: '10px',
          fontSize: 16,
          mt: 2,
          backgroundColor: '#2a2f3f',
          '&:hover': {
            background: '#1976d2',
          },
        }}>
        Выйти
      </Button>
    </>
  )
}
