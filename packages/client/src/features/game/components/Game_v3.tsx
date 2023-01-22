import { Box, IconButton, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { GameStatus, Player } from '../types'
import { useBlocks } from '../hooks/useBlocks'
import { getCollision } from '../utils/getCollision'
import { OpenInFull, CloseFullscreen } from '@mui/icons-material'
import { useFullscreen } from '../../../hooks/useFullscreen'
import { Dialogs } from './Dialogs'
import { useCanvas } from '../hooks/useCanvas'
import { renderBlock, renderGround } from '../utils/worldRender'
import wingUpFrame from '/bird/frame-1.png'
import wingDownFrame from '/bird/frame-2.png'
import forest from '/background/forest.png'

export const Game_v3 = () => {
  const fullscreen = useFullscreen()
  const [frame, setFrame] = useState(0)
  const [status, setStatus] = useState<GameStatus>('start')
  const canvas = useCanvas()
  const frameId = useRef(0)
  const playerRef = useRef<Player>({
    x: 0,
    y: 0,
    h: 20,
    w: 20,
    move: 20,
    speed: 1,
    progress: 0,
    gravity: 1,
    wave: 0,
  })
  const { blocks, createLevel } = useBlocks({
    canvas: canvas.current,
    x: playerRef.current.speed,
    frame,
    status,
  })
  const backgroundPosition = useRef({
    first: 0,
    second: 0,
  })

  useEffect(() => {
    if (canvas.current === null) return

    backgroundPosition.current.second = canvas.current.width
  }, [canvas.current?.width])

  useEffect(() => {
    if (canvas.current === null) return

    const coef = canvas.current.width / 15

    playerRef.current = {
      ...playerRef.current,
      x: coef,
      y: coef,
      h: coef,
      w: coef,
      move: coef / 1.2,
    }

    if (status !== 'start') {
      setStatus('screenChanged')
    }
  }, [canvas.current?.width, fullscreen.enabled])

  useEffect(() => {
    if (status === 'pause') return

    const id = setInterval(() => {
      playerRef.current.wave += 1
    }, 150)

    return () => clearInterval(id)
  }, [status])

  useEffect(() => {
    createLevel()
  }, [fullscreen.enabled])

  const renderFrame = () => {
    if (canvas.current === null) return

    const { width, height } = canvas.current

    setFrame(f => f + 1)

    if (status === 'run') {
      playerRef.current.y += playerRef.current.gravity
      playerRef.current.x = width / 10
    }

    if (blocks.current.length === 0 && status !== 'start') {
      setStatus('finish')
    }

    if (status === 'finish') {
      playerRef.current.x += 1
    }

    const collision = getCollision(blocks.current, playerRef.current, {
      width,
      height,
    })

    if (collision) {
      setStatus('gameover')
    }

    const { x: px, y: py, h: ph, w: pw } = playerRef.current
    const ctx = canvas.current.getContext('2d')
    const bird = new Image()

    if (ctx === null) return

    ctx.clearRect(0, 0, width, height)

    const background1 = new Image()
    const background2 = new Image()
    background1.src = forest
    background2.src = forest

    ctx.globalAlpha = 0.7
    ctx.drawImage(
      background1,
      backgroundPosition.current.first,
      0,
      width,
      height
    )
    ctx.drawImage(
      background2,
      backgroundPosition.current.second,
      0,
      width,
      height
    )
    ctx.globalAlpha = 1

    if (['run', 'start', 'finish'].includes(status)) {
      // бесконечная прокрутка
      backgroundPosition.current.first -= 1
      backgroundPosition.current.second -= 1

      if (backgroundPosition.current.second === 0) {
        backgroundPosition.current.first = 0
        backgroundPosition.current.second = width
      }
    }

    if (status === 'screenChanged') return

    if (status === 'gameover') {
      if (
        Math.round(playerRef.current.y) >=
        height - 20 - playerRef.current.h
      ) {
        bird.src = wingDownFrame
      } else {
        playerRef.current.y += 2
        bird.src = wingUpFrame
      }

      ctx.globalAlpha = 0.7
      ctx.drawImage(bird, px, py, pw, ph)
      ctx.globalAlpha = 1
    }

    blocks.current.forEach(({ x, y, w, h }) => {
      renderBlock(ctx, x, y, w, h)
    })

    if (status !== 'gameover') {
      if (Math.ceil(playerRef.current.wave) % 2 === 0) {
        bird.src = wingUpFrame
      } else {
        bird.src = wingDownFrame
      }

      ctx.drawImage(bird, px, py, pw, ph)
    }

    renderGround(ctx, width, height)

    frameId.current = requestAnimationFrame(renderFrame)
  }

  const restorePlayer = () => {
    if (canvas.current === null) return

    playerRef.current.y = canvas.current.height / 15
    playerRef.current.x = canvas.current.width / 15
  }

  // RENDER ========================
  useEffect(() => {
    frameId.current = requestAnimationFrame(renderFrame)

    return () => cancelAnimationFrame(frameId.current)
  }, [status])

  const liftPlayerUp = () => {
    if (status !== 'run') return

    playerRef.current.y -= playerRef.current.move
  }

  // KEYBOARD ========================
  useEffect(() => {
    const action = ({ key }: KeyboardEvent) => {
      if ([' ', 'ArrowUp'].includes(key)) {
        liftPlayerUp()
      }
    }

    window.addEventListener('keyup', action)

    return () => window.removeEventListener('keyup', action)
  }, [status])

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ margin: 'auto', p: '10px' }}>
        <canvas
          style={{ outline: '1px solid black' }}
          ref={canvas}
          onClick={liftPlayerUp}
          onContextMenu={ev => {
            ev.preventDefault()
            setStatus(s => (s === 'pause' ? 'run' : 'pause'))
          }}
        />
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
        <TextField value={status} InputProps={{ readOnly: true }} />
      </Box>
    </Box>
  )
}
