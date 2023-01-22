import { Box, IconButton, Paper, Stack, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { GameStatus, Player } from '../types'
import { useBlocks } from '../hooks/useBlocks'
import { getCollision } from '../utils/getCollision'
import { OpenInFull, CloseFullscreen } from '@mui/icons-material'
import { useFullscreen } from '../../../hooks/useFullscreen'
import { Dialogs } from './Dialogs'
import { useCanvas } from '../hooks/useCanvas'

export const Game_v3 = () => {
  const fullscreen = useFullscreen()
  const [frame, setFrame] = useState(0)
  const [status, setStatus] = useState<GameStatus>('start')
  const { canvasElement, canvas } = useCanvas()
  const frameId = useRef(0)
  const playerRef = useRef<Player>({
    x: 0,
    y: 0,
    h: canvas.width / 10,
    w: canvas.width / 10,
    move: canvas.width / 20,
    speed: 2,
    progress: 0,
    gravity: 0.5,
  })
  const { blocks, createLevel } = useBlocks({
    canvas,
    x: playerRef.current.speed,
    frame,
    status,
  })

  useEffect(() => {
    playerRef.current = {
      ...playerRef.current,
      x: playerRef.current.w,
      y: playerRef.current.w,
      h: canvas.width / 20,
      w: canvas.width / 20,
      move: canvas.width / 80,
    }
  }, [canvas])

  const renderFrame = () => {
    setFrame(f => f + 1)

    playerRef.current.y += playerRef.current.gravity

    if (blocks.current.length === 0) {
      setStatus('finish')
    }

    const collision = getCollision(blocks.current, playerRef.current, {
      width: canvas.width,
      height: canvas.height,
    })

    if (collision) {
      setStatus('gameover')
    }

    if (canvasElement.current === null) return

    const ctx = canvasElement.current.getContext('2d')

    if (ctx === null) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

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
    if (canvas === null) return

    playerRef.current.y = 0
  }

  useEffect(() => {
    if (status !== 'run') return

    frameId.current = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(frameId.current)
  }, [status])

  const liftPlayerUp = () => {
    playerRef.current.y -= playerRef.current.move
  }

  useEffect(() => {
    const action = ({ key }: KeyboardEvent) => {
      if ([' ', 'ArrowUp'].includes(key)) {
        liftPlayerUp()
      }
    }

    window.addEventListener('keyup', action)

    return () => window.removeEventListener('keyup', action)
  }, [])

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box
        sx={{
          margin: 'auto',
          p: '10px',
        }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            sx={{
              mt: fullscreen.enabled ? undefined : 2,
              width: canvas?.width,
            }}>
            <canvas
              ref={canvasElement}
              onClick={liftPlayerUp}
              onContextMenu={ev => {
                ev.preventDefault()
                setStatus(s => (s === 'pause' ? 'run' : 'pause'))
              }}
            />
          </Paper>
        </Box>
      </Box>
      <Dialogs
        status={status}
        updateStatus={setStatus}
        restorePlayer={restorePlayer}
        restartLevel={createLevel}
      />
      <Box sx={{ position: 'absolute', right: 100, top: 50 }}>
        <IconButton sx={{ height: 54, width: 54 }} onClick={fullscreen.toggle}>
          {fullscreen.enabled ? <CloseFullscreen /> : <OpenInFull />}
        </IconButton>
      </Box>
      <Box sx={{ position: 'absolute', left: 100, top: 50 }}>
        <TextField
          defaultValue={status}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
    </Box>
  )
}
