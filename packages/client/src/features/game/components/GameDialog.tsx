
import { Box, Button, Dialog, FormHelperText, IconButton, Slide, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutesEnum } from '../../../app/router/types'
import { useSet, useStore } from '../../../app/store/hooks'
import { DialogProps } from '../types'
import OpenInFull from '@mui/icons-material/OpenInFull';
import CloseFullscreen from '@mui/icons-material/CloseFullscreen';
import { toggleFullscreen, updateFullscreen } from '../services/gameSlice'
import { blue, grey } from '@mui/material/colors'
import { TransitionProps } from '@mui/material/transitions'
import { sendUserResult } from '../../leaderboard/services/leaderboard'
import { getUser } from '../../profile/services/authSlice'
import { useServerError } from '../../../hooks/useServerError'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GameDialog: React.FC<DialogProps> = ({
  title,
  buttonTitle,
  open = false,
  onClick,
  progress,
}) => {

  const goTo = useNavigate()
  const fullscreen = useStore(s => s.game.fullscreen)
  const set = useSet()

  const nav = useNavigate()
  const user = useStore(getUser)
  const { serverError, setError } = useServerError()

  const sendResultToLeaderboard = () => {
    sendUserResult({
      id: user.data.id,
      name: user.data.login,
      avatar: user.data.avatar,
      progress,
    }).then(response => {
      if (response.status === 200) {
        nav(RoutesEnum.Leaderboard)
      } else {
        setError(new Error(`Что-то пошло не так.`))
      }
    })
  }

  return (
    <Dialog 
      open={open}
      TransitionComponent={Transition}
      keepMounted
    >
      <Box sx={{ 
        padding: 8, 
        display: 'flex', flexDirection: 'column', gap: 2,
        alignItems: 'stretch' 
      }}>
        <Typography textAlign={'center'} variant='h5'>
          {title}
        </Typography>
        <Button onClick={onClick} variant='contained' color='secondary'>
            {buttonTitle}
        </Button>

        <Button 
          onClick={() => {
            set(updateFullscreen(false))
            setTimeout(() => {
              goTo(RoutesEnum.Leaderboard)
            }, 100)
          }} 
          variant='contained'
        >
            Таблица рекордов
        </Button>
        {progress ? (
          <Button 
            variant='contained' color='info'
            onClick={sendResultToLeaderboard} >
            {'Сохранить результат'}
          </Button>
        ) : (
          ''
        )}
        <Tooltip title="Изменение разрешения может перезапустить игру" placement='left'>
          <IconButton
            onClick={() => set(toggleFullscreen())}
            sx={{ 
              position: 'absolute', right: 0, top: 0, 
            }}
          >
            { fullscreen ? <CloseFullscreen /> : <OpenInFull />}
          </IconButton>
        </Tooltip>
      </Box>
        <FormHelperText
          sx={{
            color: 'red',
            fontSize: 16,
          }}>
          {serverError}
        </FormHelperText>
    </Dialog>
  )
}
