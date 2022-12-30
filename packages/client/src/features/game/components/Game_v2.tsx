import { Button, Paper, Stack, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export const Game_v2: React.FC = () => {
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
    gravity: 1
  })
  const [block, setBlock] = useState(({ 
    x: canvas.width, 
    y: canvas.height - 150, 
    width: 150,
    height: 150
  }))
  const [currentBlock, setCurrentBlock ] = useState('')
  const [ collision, setCollision ] = useState(true)

  // refs ===============================
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // coefficients =======================
  const speedCoef = 1

  // engine =============================
  const drawFrame = (ctx: CanvasRenderingContext2D, frame: number) => {
    const speed = frame * speedCoef

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // enemy block
    setBlock((block) => ({...block, x: ctx.canvas.width - speed }))
    const blocks = new Array(3).fill(null).map((_, i) => {
      return {
        // расстояние между блоками
        x: block.x + (2 * i * block.width), 
        y: i === 1 ? 0 : block.y, 
        w: block.width, 
        h: block.height
      } // оптимизация количества блоков за левым краем канваса
    }).filter((block) => (block.x + block.w) > 0)

    const playerBlock = { 
      left: player.x, 
      right: player.x + player.width,
      top: player.y,
      bottom: player.y + player.height
    }

    // получаем пересечение
    const getColIndex = () => {
      // текущий блок под игроком
      const colIndex = blocks.findIndex((block) => {
        const colX = () => {
          return (
            block.x >= playerBlock.left
            && block.x <= playerBlock.right
            || (block.x + block.w) >= playerBlock.left
            && (block.x + block.w) <= playerBlock.right
          )
        }

        const colY = () => {
          return (
            (playerBlock.top < block.y + block.h)
            || (playerBlock.bottom < block.y)
          )
        }

        setCurrentBlock(`${colX()} / ${!colY()}`)

        return colX() && !colY()
      })

      return colIndex
    }

    

    blocks.forEach(({ x, y, w, h }, i) => {
      ctx.fillStyle = i === getColIndex() ? '#821b1b' : '#00955c'
      ctx.fillRect(x, y, w, h)
    })
    
    // player block
    ctx.fillStyle = getColIndex() >= 0 ? '#821b1b' : '#004395'
    ctx.fillRect(player.x, player.y, player.width, player.height)

    // collisions
    // bottom-top
    if (blocks.length === 0) {
      setPaused(true)

      return
    }

  }


  // player gravity change
  useEffect(() => {
    if (paused) return

    setPlayer((p) => ({...p, y: player.y /* + player.gravity */ }))
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
      <div style={{ display: 'flex', gap: 5, marginTop: 20 }}>
        <Button variant="contained" onClick={() => setPaused(!paused)} sx={{ width: 100 }}>
          {paused ? 'play' : 'pause'}
        </Button>
        <Button variant="contained" onClick={() => window.location.reload()} sx={{ width: 100 }}>
          {'Reload'}
        </Button>
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 20 }}>
        <TextField size='small' label="block Y" value={Math.floor(block.y)} onChange={() => {}} />
        <TextField size='small' label="block X" value={Math.floor(block.x)} onChange={() => {}} />
        <TextField size='small' label="player X Right" value={Math.floor(player.x + player.width)} onChange={() => {}} />
        <TextField size='small' label="player Y Bottom" value={Math.floor(player.y + player.height)} onChange={() => {}} />
      </div>
      <div style={{ display: 'flex', gap: 5, marginTop: 20 }}>
        <TextField size='small' label="current block" value={currentBlock} onChange={() => {}} />
        <TextField size='small' label="collision" value={collision} onChange={() => {}} />
      </div>
      <div style={{ marginTop: 20 }}>
        <canvas
          style={{ outline: '1px solid silver' }}
          ref={canvasRef}
          width={canvas.width}
          height={canvas.height}
          onClick={() => setPlayer((p => ({ ...p, y: p.y - 50 })))}
          onContextMenu={(ev) => {
            ev.preventDefault()
            setPlayer((p => ({ ...p, y: p.y + 50 })))
          }}
        />
      </div>
    </>
  )
}
