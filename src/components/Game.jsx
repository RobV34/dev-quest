import { useEffect, useRef, useState } from 'react'
import Player from './Player'

function Game() {
  // Player position
  const [x, setX] = useState(100)
  const [y, setY] = useState(110)

  // Development collectible
  const [developmentUnlocked, setDevelopmentUnlocked] = useState(false)
  const [showUnlockMessage, setShowUnlockMessage] = useState(false)

  // Physics refs
  const yRef = useRef(110)
  const velocityY = useRef(0)
  const isOnGround = useRef(true)

  // Game constants
  const GROUND_Y = 110
  const GRAVITY = -0.7
  const JUMP_POWER = 13

  const PLAYER_WIDTH = 55

  // Development platform
  const PLATFORM_LEFT = 0.38
  const PLATFORM_WIDTH = 230
  const PLATFORM_Y = 175

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

    const gameLoop = setInterval(() => {
      const previousY = yRef.current

      // Apply gravity
      velocityY.current += GRAVITY
      yRef.current += velocityY.current

      // Development platform position
      const platformX = window.innerWidth * PLATFORM_LEFT

      // Development pickup position
      const pickupX =
        platformX + PLATFORM_WIDTH / 2

      const touchingDevelopmentPickup =
        x + PLAYER_WIDTH > pickupX - 35 &&
        x < pickupX + 35 &&
        yRef.current >= PLATFORM_Y &&
        yRef.current <= PLATFORM_Y + 100

      // Collect Development skill
      if (
        touchingDevelopmentPickup &&
        !developmentUnlocked
      ) {
        setDevelopmentUnlocked(true)
        setShowUnlockMessage(true)

        setTimeout(() => {
          setShowUnlockMessage(false)
        }, 2000)
      }

      // Development platform collision
      const touchingPlatformHorizontally =
        x + PLAYER_WIDTH > platformX &&
        x < platformX + PLATFORM_WIDTH

      const crossedPlatformTop =
        previousY >= PLATFORM_Y &&
        yRef.current <= PLATFORM_Y

      const falling =
        velocityY.current <= 0

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

      // Update displayed Y position
      setY(yRef.current)
    }, 16)

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )

      clearInterval(gameLoop)
    }
  }, [x, developmentUnlocked])

  return (
    <>
      {/* ---------- PLAYER ---------- */}

      <Player x={x} y={y} />

      {/* ---------- DEVELOPMENT ---------- */}

      <div className="platform platform-one">

        {!developmentUnlocked && (
          <div className="skill-pickup">
            <span className="skill-icon">
              {'</>'}
            </span>
          </div>
        )}

        <div className="skill-sign">
          <strong>DEVELOPMENT</strong>
          <span>React · Node.js</span>
          <span>Java · Spring Boot</span>
        </div>

      </div>

      {/* ---------- SCRUM / AGILE ---------- */}

      <div className="scrum-area">

        <div className="scrum-platform scrum-todo">
          <strong>TODO</strong>
          <span>▢ ▢ ▢</span>
        </div>

        <div className="scrum-platform scrum-progress">
          <strong>IN PROGRESS</strong>
          <span>▣ ▢ ▢</span>
        </div>

        <div className="scrum-platform scrum-done">
          <strong>DONE</strong>
          <span>✓ ✓ ✓</span>
        </div>

      </div>

      {/* ---------- UNLOCK MESSAGE ---------- */}

      {showUnlockMessage && (
        <div className="unlock-message">

          <strong>
            DEVELOPMENT UNLOCKED!
          </strong>

          <span>
            React · Node.js · Java · Spring Boot
          </span>

        </div>
      )}

      {/* ---------- DEBUG ---------- */}

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