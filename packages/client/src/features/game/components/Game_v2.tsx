import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LinearProgress from '@mui/material/LinearProgress'
import { createLevel, levels } from '../services/createLevel'
import { Block, Canvas, Player } from '../types'
import { ModalEnd } from './ModalEnd'
import { ModalStart } from './ModalStart'
import { ModalGameOver } from './ModalGameOver'
import { Container } from '@mui/system'

export const Game_v2: React.FC = () => {
  const [launched, setLaunched] = useState(false)
  const [ended, setEnded] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  // state =============================
  const [frame, setFrame] = useState(0)
  const [canvas] = useState<Canvas>({
    width: 900,
    height: 400,
  })
  const [paused, setPaused] = useState(true)
  const [player, setPlayer] = useState<Player>({
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    gravity: 0.3,
    move: 30,
    level: 0,
  })
  const blockInitialState: Block = {
    x: canvas.width,
    y: canvas.height,
    width: 100,
    height: 120,
  }
  const [block, setBlock] = useState<Block>(blockInitialState)
  const [speedCoef, setSpeedCoef] = useState(1)

  // refs ===============================
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // level =============================
  const optimize = (array: Block[]) => {
    return array.filter(({ x, width }) => x + width > 0)
  }

  const initialLevel = useMemo(
    () =>
      createLevel({
        array: levels[player.level],
        canvas,
        block,
      }),
    [levels]
  )
  const updatedLevel = optimize(
    initialLevel.map((b, i) => ({
      ...b,
      // выравниваем блоки друг над другом
      x:
        i % 2 === 0
          ? block.x + block.width * i
          : block.x + (block.width * i - block.width),
    }))
  )

  // engine =============================
  const drawFrame = (ctx: CanvasRenderingContext2D, frame: number) => {
    const speed = frame * speedCoef

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // enemy block
    setBlock(block => ({ ...block, x: ctx.canvas.width - speed }))

    const getColIndex = () => {
      // оптимизируем, т.к. далее этих блоков не уйдем
      return updatedLevel
        .filter((_b, i) => i < 2)
        .findIndex(block => {
          const playerLeft = player.x
          const playerRight = player.x + player.width
          const blockLeft = block.x
          const blockRight = block.x + block.width

          const playerTop = player.y
          const playerBottom = player.y + player.height
          const blockTop = block.y
          const blockBottom = block.y + block.height

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

    updatedLevel.forEach(({ x, y, width, height }, i) => {
      ctx.fillStyle = i === getColIndex() ? '#821b1b' : '#00955c'
      ctx.fillRect(x, y, width, height)
    })

    // player block
    ctx.fillStyle = getColIndex() >= 0 ? '#821b1b' : '#004395'
    ctx.fillRect(player.x, player.y, player.width, player.height)

    if (getColIndex() > -1) {
      setPaused(true)

      setTimeout(() => {
        setGameOver(true)
      }, 700)
    }

    if (updatedLevel.length === 0) {
      setPaused(true)
      setEnded(true)

      return
    }
  }

  // player gravity change
  useEffect(() => {
    if (paused) return

    setPlayer(p => ({ ...p, y: player.y + player.gravity }))
  }, [paused, frame])

  useEffect(() => {
    if (paused) return

    let frameId = 0

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

  const isLastLevel = player.level === levels.length - 1

  const goNextLevel = () => {
    if (isLastLevel) return

    setPlayer(p => ({ ...p, level: p.level + 1 }))
    setFrame(0)
    setEnded(false)
    setLaunched(false)
    setBlock(blockInitialState)
  }

  const levelLen = initialLevel.length / 2
  const passedLen = updatedLevel.length / 2

  return (
    <Container maxWidth='lg'>
      <Stack direction={'row'} spacing={2}>
        <TextField label="frames" value={frame} sx={{ width: 100 }} />
        <TextField
          label="progress"
          value={`${(levelLen - passedLen)} / ${levelLen}`}
          InputProps={{ readOnly: true }}
          sx={{ width: 100 }}
        />
        <TextField label="level" value={player.level} sx={{ width: 100 }} />
      </Stack>
      <Box sx={{ mt: 2 }}>
        <canvas
          style={{ outline: '1px solid silver' }}
          ref={canvasRef}
          width={canvas.width}
          height={canvas.height}
          onClick={() => {
            setPlayer(p => ({ ...p, y: p.y - player.move }))
          }}
          onContextMenu={ev => {
            ev.preventDefault()
            setPaused(!paused)
          }}
        />
      </Box>
      <Stack direction={'row'} spacing={2} mt={2}>
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
        <Button
          variant="contained"
          onClick={() => setSpeedCoef(sc => (sc === 1 ? 2 : 1))}>
          Booster {speedCoef === 1 ? 'Off' : 'On'}
        </Button>
      </Stack>
      <ModalGameOver gameOver={gameOver} frame={frame} />
      <ModalStart
        launched={launched}
        setPaused={setPaused}
        setLaunched={setLaunched}
      />
      <ModalEnd
        ended={ended}
        isLastLevel={isLastLevel}
        goNextLevel={goNextLevel}
      />
    </Container>
  )
}
