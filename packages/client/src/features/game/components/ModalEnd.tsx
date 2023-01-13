import { Box, Button, Modal, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ModalEndProps } from '../types'

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const ModalEnd: React.FC<ModalEndProps> = ({
  ended,
  isLastLevel,
  goNextLevel,
}) => {
  const navto = useNavigate()

  return (
    <Modal open={ended}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack gap={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h2">Поздравляем!</Typography>
            <Typography variant="h4">
              {isLastLevel ? 'Вы прошли игру!' : 'Вы прошли уровень!'}
            </Typography>
            <Stack direction="row" gap={4}>
              {!isLastLevel && (
                <Button onClick={goNextLevel} variant="contained">
                  Следующий уровень
                </Button>
              )}
              <Button variant="contained">Таблица лидеров</Button>
              <Button onClick={() => navto('/menu')} variant="contained">
                Выйти в меню
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  )
}
