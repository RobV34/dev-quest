import { useEffect, useRef, useState } from 'react'
import Player from './Player'

function Game() {
  const [x, setX] = useState(100)
  const [y, setY] = useState(110)

  const yRef = useRef(110)
  const velocityY = useRef(0)
  const isOnGround = useRef(true)

  const GROUND_Y = 110
  const GRAVITY = -0.7
  const JUMP_POWER = 13

  const PLAYER_WIDTH = 55

  const PLATFORM_LEFT = 0.38
  const PLATFORM_WIDTH = 230
  const PLATFORM_Y = 175

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'ArrowRight' || event.key === 'd') {
        setX((currentX) => currentX + 15)
      }

      if (event.key === 'ArrowLeft' || event.key === 'a') {
        setX((currentX) => Math.max(0, currentX - 15))
      }

      if (event.code === 'Space' && isOnGround.current) {
        event.preventDefault()

        velocityY.current = JUMP_POWER
        isOnGround.current = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    const gameLoop = setInterval(() => {
      const previousY = yRef.current

      velocityY.current += GRAVITY
      yRef.current += velocityY.current

      const platformX = window.innerWidth * PLATFORM_LEFT

      const touchingPlatformHorizontally =
        x + PLAYER_WIDTH > platformX &&
        x < platformX + PLATFORM_WIDTH

      const crossedPlatformTop =
        previousY >= PLATFORM_Y &&
        yRef.current <= PLATFORM_Y

      const falling = velocityY.current <= 0

      // Land on Development platform
      if (
        touchingPlatformHorizontally &&
        falling &&
        crossedPlatformTop
      ) {
        yRef.current = PLATFORM_Y
        velocityY.current = 0
        isOnGround.current = true
      }

      // Land on ground
      else if (yRef.current <= GROUND_Y) {
        yRef.current = GROUND_Y
        velocityY.current = 0
        isOnGround.current = true
      }

      setY(yRef.current)
    }, 16)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      clearInterval(gameLoop)
    }
  }, [x])

  return (
    <>
      <Player x={x} y={y} />

      <div className="platform platform-one">
        <div className="skill-pickup">
          <span className="skill-icon">{'</>'}</span>
        </div>

        <div className="skill-sign">
          <strong>DEVELOPMENT</strong>
          <span>React · Node.js</span>
          <span>Java · Spring Boot</span>
        </div>
      </div>

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