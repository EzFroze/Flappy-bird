import { Button, Stack, TextField } from '@mui/material';
import {
  useEffect, useRef,
  useState
} from 'react';

export const Game: React.FC<any> = (props) => {
  const [field, setField] = useState({ w: 900, h: 500 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [playerHeight, setPlayerHeight] = useState(100);

  const [frame, setFrame] = useState(0);
  const [paused, setPaused] = useState(false);
  const [timer, setTimer] = useState(0);
  const [lives, setLives] = useState(3);
  const [num, setNum] = useState(10);
  const [status, setStatus] = useState<'start' | 'idle' | 'end'>('start')

  const drawFrame = (ctx: CanvasRenderingContext2D, frame: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = '#00447c';

    const player = { x: 25, y: playerHeight, w: 50, h: 50 };
    ctx.fillRect(player.x, player.y, player.w, player.h);

    // ctx.fillStyle = '#00955c';
    // const blocks = {
    //   top: { x: field.w - frame, y: 0, w: 50, h: 200 },
    //   bottom: { x: field.w - frame, y: field.h, w: 50, h: -150 },
    // };
    // const { top, bottom } = blocks;

    // new Array(num).fill(null).map((el, i) => {
    //   const topX = top.x + i * 150;
    //   const btmX = bottom.x + i * 150;

    //   if (topX < 75 && topX > -25 && player.y < top.h) {
    //     console.log('collision top', i);
    //     //setPaused(true);
    //   }

    //   if (btmX < 75 && btmX > -25 && player.y + player.h > bottom.y - 150) {
    //     console.log('collision bottom', i);
    //     //setPaused(true);
    //   }

    //   ctx.fillRect(topX, top.y, top.w, top.h);
    //   ctx.fillRect(btmX, bottom.y, bottom.w, bottom.h);
    // });
  };

  // col[0] = 75 / -25

  useEffect(() => {
    if (paused) return;

    const ctx = canvasRef.current?.getContext('2d');

    if (!ctx) return;

    const ids = { frame: null as any, interval: null as any };

    const render = () => {
      drawFrame(ctx, frame);
      setFrame(frame + 1);

      ids.frame = requestAnimationFrame(render);
    };

    ids.interval = setInterval(() => {
      render();
    }, 5);

    return () => {
      cancelAnimationFrame(ids.frame);
      clearInterval(ids.interval);
    };
  }, [drawFrame, frame, paused]);

  useEffect(() => {
    if (paused) return;

    let id = setInterval(() => {
      setPlayerHeight((h) => h + 1);
    }, 42);

    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => {
    if (paused) return;

    let id = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [paused]);

  return (
    <div style={{ marginTop: 20 }}>
      <Stack spacing={2} direction="row">
        <TextField
          label="frame"
          value={frame}
          variant="outlined"
          type={'number'}
          sx={{ width: 100 }}
          disabled
        />
        <TextField
          value={playerHeight}
          label="player height"
          variant="outlined"
          type={'number'}
          sx={{ width: 100 }}
          disabled
        />
        <TextField
          value={timer}
          label="timer (liderboard)"
          variant="outlined"
          type={'number'}
          sx={{ width: 150 }}
          disabled
        />
        <TextField
          value={lives}
          label="lives"
          variant="outlined"
          type={'number'}
          sx={{ width: 100 }}
          disabled
        />
        <TextField
          value={num}
          label="collision"
          variant="outlined"
          type={'number'}
          sx={{ width: 150 }}
          disabled
        />
      </Stack>
      
      <canvas
        style={{ border: '1px solid silver', marginTop: 20 }}
        ref={canvasRef}
        width={field.w}
        height={field.h}
        onClick={() => setPlayerHeight((h) => h - 20)}
        onContextMenu={(ev) => {
          ev.preventDefault();
          setPaused((p) => !p);
        }}
      />
      <Stack direction={'row'}>
        <Button
          onClick={() => {
            setPaused((p) => !p);
          }}
        >
          {paused ? 'Play' : 'Pause'}
        </Button>
      </Stack>
    </div>
  );
};
