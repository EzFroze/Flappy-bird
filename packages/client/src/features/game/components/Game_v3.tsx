import { Box, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { GameStatus, Player } from '../types'
import { useBlocks } from '../hooks/useBlocks'
import { getCollision } from '../utils/getCollision'
import { OpenInFull, CloseFullscreen } from '@mui/icons-material'
import { useFullscreen } from '../../../hooks/useFullscreen'
import { Dialogs } from './Dialogs'
import { useCanvas } from '../hooks/useCanvas'
import { renderBlock, renderGround, renderInfo } from '../utils/worldRender'
import wingUpFrame from '/bird/frame-1.png'
import wingDownFrame from '/bird/frame-2.png'
import { useBackground } from '../hooks/useBackground'


export const Game_v3 = () => {
  const fullscreen = useFullscreen()
  const [frame, setFrame] = useState(0)
  const [status, setStatus] = useState<GameStatus>('start')
  const canvas = useCanvas()
  const frameId = useRef(0)
  const { backgroundPosition, renderBackground } = useBackground()
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
  const { blocks, createLevel, initialBlocksLength } = useBlocks({
    canvas: canvas.current,
    x: playerRef.current.speed,
    frame,
    status,
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
      move: fullscreen.enabled ? coef / 2 : coef / 1.5,
      speed: coef / 30
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

    renderBackground(ctx, canvas.current, status)

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

    if (status !== 'start') {
      renderInfo({
        ctx,
        blocks: blocks.current,
        initialBlocksLength,
        player: playerRef.current
      })
    }

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
      if (key === 'ArrowUp') {
        liftPlayerUp()
      }
    }

    window.addEventListener('keyup', action)

    return () => window.removeEventListener('keyup', action)
  }, [status])

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ margin: 'auto', p: 1 }}>
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
        progress={playerRef.current.progress}
      />
      <Box sx={{ position: 'absolute', right: 50, top: 50 }}>
        <IconButton sx={{ height: 54, width: 54 }} onClick={fullscreen.toggle}>
          {fullscreen.enabled ? <CloseFullscreen /> : <OpenInFull />}
        </IconButton>
      </Box>
    </Box>
  )
}