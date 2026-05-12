import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import useStore from '../../store/useStore';

const CELL = 20;
const COLS = 20;
const ROWS = 15;
const W = COLS * CELL;
const H = ROWS * CELL;

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Pt = { x: number; y: number };

function randFood(snake: Pt[]): Pt {
  let pt: Pt;
  do {
    pt = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
  } while (snake.some((s) => s.x === pt.x && s.y === pt.y));
  return pt;
}

export default function MiniGame() {
  const setCursorVariant = useStore((s) => s.setCursorVariant);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const snakeRef = useRef<Pt[]>([{ x: 10, y: 7 }]);
  const dirRef = useRef<Dir>('RIGHT');
  const nextDirRef = useRef<Dir>('RIGHT');
  const foodRef = useRef<Pt>(randFood(snakeRef.current));
  const loopRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const scoreRef = useRef(0);

  const SPEED = 120; // ms per tick

  const resetGame = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 7 }];
    dirRef.current = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    foodRef.current = randFood(snakeRef.current);
    scoreRef.current = 0;
    setScore(0);
    lastTickRef.current = 0;
  }, []);

  const startGame = useCallback(() => {
    resetGame();
    setGameState('playing');
  }, [resetGame]);

  // Draw function
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    // Background
    ctx.fillStyle = '#0a0a12';
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= W; x += CELL) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += CELL) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Food
    const food = foodRef.current;
    ctx.shadowColor = '#FF2E97';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#FF2E97';
    ctx.beginPath();
    ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      const t = i / snake.length;
      ctx.shadowColor = isHead ? '#39FF14' : 'transparent';
      ctx.shadowBlur = isHead ? 15 : 0;

      // Gradient from green (head) to cyan (tail)
      const r = Math.round(57 * (1 - t) + 0 * t);
      const g = Math.round(255 * (1 - t) + 240 * t);
      const b = Math.round(20 * (1 - t) + 255 * t);
      ctx.fillStyle = `rgb(${r},${g},${b})`;

      const pad = isHead ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + pad, seg.y * CELL + pad, CELL - pad * 2, CELL - pad * 2, isHead ? 4 : 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Border glow
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const loop = (timestamp: number) => {
      loopRef.current = requestAnimationFrame(loop);

      if (timestamp - lastTickRef.current < SPEED) {
        draw(ctx);
        return;
      }
      lastTickRef.current = timestamp;

      // Apply direction
      dirRef.current = nextDirRef.current;
      const dir = dirRef.current;
      const snake = snakeRef.current;
      const head = { ...snake[0] };

      if (dir === 'UP') head.y -= 1;
      else if (dir === 'DOWN') head.y += 1;
      else if (dir === 'LEFT') head.x -= 1;
      else if (dir === 'RIGHT') head.x += 1;

      // Wall collision
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        setGameState('over');
        setHighScore((prev) => Math.max(prev, scoreRef.current));
        draw(ctx);
        return;
      }

      // Self collision
      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        setGameState('over');
        setHighScore((prev) => Math.max(prev, scoreRef.current));
        draw(ctx);
        return;
      }

      snake.unshift(head);

      // Eat food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        foodRef.current = randFood(snake);
      } else {
        snake.pop();
      }

      draw(ctx);
    };

    loopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(loopRef.current);
  }, [gameState, draw]);

  // Draw idle / game over screen
  useEffect(() => {
    if (gameState === 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    draw(ctx);

    // Overlay
    ctx.fillStyle = 'rgba(5, 5, 5, 0.7)';
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (gameState === 'over') {
      ctx.font = 'bold 28px "JetBrains Mono", monospace';
      ctx.fillStyle = '#FF2E97';
      ctx.shadowColor = '#FF2E97';
      ctx.shadowBlur = 20;
      ctx.fillText('GAME OVER', W / 2, H / 2 - 20);
      ctx.shadowBlur = 0;
      ctx.font = '14px "JetBrains Mono", monospace';
      ctx.fillStyle = '#e0e0e0';
      ctx.fillText(`Score: ${scoreRef.current}`, W / 2, H / 2 + 15);
    } else {
      ctx.font = 'bold 20px "JetBrains Mono", monospace';
      ctx.fillStyle = '#39FF14';
      ctx.shadowColor = '#39FF14';
      ctx.shadowBlur = 15;
      ctx.fillText('SNAKE GAME', W / 2, H / 2 - 15);
      ctx.shadowBlur = 0;
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#a0a0a0';
      ctx.fillText('點擊下方按鈕開始', W / 2, H / 2 + 15);
    }
  }, [gameState, draw]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      const cur = dirRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (cur !== 'DOWN') nextDirRef.current = 'UP';
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (cur !== 'UP') nextDirRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (cur !== 'RIGHT') nextDirRef.current = 'LEFT';
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (cur !== 'LEFT') nextDirRef.current = 'RIGHT';
          break;
      }
      e.preventDefault();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState]);

  const handleDir = (d: Dir) => {
    if (gameState !== 'playing') return;
    const cur = dirRef.current;
    if (d === 'UP' && cur !== 'DOWN') nextDirRef.current = d;
    if (d === 'DOWN' && cur !== 'UP') nextDirRef.current = d;
    if (d === 'LEFT' && cur !== 'RIGHT') nextDirRef.current = d;
    if (d === 'RIGHT' && cur !== 'LEFT') nextDirRef.current = d;
  };

  return (
    <section id="minigame" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="小遊戲"
          subtitle="Mini Game"
          color="green"
        />

        <div className="flex flex-col items-center">
          {/* Score board */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6 mb-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass neon-border">
              <Gamepad2 size={16} className="text-cyber-green" />
              <span className="text-xs font-mono text-gray-300">分數：</span>
              <span className="text-sm font-mono font-bold text-cyber-green">{score}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass neon-border">
              <Trophy size={16} className="text-cyber-yellow" />
              <span className="text-xs font-mono text-gray-300">最高分：</span>
              <span className="text-sm font-mono font-bold text-cyber-yellow">{highScore}</span>
            </div>
          </motion.div>

          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1px solid rgba(57, 255, 20, 0.3)',
              boxShadow: '0 0 20px rgba(57, 255, 20, 0.15), inset 0 0 20px rgba(57, 255, 20, 0.05)',
            }}
          >
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              className="block"
              style={{ imageRendering: 'pixelated' }}
            />
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 flex flex-col items-center gap-4"
          >
            {/* Action button */}
            <motion.button
              onClick={startGame}
              className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-mono font-semibold tracking-wider uppercase transition-all duration-300"
              style={{
                border: '1px solid #39FF14',
                backgroundColor: 'rgba(57, 255, 20, 0.05)',
                color: '#39FF14',
                boxShadow: '0 0 15px rgba(57, 255, 20, 0.3)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 25px rgba(57, 255, 20, 0.5)',
                backgroundColor: 'rgba(57, 255, 20, 0.15)',
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <RotateCcw size={16} />
              {gameState === 'idle' ? '開始遊戲' : gameState === 'over' ? '再玩一次' : '重新開始'}
            </motion.button>

            {/* D-pad for mobile */}
            <div className="grid grid-cols-3 gap-1 sm:hidden">
              <div />
              <DirBtn dir="UP" icon={<ArrowUp size={18} />} onPress={handleDir} />
              <div />
              <DirBtn dir="LEFT" icon={<ArrowLeft size={18} />} onPress={handleDir} />
              <DirBtn dir="DOWN" icon={<ArrowDown size={18} />} onPress={handleDir} />
              <DirBtn dir="RIGHT" icon={<ArrowRight size={18} />} onPress={handleDir} />
            </div>

            {/* Instructions */}
            <p className="text-xs font-mono text-gray-500 text-center">
              鍵盤 <span className="text-gray-300">↑ ↓ ← →</span> 或{' '}
              <span className="text-gray-300">W A S D</span> 控制方向
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DirBtn({ dir, icon, onPress }: { dir: Dir; icon: React.ReactNode; onPress: (d: Dir) => void }) {
  return (
    <button
      onTouchStart={(e) => { e.preventDefault(); onPress(dir); }}
      onClick={() => onPress(dir)}
      className="w-12 h-12 flex items-center justify-center rounded-lg text-cyber-green border border-cyber-green/30 bg-cyber-green/5 active:bg-cyber-green/20 transition-colors"
    >
      {icon}
    </button>
  );
}
