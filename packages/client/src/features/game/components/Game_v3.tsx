import { Box, IconButton } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Bird, GameStatus, Player } from '../types'
import { useBlocks } from '../hooks/useBlocks'
import { getCollision } from '../utils/getCollision'
import { Dialogs } from './Dialogs'
import { useCanvas } from '../hooks/useCanvas'
import {
  renderBirdFall,
  renderBirdWave,
  renderBlock,
  renderGround,
  renderInfo,
} from '../utils/worldRender'
import { useBackground } from '../hooks/useBackground'
import { useControls } from '../hooks/useControls'
import { usePlayerAction } from '../hooks/usePlayerAction'

import wingUpFrame from '/bird/frame-1.png'
import wingDownFrame from '/bird/frame-2.png'
import forest from '/background/forest.png'
import { useFullscreen } from '../../../hooks/useFullscreen'

export const Game_v3 = () => {
  const { fullscreen } = useFullscreen()
  const [frame, setFrame] = useState(0)
  const [status, setStatus] = useState(GameStatus.start)
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
  const { togglePause } = useControls(playerRef.current, status, setStatus)
  const playerAction = usePlayerAction(
    canvas.current,
    playerRef.current,
    status
  )
  const { blocks, createLevel, initialBlocksLength } = useBlocks({
    canvas: canvas.current,
    x: playerRef.current.speed,
    frame,
    status,
  })

  const [ bird, setBird ] = useState<Bird>()
  const [ bgr, setBgr ] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    const waveUp = new Image()
    const waveDown = new Image()

    waveUp.src = wingUpFrame
    waveDown.src = wingDownFrame

    waveUp.onload = () => {
      setBird(b => ({ ...b, waveUp }))
    }
    waveDown.onload = () => {
      setBird(b => ({ ...b, waveDown }))
    }

    const bgr = new Image()

    bgr.src = forest

    bgr.onload = () => {
      setBgr(bgr)
    }
  }, [])

  useEffect(() => {
    if (bird && bgr) {
      setStatus(GameStatus.run)
      setTimeout(() => {
        setStatus(GameStatus.start)
      }, 0)
    }
  }, [bird, bgr])

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
      move: fullscreen ? coef / 2 : coef / 1.5,
      speed: coef / 30,
    }

    if (status !== GameStatus.start) {
      setStatus(GameStatus.screenChanged)
    }
  }, [canvas.current?.width, fullscreen])

  useEffect(() => {
    if (status === GameStatus.pause) return

    const id = setInterval(() => {
      playerRef.current.wave += 1
    }, 150)

    return () => clearInterval(id)
  }, [status])

  useEffect(() => {
    createLevel()
  }, [fullscreen])

  const renderFrame = () => {
    if (canvas.current === null) return

    const { width, height } = canvas.current

    setFrame(f => f + 1)

    if (status === GameStatus.run) {
      playerRef.current.y += playerRef.current.gravity
      playerRef.current.x = width / 10
    }

    if (blocks.current.length === 0 && status !== GameStatus.start) {
      setStatus(GameStatus.finish)
    }

    if (status === GameStatus.finish) {
      playerRef.current.x += 1
    }

    const collision = getCollision(blocks.current, playerRef.current, {
      width,
      height,
    })

    if (collision) {
      setStatus(GameStatus.gameover)
    }

    const ctx = canvas.current.getContext('2d')

    if (ctx === null) return

    ctx.clearRect(0, 0, width, height)

    renderBackground(ctx, canvas.current, status)

    if (status === GameStatus.screenChanged) return

    if (status === GameStatus.gameover) {
      renderBirdFall(ctx, playerRef.current, height, bird)
    }

    if (status !== GameStatus.gameover) {
      renderBirdWave(ctx, playerRef.current, bird)
    }

    blocks.current.forEach(({ x, y, w, h }) => {
      renderBlock(ctx, x, y, w, h)
    })

    renderGround(ctx, width, height)

    if (status !== GameStatus.start) {
      renderInfo({
        ctx,
        blocks: blocks.current,
        initialBlocksLength,
        player: playerRef.current,
      })
    }

    frameId.current = requestAnimationFrame(renderFrame)
  }

  // RENDER ========================
  useEffect(() => {
    frameId.current = requestAnimationFrame(renderFrame)

    return () => cancelAnimationFrame(frameId.current)
  }, [status])

  return (
    <Box 
      display={'flex'} 
      justifyContent={'center'} 
      alignItems={'center'} 
      minHeight={'100vh'}
    >
      <Box sx={{ margin: 'auto', p: 1 }}>
        <canvas
          style={{ outline: '1px solid black' }}
          ref={canvas}
          onClick={playerAction.lift}
          onContextMenu={togglePause}
        />
      </Box>
      <Dialogs
        status={status}
        updateStatus={setStatus}
        restorePlayer={playerAction.restore}
        restartLevel={createLevel}
        progress={playerRef.current.progress}
      />
    </Box>
  )
}
