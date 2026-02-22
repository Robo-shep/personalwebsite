import React, { useState, useRef, useEffect, useCallback } from 'react';

// Game Constants
const CANVAS_SIZE = [400, 400];
const SCALE = 20; // Size of each grid square in pixels
const SPEED = 120; // Milliseconds between frames (lower is faster)
const SNAKE_START = [
  [10, 15],
  [10, 16],
];
const APPLE_START = [10, 5];
const DIRECTIONS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]); // Initial direction is Up
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Focus the game wrapper so keyboard events register immediately
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.focus();
    }
  }, []);

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setGameOver(false);
    setScore(0);
    if (wrapperRef.current) wrapperRef.current.focus();
  };

  const moveSnake = useCallback((e) => {
    if (DIRECTIONS[e.key]) {
      // Prevent default scrolling when playing
      e.preventDefault(); 
      const newDir = DIRECTIONS[e.key];
      // Prevent the snake from immediately reversing into itself
      if (dir[0] !== -newDir[0] || dir[1] !== -newDir[1]) {
        setDir(newDir);
      }
    }
  }, [dir]);

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    // Check wall collision
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    ) {
      return true;
    }
    // Check self collision
    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) {
        return true;
      }
    }
    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      // Ensure new apple doesn't spawn on top of the snake
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      setScore((prev) => prev + 10);
      return true;
    }
    return false;
  };

  const gameLoop = useCallback(() => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);

    if (checkCollision(newSnakeHead)) {
      setGameOver(true);
      return;
    }

    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop(); // Remove the tail if no apple was eaten
    }

    setSnake(snakeCopy);
  }, [snake, dir]);

  // Handle the game tick
  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(gameLoop, SPEED);
      return () => clearInterval(interval);
    }
  }, [gameLoop, gameOver]);

  // Render the canvas
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);

    // Draw Apple
    context.fillStyle = '#ff6188'; // A nice retro pink/red
    context.fillRect(apple[0], apple[1], 1, 1);

    // Draw Snake
    context.fillStyle = '#a9dc76'; // Matches the terminal text color
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
  }, [snake, apple, gameOver]);

  return (
    <div 
      ref={wrapperRef}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', outline: 'none' }}
      onKeyDown={moveSnake}
      tabIndex="0" // Makes the div focusable to catch keyboard events
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '10px' }}>
        <strong>Score: {score}</strong>
        {gameOver && <strong style={{ color: '#ff6188' }}>Game Over!</strong>}
      </div>
      
      <canvas
        style={{
          border: '2px solid #C6C1AB',
          backgroundColor: '#1e1e1e', // Dark background for the canvas
          borderRadius: '4px',
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
        }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />

      {gameOver && (
        <button 
          onClick={startGame} 
          style={{
            marginTop: '15px',
            padding: '10px 20px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Play Again
        </button>
      )}
      
      {!gameOver && score === 0 && (
        <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '10px' }}>
          Click here and use arrow keys to play.
        </p>
      )}
    </div>
  );
};

export default SnakeGame;