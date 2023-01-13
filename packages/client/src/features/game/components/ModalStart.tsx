import { Box, Button, Modal } from "@mui/material"
import { ModalStartProps } from "../types"

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

export const ModalStart: React.FC<ModalStartProps> = ({
  launched, setLaunched, setPaused
}) => {
  return <Modal open={!launched}>
    <Box sx={modalStyle}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setLaunched(true)
            setPaused(false)
          } }>
          Начать
        </Button>
      </Box>
    </Box>
  </Modal>
}