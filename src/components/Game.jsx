import { useEffect, useRef, useState } from 'react'
import Player from './Player'

function Game() {
  const [x, setX] = useState(100)
  const [y, setY] = useState(110)

  // Keep track of Rob's vertical position and speed
  const yRef = useRef(110)
  const velocityY = useRef(0)
  const isOnGround = useRef(true)

  // Game physics
  const GROUND_Y = 110
  const GRAVITY = -0.7
  const JUMP_POWER = 13

  useEffect(() => {
    function handleKeyDown(event) {
      // Move right
      if (event.key === 'ArrowRight' || event.key === 'd') {
        setX((currentX) => currentX + 15)
      }

      // Move left
      if (event.key === 'ArrowLeft' || event.key === 'a') {
        setX((currentX) => Math.max(0, currentX - 15))
      }

      // Jump
      if (event.code === 'Space' && isOnGround.current) {
        event.preventDefault()

        velocityY.current = JUMP_POWER
        isOnGround.current = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Main game loop
    const gameLoop = setInterval(() => {
      // Apply gravity
      velocityY.current += GRAVITY

      // Apply vertical velocity
      yRef.current += velocityY.current

      // Ground collision
      if (yRef.current <= GROUND_Y) {
        yRef.current = GROUND_Y
        velocityY.current = 0
        isOnGround.current = true
      }

      // Update React state
      setY(yRef.current)
    }, 16)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearInterval(gameLoop)
    }
  }, [])

  return (
    <>
      <Player x={x} y={y} />

      {/* Temporary debugging display */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          color: 'yellow',
          zIndex: 100,
        }}
      >
        X: {Math.round(x)} | Y: {Math.round(y)}
      </div>
    </>
  )
}

export default Game