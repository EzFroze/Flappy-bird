import { useEffect } from 'react'
import { oAuthAutorize } from '../services/oauth'
import { fetchGetUser } from '../../../features/profile/services/GetUser'
import { useSet } from '../../../app/store/hooks'
import { getOAuthUrl, getServiceId } from '../services/oauth'
import { useSearchParams } from 'react-router-dom'
import { Box, Button } from '@mui/material'

export const OAuth: React.FC = () => {
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
        flexDirection: 'column',
        gap: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
      }}>
      <Button
        type="button"
        onClick={handleOAuth}
        fullWidth
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
        Войти с Яндекс ID
      </Button>
    </Box>
  )
}
