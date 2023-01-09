import {
  Box,
  Button,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { flexbox, textAlign } from '@mui/system'
import { useEffect, useRef, useState } from 'react'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export const Game_v2: React.FC = () => {
  const [launched, setLaunched] = useState(false)
  const [ended, setEnded] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  // state =============================
  const [frame, setFrame] = useState(0)
  const [canvas, setCanvas] = useState({
    width: 900,
    height: 400,
  })
  const [paused, setPaused] = useState(true)
  const [player, setPlayer] = useState({
    x: 200,
    y: 100,
    width: 100,
    height: 100,
    gravity: 1,
  })
  const [block, setBlock] = useState({
    x: canvas.width,
    y: canvas.height - 120,
    width: 150,
    height: 120,
  })
  const [collision, setCollision] = useState(false)

  // refs ===============================
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // coefficients =======================
  const speedCoef = 1

  // engine =============================
  const drawFrame = (ctx: CanvasRenderingContext2D, frame: number) => {
    const speed = frame * speedCoef

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // enemy block
    setBlock(block => ({ ...block, x: ctx.canvas.width - speed }))

    const blocks = new Array(3)
      .fill(null)
      .map((_, i) => {
        return {
          // расстояние между блоками
          x: block.x + 2 * i * block.width,
          y: i === 1 ? 0 : block.y,
          w: block.width,
          h: block.height,
        } // оптимизация количества блоков за левым краем канваса
      })
      .filter(block => block.x + block.w > 0)

    const getColIndex = () => {
      return blocks.findIndex(block => {
        const playerLeft = player.x
        const playerRight = player.x + player.width
        const blockLeft = block.x
        const blockRight = block.x + block.w

        const playerTop = player.y
        const playerBottom = player.y + player.height
        const blockTop = block.y
        const blockBottom = block.y + block.h

        let intersectedVertically = false

        if (playerRight > blockLeft && playerRight < blockRight) {
          intersectedVertically = true
        }

        if (playerLeft > blockLeft && playerLeft < blockRight) {
          intersectedVertically = true
        }

        if (blockTop === 0) {
          return playerTop < blockBottom && intersectedVertically
        }

        if (blockBottom === canvas.height) {
          return playerBottom > blockTop && intersectedVertically
        }
      })
    }

    blocks.forEach(({ x, y, w, h }, i) => {
      ctx.fillStyle = i === getColIndex() ? '#821b1b' : '#00955c'
      ctx.fillRect(x, y, w, h)
    })

    // player block
    ctx.fillStyle = getColIndex() >= 0 ? '#821b1b' : '#004395'
    ctx.fillRect(player.x, player.y, player.width, player.height)

    if (getColIndex() > -1) {
      setPaused(true)
      setGameOver(true)
    }

    if (blocks.length === 0) {
      setPaused(true)
      setEnded(true)

      return
    }
  }

  // player gravity change
  useEffect(() => {
    if (paused) return

    setPlayer(p => ({ ...p, y: player.y /* + player.gravity */ }))
  }, [paused, frame])

  useEffect(() => {
    if (paused) return

    let frameId: any = null

    const ctx = canvasRef.current?.getContext('2d')

    if (!ctx) return

    const render = () => {
      setFrame(frame + 1)
      drawFrame(ctx, frame)

      frameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(frameId)
    }
  }, [paused, frame])

  return (
    <>
      <TextField label="frames" value={frame} sx={{ width: 100 }} />
      <div style={{ marginTop: 20 }}>
        <canvas
          style={{ outline: '1px solid silver' }}
          ref={canvasRef}
          width={canvas.width}
          height={canvas.height}
          onClick={() => setPlayer(p => ({ ...p, y: p.y - 50 }))}
          onContextMenu={ev => {
            ev.preventDefault()
            setPlayer(p => ({ ...p, y: p.y + 50 }))
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 20 }}>
        <Button
          variant="contained"
          onClick={() => setPaused(!paused)}
          sx={{ width: 100 }}>
          {paused ? 'play' : 'pause'}
        </Button>
        <Button
          variant="contained"
          onClick={() => window.location.reload()}
          sx={{ width: 100 }}>
          {'Reload'}
        </Button>
      </div>
      {
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
                  onClick={() => window.location.reload()}
                >
                  Повторить
                </Button>
                <Button variant="contained">Таблица лидеров</Button>
                <Button variant="contained">Выйти</Button>
              </Stack>
            </Stack>
          </Box>
        </Modal>
      }
      {
        <Modal open={!launched}>
          <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  setLaunched(true)
                  setPaused(false)
                }}>
                Начать
              </Button>
            </Box>
          </Box>
        </Modal>
      }
      {
        <Modal open={ended}>
          <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack gap={4} sx={{ textAlign: 'center'  }}>
                <Typography variant='h2'>Поздравляем!</Typography>
                <Typography variant='h4'>Вы прошли уровень!</Typography>
                <Stack direction='row' gap={4}>
                  <Button 
                    variant='contained'>Следующий уровень</Button>
                  <Button variant='contained'>Таблица лидеров</Button>
                  <Button variant='contained'>Закончить игру</Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Modal>
      }
    </>
  )
}
