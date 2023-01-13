import { Box, Button, Modal, Stack, Typography } from "@mui/material"
import { ModalOverProps } from "../types"

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

export const ModalGameOver: React.FC<ModalOverProps> = ({
  gameOver, frame
}) => {
  return (
    <Modal open={gameOver}>
    <Box sx={modalStyle}>
      <Stack sx={{ textAlign: 'center' }} gap={2}>
        <Typography variant="h2" sx={{ color: 'red' }}>
          Game Over
        </Typography>
        <Typography variant="h4">Набрано: {frame} балла</Typography>
        <Stack direction={'row'} justifyContent={'center'} gap={2}>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}>
            Повторить
          </Button>
          <Button variant="contained">Таблица лидеров</Button>
          <Button variant="contained">Выйти</Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>
  )
}