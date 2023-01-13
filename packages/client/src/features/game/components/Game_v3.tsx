import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Paper,
  Stack,
  TextField,
} from '@mui/material'
import { Container } from '@mui/system'
import { useEffect, useRef, useState } from 'react'
import { GameStatus, Player, Position } from '../types'
import { useLevels } from '../hooks/useLevels'

export const Game_v3 = () => {
  const canvasSize = { width: 800, height: 400 }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameId = useRef<any>()
  const { blocks, setLevel, isLastLevel, restartLevel, levels, level } =
    useLevels(canvasSize)
  const playerY = canvasSize.height / 2 - 75
  const playerRef = useRef<Player>({
    x: 20,
    y: playerY,
    h: 50,
    w: 50,
    move: 20,
  })
  const [status, setStatus] = useState<GameStatus>({
    started: false,
    ended: false,
    overed: false,
    paused: false,
    speed: 4,
    progress: 0,
    gravity: 1,
  })
  const updateStatus = (obj: Partial<Record<keyof GameStatus, any>>) => {
    setStatus(status => ({ ...status, ...obj }))
  }

  const renderFrame = () => {
    if (canvasRef.current === null) return

    blocks.current = blocks.current
      .map(block => {
        return {
          ...block,
          x: block.x - status.speed,
        }
      })
      .filter(({ x, w }) => x + w > 0)

    playerRef.current.y += status.gravity

    updateStatus({
      progress: `${blocks.current.length / 2} / ${levels[level].length}`,
    })

    if (blocks.current.length === 0) {
      updateStatus({ ended: true, paused: true })
    }

    // collision
    const collision = blocks.current
      .filter((_b, i) => i < 4)
      .find(block => {
        const player = playerRef.current

        const playerLeft = player.x
        const playerRight = player.x + player.w
        const blockLeft = block.x
        const blockRight = block.x + block.w

        const playerTop = player.y
        const playerBottom = player.y + player.h
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

        if (blockBottom === canvasSize.height) {
          return playerBottom > blockTop && intersectedVertically
        }
      })

    if (collision) {
      updateStatus({ paused: true, overed: true })
    }

    const ctx = canvasRef.current.getContext('2d')

    if (ctx === null) return

    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)

    blocks.current.forEach(({ x, y, w, h }) => {
      ctx.fillStyle = '#1bab6d'
      ctx.fillRect(x, y, w, h)
    })

    const { x: px, y: py, h: ph, w: pw } = playerRef.current
    ctx.fillStyle = '#027ca4'
    ctx.fillRect(px, py, pw, ph)
  }

  const tick = () => {
    renderFrame()

    frameId.current = requestAnimationFrame(tick)
  }

  const restorePlayer = () => {
    playerRef.current.y = playerY
  }

  useEffect(() => {
    if (status.paused) return

    frameId.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId.current)
  }, [status.paused])

  useEffect(() => {
    if (!status.started) {
      updateStatus({ paused: true })
    }
  }, [status.started])

  return (
    <Container maxWidth="lg" sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ margin: 'auto' }}>
        <Stack direction={'row'} spacing={2} mt={2}>
          <TextField value={status.progress} label={'progress'} />
          <TextField value={level} label={'level'} />
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper sx={{ mt: 2, width: canvasSize.width }}>
            <canvas
              {...canvasSize}
              ref={canvasRef}
              onClick={() => {
                playerRef.current.y -= playerRef.current.move
              }}
              onContextMenu={ev => {
                ev.preventDefault()
                updateStatus({ paused: !status.paused })
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Dialog open={!status.started}>
        <Button
          onClick={() => {
            updateStatus({ paused: false, started: true })
          }}>
          Старт
        </Button>
      </Dialog>
      <Dialog open={status.ended} sx={{ p: 4 }}>
        <DialogTitle variant="h4">
          Вы прошли {isLastLevel ? 'игру' : 'уровень'}!
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              updateStatus({ ended: false, started: false })
              setTimeout(() => {
                setLevel(level => (isLastLevel ? 0 : level + 1))
              }, 200)
              restorePlayer()
            }}>
            {isLastLevel ? 'Начать заново' : 'Следующий уровень'}
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={status.overed}>
        <DialogTitle>Игра окончена!</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              updateStatus({ paused: false, overed: false })
              restartLevel()
              restorePlayer()
            }}>
            Начать заново
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
