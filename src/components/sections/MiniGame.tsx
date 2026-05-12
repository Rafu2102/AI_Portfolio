import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import SectionTitle from '../ui/SectionTitle';
import useStore from '../../store/useStore';

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Pt = { x: number; y: number };

interface DifficultyOption {
  label: string;
  speed: number;
  color: string;
}

interface BoardOption {
  label: string;
  cols: number;
  rows: number;
}

const DIFFICULTIES: DifficultyOption[] = [
  { label: '簡單', speed: 200, color: '#39FF14' },
  { label: '普通', speed: 120, color: '#FFE600' },
  { label: '困難', speed: 65, color: '#FF2E97' },
];

const BOARDS: BoardOption[] = [
  { label: '7 × 7', cols: 7, rows: 7 },
  { label: '10 × 10', cols: 10, rows: 10 },
  { label: '15 × 15', cols: 15, rows: 15 },
];

const CANVAS_TARGET = 420;

function randFood(snake: Pt[], cols: number, rows: number): Pt {
  let pt: Pt;
  do {
    pt = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } while (snake.some((s) => s.x === pt.x && s.y === pt.y));
  return pt;
}

export default function MiniGame() {
  const setCursorVariant = useStore((s) => s.setCursorVariant);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [diffIdx, setDiffIdx] = useState(1);
  const [boardIdx, setBoardIdx] = useState(1);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const board = BOARDS[boardIdx];
  const diff = DIFFICULTIES[diffIdx];
  const cell = Math.floor(CANVAS_TARGET / board.cols);
  const W = board.cols * cell;
  const H = board.rows * cell;

  const snakeRef = useRef<Pt[]>([{ x: Math.floor(board.cols / 2), y: Math.floor(board.rows / 2) }]);
  const dirRef = useRef<Dir>('RIGHT');
  const nextDirRef = useRef<Dir>('RIGHT');
  const foodRef = useRef<Pt>(randFood(snakeRef.current, board.cols, board.rows));
  const loopRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const scoreRef = useRef(0);

  const resetGame = useCallback(() => {
    const cx = Math.floor(board.cols / 2);
    const cy = Math.floor(board.rows / 2);
    snakeRef.current = [{ x: cx, y: cy }];
    dirRef.current = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    foodRef.current = randFood(snakeRef.current, board.cols, board.rows);
    scoreRef.current = 0;
    setScore(0);
    lastTickRef.current = 0;
  }, [board]);

  const startGame = useCallback(() => {
    resetGame();
    setGameState('playing');
  }, [resetGame]);

  // Draw
  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    const cols = board.cols;
    const rows = board.rows;

    // Background — checkerboard
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? '#0c0c18' : '#101024';
        ctx.fillRect(c * cell, r * cell, cell, cell);
      }
    }

    // Grid lines
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += cell) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += cell) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }

    // Corner dots for extra grid visibility
    ctx.fillStyle = 'rgba(0, 240, 255, 0.12)';
    for (let r = 0; r <= rows; r++) {
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.arc(c * cell, r * cell, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Food — pulsating glow
    const food = foodRef.current;
    const pulse = 0.6 + Math.sin(Date.now() / 200) * 0.4;
    ctx.shadowColor = '#FF2E97';
    ctx.shadowBlur = 14 * pulse;
    ctx.fillStyle = '#FF2E97';
    ctx.beginPath();
    ctx.arc(food.x * cell + cell / 2, food.y * cell + cell / 2, cell / 2 - 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Snake
    const snake = snakeRef.current;
    snake.forEach((seg, i) => {
      const isHead = i === 0;
      const t = i / Math.max(snake.length - 1, 1);

      // Gradient: green (head) → cyan (tail)
      const r = Math.round(57 * (1 - t) + 0 * t);
      const g = Math.round(255 * (1 - t) + 240 * t);
      const b = Math.round(20 * (1 - t) + 255 * t);

      if (isHead) {
        ctx.shadowColor = '#39FF14';
        ctx.shadowBlur = 12;
      }
      ctx.fillStyle = `rgb(${r},${g},${b})`;

      const pad = isHead ? 1 : 2;
      ctx.beginPath();
      ctx.roundRect(seg.x * cell + pad, seg.y * cell + pad, cell - pad * 2, cell - pad * 2, isHead ? 5 : 3);
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Border
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, W - 2, H - 2);
  }, [board, cell, W, H]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const speed = diff.speed;

    const loop = (timestamp: number) => {
      loopRef.current = requestAnimationFrame(loop);

      if (timestamp - lastTickRef.current < speed) {
        draw(ctx);
        return;
      }
      lastTickRef.current = timestamp;

      dirRef.current = nextDirRef.current;
      const dir = dirRef.current;
      const snake = snakeRef.current;
      const head = { ...snake[0] };

      if (dir === 'UP') head.y -= 1;
      else if (dir === 'DOWN') head.y += 1;
      else if (dir === 'LEFT') head.x -= 1;
      else if (dir === 'RIGHT') head.x += 1;

      if (head.x < 0 || head.x >= board.cols || head.y < 0 || head.y >= board.rows) {
        setGameState('over');
        setHighScore((prev) => Math.max(prev, scoreRef.current));
        draw(ctx);
        return;
      }

      if (snake.some((s) => s.x === head.x && s.y === head.y)) {
        setGameState('over');
        setHighScore((prev) => Math.max(prev, scoreRef.current));
        draw(ctx);
        return;
      }

      snake.unshift(head);

      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        foodRef.current = randFood(snake, board.cols, board.rows);
      } else {
        snake.pop();
      }

      draw(ctx);
    };

    loopRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(loopRef.current);
  }, [gameState, diff, board, draw]);

  // Draw idle / game over overlay
  useEffect(() => {
    if (gameState === 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas if board changed
    canvas.width = W;
    canvas.height = H;

    draw(ctx);

    ctx.fillStyle = 'rgba(5, 5, 5, 0.75)';
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    if (gameState === 'over') {
      ctx.font = `bold ${Math.max(W / 12, 20)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = '#FF2E97';
      ctx.shadowColor = '#FF2E97';
      ctx.shadowBlur = 20;
      ctx.fillText('GAME OVER', W / 2, H / 2 - 20);
      ctx.shadowBlur = 0;
      ctx.font = `${Math.max(W / 24, 12)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = '#e0e0e0';
      ctx.fillText(`Score: ${scoreRef.current}`, W / 2, H / 2 + 15);
    } else {
      ctx.font = `bold ${Math.max(W / 14, 16)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = '#39FF14';
      ctx.shadowColor = '#39FF14';
      ctx.shadowBlur = 15;
      ctx.fillText('SNAKE GAME', W / 2, H / 2 - 15);
      ctx.shadowBlur = 0;
      ctx.font = `${Math.max(W / 28, 10)}px "JetBrains Mono", monospace`;
      ctx.fillStyle = '#a0a0a0';
      ctx.fillText('選擇設定後按開始遊戲', W / 2, H / 2 + 15);
    }
  }, [gameState, W, H, draw, boardIdx]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      const cur = dirRef.current;
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W':
          if (cur !== 'DOWN') nextDirRef.current = 'UP'; break;
        case 'ArrowDown': case 's': case 'S':
          if (cur !== 'UP') nextDirRef.current = 'DOWN'; break;
        case 'ArrowLeft': case 'a': case 'A':
          if (cur !== 'RIGHT') nextDirRef.current = 'LEFT'; break;
        case 'ArrowRight': case 'd': case 'D':
          if (cur !== 'LEFT') nextDirRef.current = 'RIGHT'; break;
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

  const isPlaying = gameState === 'playing';

  return (
    <section id="minigame" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="小遊戲" subtitle="Mini Game" color="green" />

        <div className="flex flex-col items-center">
          {/* Settings panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8 w-full max-w-lg space-y-4"
          >
            {/* Difficulty */}
            <div className="glass neon-border rounded-xl p-4">
              <p className="text-xs font-mono text-gray-400 mb-3 flex items-center gap-2">
                <span className="text-cyber-cyan">$</span> difficulty.select
              </p>
              <div className="flex gap-2">
                {DIFFICULTIES.map((d, i) => (
                  <button
                    key={d.label}
                    onClick={() => { if (!isPlaying) setDiffIdx(i); }}
                    disabled={isPlaying}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all duration-300 ${
                      isPlaying ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={
                      diffIdx === i
                        ? {
                            backgroundColor: `${d.color}18`,
                            border: `1.5px solid ${d.color}`,
                            color: d.color,
                            boxShadow: `0 0 12px ${d.color}30`,
                          }
                        : {
                            backgroundColor: 'transparent',
                            border: '1.5px solid rgba(255,255,255,0.1)',
                            color: '#a0a0a0',
                          }
                    }
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Board size */}
            <div className="glass neon-border rounded-xl p-4">
              <p className="text-xs font-mono text-gray-400 mb-3 flex items-center gap-2">
                <span className="text-cyber-cyan">$</span> board.size
              </p>
              <div className="flex gap-2">
                {BOARDS.map((b, i) => (
                  <button
                    key={b.label}
                    onClick={() => { if (!isPlaying) setBoardIdx(i); }}
                    disabled={isPlaying}
                    className={`flex-1 py-2.5 rounded-lg text-xs font-mono font-semibold tracking-wider transition-all duration-300 ${
                      isPlaying ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    style={
                      boardIdx === i
                        ? {
                            backgroundColor: 'rgba(0, 240, 255, 0.1)',
                            border: '1.5px solid #00F0FF',
                            color: '#00F0FF',
                            boxShadow: '0 0 12px rgba(0, 240, 255, 0.25)',
                          }
                        : {
                            backgroundColor: 'transparent',
                            border: '1.5px solid rgba(255,255,255,0.1)',
                            color: '#a0a0a0',
                          }
                    }
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Score board */}
          <div className="flex items-center gap-6 mb-5">
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
          </div>

          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden"
            style={{
              border: '1.5px solid rgba(57, 255, 20, 0.35)',
              boxShadow: '0 0 25px rgba(57, 255, 20, 0.15), inset 0 0 25px rgba(57, 255, 20, 0.05)',
            }}
          >
            <canvas
              ref={canvasRef}
              width={W}
              height={H}
              className="block"
            />
          </motion.div>

          {/* Controls */}
          <div className="mt-6 flex flex-col items-center gap-4">
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

            <p className="text-xs font-mono text-gray-500 text-center">
              鍵盤 <span className="text-gray-300">↑ ↓ ← →</span> 或{' '}
              <span className="text-gray-300">W A S D</span> 控制方向
            </p>
          </div>
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
