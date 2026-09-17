import { useEffect, useRef, useState } from 'react'
import Player from './Player'

function Game() {
  // ---------- PLAYER STATE ----------

  const [x, setX] = useState(100)
  const [y, setY] = useState(110)

  // ---------- DEVELOPMENT STATE ----------

  const [developmentUnlocked, setDevelopmentUnlocked] = useState(false)
  const [showUnlockMessage, setShowUnlockMessage] = useState(false)

  // ---------- SCRUM / AGILE STATE ----------

  const [scrumUnlocked, setScrumUnlocked] = useState(false)
  const [showScrumMessage, setShowScrumMessage] = useState(false)

  // ---------- PHYSICS REFS ----------

  const yRef = useRef(110)
  const velocityY = useRef(0)
  const isOnGround = useRef(true)

  // ---------- GAME CONSTANTS ----------

  const GROUND_Y = 110
  const GRAVITY = -0.7
  const JUMP_POWER = 13

  const PLAYER_WIDTH = 55

  // ---------- DEVELOPMENT PLATFORM ----------

  const PLATFORM_LEFT = 0.38
  const PLATFORM_WIDTH = 230
  const PLATFORM_Y = 175

  // ---------- ALL GAME PLATFORMS ----------

  const getPlatforms = () => {
    const screenWidth = window.innerWidth

    return [
      {
        name: 'development',
        x: screenWidth * 0.38,
        width: 230,
        y: 175,
      },
      {
        name: 'todo',
        x: screenWidth - 415,
        width: 115,
        y: 170,
      },
      {
        name: 'progress',
        x: screenWidth - 280,
        width: 115,
        y: 235,
      },
      {
        name: 'done',
        x: screenWidth - 145,
        width: 115,
        y: 300,
      },
    ]
  }

  // ---------- GAME LOOP ----------

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

      // ---------- GRAVITY ----------

      velocityY.current += GRAVITY
      yRef.current += velocityY.current

      // ---------- DEVELOPMENT PICKUP ----------

      const platformX =
        window.innerWidth * PLATFORM_LEFT

      const pickupX =
        platformX + PLATFORM_WIDTH / 2

      const touchingDevelopmentPickup =
        x + PLAYER_WIDTH > pickupX - 35 &&
        x < pickupX + 35 &&
        yRef.current >= PLATFORM_Y &&
        yRef.current <= PLATFORM_Y + 100

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

      // ---------- PLATFORM COLLISION ----------

      const platforms = getPlatforms()

      const falling =
        velocityY.current <= 0

      let landedOnPlatform = false

      for (const platform of platforms) {
        const touchingHorizontally =
          x + PLAYER_WIDTH > platform.x &&
          x < platform.x + platform.width

        const crossedPlatformTop =
          previousY >= platform.y &&
          yRef.current <= platform.y

        if (
          touchingHorizontally &&
          falling &&
          crossedPlatformTop
        ) {
          yRef.current = platform.y
          velocityY.current = 0
          isOnGround.current = true
          landedOnPlatform = true

          // ---------- SCRUM COMPLETE ----------

          if (
            platform.name === 'done' &&
            !scrumUnlocked
          ) {
            setScrumUnlocked(true)
            setShowScrumMessage(true)

            setTimeout(() => {
              setShowScrumMessage(false)
            }, 2000)
          }

          break
        }
      }

      // ---------- GROUND COLLISION ----------

      if (
        !landedOnPlatform &&
        yRef.current <= GROUND_Y
      ) {
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
  }, [x, developmentUnlocked, scrumUnlocked])

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

      {/* ---------- DEVELOPMENT MESSAGE ---------- */}

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

      {/* ---------- SCRUM MESSAGE ---------- */}

      {showScrumMessage && (
        <div className="unlock-message">
          <strong>
            SCRUM / AGILE UNLOCKED!
          </strong>

          <span>
            Sprint Planning · Backlog · Daily Scrum · Retrospectives
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