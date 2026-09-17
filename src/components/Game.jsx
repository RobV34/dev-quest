import { useEffect, useRef, useState } from 'react'
import Player from './Player'

function Game() {
  // ---------- PLAYER STATE ----------

  const [x, setX] = useState(100)
  const [y, setY] = useState(110)

  // ---------- CAMERA STATE ----------

  const [cameraX, setCameraX] = useState(0)

  // ---------- DEVELOPMENT STATE ----------

  const [developmentUnlocked, setDevelopmentUnlocked] =
    useState(false)

  const [showUnlockMessage, setShowUnlockMessage] =
    useState(false)

  // ---------- SCRUM / AGILE STATE ----------

  const [scrumUnlocked, setScrumUnlocked] =
    useState(false)

  const [showScrumMessage, setShowScrumMessage] =
    useState(false)

    // ---------- PROJECT MANAGEMENT STATE ----------

const [projectManagementUnlocked, setProjectManagementUnlocked] =
useState(false)

const [showProjectManagementMessage, setShowProjectManagementMessage] =
useState(false)

// ---------- DATA STATE ----------

const [dataCollected, setDataCollected] =
  useState(false)

const [showDataMessage, setShowDataMessage] =
  useState(false)
   const [databaseLoaded, setDatabaseLoaded] =
  useState(false)

const [showDatabaseMessage, setShowDatabaseMessage] =
  useState(false)

const [dataUnlocked, setDataUnlocked] =
  useState(false)

const [showDataUnlockedMessage, setShowDataUnlockedMessage] =
  useState(false)

// ---------- PORTFOLIO STATE ----------

const [portfolioReached, setPortfolioReached] =
  useState(false)

const [showQuestComplete, setShowQuestComplete] =
  useState(false)

  // ---------- PHYSICS REFS ----------

  const yRef = useRef(110)
  const velocityY = useRef(0)
  const isOnGround = useRef(true)

  // ---------- GAME CONSTANTS ----------

  const GROUND_Y = 110
  const GRAVITY = -0.7
  const JUMP_POWER = 13

  const PLAYER_WIDTH = 55

  // Rob stays around this position once camera starts moving
  const CAMERA_START = 500

  // ---------- WORLD POSITIONS ----------

  /*
    These positions now belong to the GAME WORLD,
    not to the browser window.

    Development starts at X = 500.

    Scrum starts farther into the world.
  */

  const DEVELOPMENT_X = 500
  const DEVELOPMENT_WIDTH = 230
  const DEVELOPMENT_Y = 175

  const SCRUM_TODO_X = 950
  const SCRUM_PROGRESS_X = 1085
  const SCRUM_DONE_X = 1220

  // ---------- PROJECT MANAGEMENT ----------

const PM_PLAN_X = 1650
const PM_BUILD_X = 1900
const PM_DELIVER_X = 2150

// ---------- DATA ----------

const DATA_RAW_X = 2600
const DATA_DATABASE_X = 2800
const DATA_INSIGHTS_X = 3000

// ---------- PORTFOLIO FINISH ----------

const PORTFOLIO_X = 3500

  // ---------- PLATFORM DATA ----------

  const getPlatforms = () => {
    return [
      {
        name: 'development',
        x: DEVELOPMENT_X,
        width: DEVELOPMENT_WIDTH,
        y: DEVELOPMENT_Y,
      },
      {
        name: 'todo',
        x: SCRUM_TODO_X,
        width: 115,
        y: 170,
      },
      {
        name: 'progress',
        x: SCRUM_PROGRESS_X,
        width: 115,
        y: 235,
      },
      {
        name: 'done',
        x: SCRUM_DONE_X,
        width: 115,
        y: 300,
      },
  
      // ---------- PROJECT MANAGEMENT ----------
  
      {
        name: 'plan',
        x: PM_PLAN_X,
        width: 150,
        y: 185,
      },
      {
        name: 'build',
        x: PM_BUILD_X,
        width: 150,
        y: 185,
      },
      {
        name: 'deliver',
        x: PM_DELIVER_X,
        width: 150,
        y: 185,
      },

      // ---------- DATA ----------
      {
        name: 'raw-data',
        x: DATA_RAW_X,
        width: 150,
        y: 185,
      },
      {
        name: 'database',
        x: DATA_DATABASE_X,
        width: 150,
        y: 185,
      },
      {
        name: 'insights',
        x: DATA_INSIGHTS_X,
        width: 150,
        y: 185,
      },
    ]
  }

  // ---------- GAME LOOP ----------

  useEffect(() => {
    function handleKeyDown(event) {
      // Move right
      if (
        event.key === 'ArrowRight' ||
        event.key === 'd'
      ) {
        setX((currentX) => currentX + 15)
      }

      // Move left
      if (
        event.key === 'ArrowLeft' ||
        event.key === 'a'
      ) {
        setX((currentX) =>
          Math.max(0, currentX - 15)
        )
      }

      // Jump
      if (
        event.code === 'Space' &&
        isOnGround.current
      ) {
        event.preventDefault()

        velocityY.current = JUMP_POWER
        isOnGround.current = false
      }
    }

    window.addEventListener(
      'keydown',
      handleKeyDown
    )

    const gameLoop = setInterval(() => {
      const previousY = yRef.current

      // ---------- GRAVITY ----------

      velocityY.current += GRAVITY
      yRef.current += velocityY.current

      // ---------- DEVELOPMENT PICKUP ----------

      const pickupX =
        DEVELOPMENT_X +
        DEVELOPMENT_WIDTH / 2

      const touchingDevelopmentPickup =
        x + PLAYER_WIDTH > pickupX - 35 &&
        x < pickupX + 35 &&
        yRef.current >= DEVELOPMENT_Y &&
        yRef.current <= DEVELOPMENT_Y + 100

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

      // ---------- DATA PICKUP ----------

const dataPickupX = DATA_RAW_X + 75

const touchingDataPickup =
  x + PLAYER_WIDTH > dataPickupX - 40 &&
  x < dataPickupX + 40 &&
  yRef.current >= 185 &&
  yRef.current <= 280

if (
  touchingDataPickup &&
  !dataCollected
) {
  setDataCollected(true)
  setShowDataMessage(true)

  setTimeout(() => {
    setShowDataMessage(false)
  }, 2000)
}

// ---------- DATABASE ----------

const touchingDatabase =
  x + PLAYER_WIDTH > DATA_DATABASE_X &&
  x < DATA_DATABASE_X + 150

if (
  touchingDatabase &&
  dataCollected &&
  !databaseLoaded
) {
  setDatabaseLoaded(true)
  setShowDatabaseMessage(true)

  setTimeout(() => {
    setShowDatabaseMessage(false)
  }, 2000)
}

// ---------- INSIGHTS / DATA COMPLETE ----------

const touchingInsights =
  x + PLAYER_WIDTH > DATA_INSIGHTS_X &&
  x < DATA_INSIGHTS_X + 150

if (
  touchingInsights &&
  databaseLoaded &&
  !dataUnlocked
) {
  setDataUnlocked(true)
  setShowDataUnlockedMessage(true)

  setTimeout(() => {
    setShowDataUnlockedMessage(false)
  }, 2000)
}

// ---------- PORTFOLIO FINISH ----------

const touchingPortfolio =
  x + PLAYER_WIDTH > PORTFOLIO_X &&
  x < PORTFOLIO_X + 180

if (
  touchingPortfolio &&
  !portfolioReached
) {
  setPortfolioReached(true)
  setShowQuestComplete(true)
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
          // ---------- PROJECT MANAGEMENT COMPLETE ----------

if (
    platform.name === 'deliver' &&
    !projectManagementUnlocked
  ) {
    setProjectManagementUnlocked(true)
    setShowProjectManagementMessage(true)
  
    setTimeout(() => {
      setShowProjectManagementMessage(false)
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

      // ---------- UPDATE PLAYER Y ----------

      setY(yRef.current)

      // ---------- CAMERA ----------

      if (x > CAMERA_START) {
        setCameraX(x - CAMERA_START)
      } else {
        setCameraX(0)
      }
    }, 16)

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      )

      clearInterval(gameLoop)
    }
  }, [
    x,
    developmentUnlocked,
    scrumUnlocked,
    projectManagementUnlocked,
    dataCollected,
    databaseLoaded,
    dataUnlocked,
    portfolioReached,
  ])

  return (
    <>
      {/* ---------- PLAYER ---------- */}

      <Player
        x={x - cameraX}
        y={y}
      />

      {/* ---------- DEVELOPMENT ---------- */}

      <div
        className="platform platform-one"
        style={{
          left: `${DEVELOPMENT_X - cameraX}px`,
        }}
      >
        {!developmentUnlocked && (
          <div className="skill-pickup">
            <span className="skill-icon">
              {'</>'}
            </span>
          </div>
        )}

        <div className="skill-sign">
          <strong>
            DEVELOPMENT
          </strong>

          <span>
            React · Node.js
          </span>

          <span>
            Java · Spring Boot
          </span>
        </div>
      </div>

      {/* ---------- SCRUM / AGILE ---------- */}

      <div
        className="scrum-platform scrum-todo"
        style={{
          left: `${SCRUM_TODO_X - cameraX}px`,
          bottom: '110px',
        }}
      >
        <strong>TODO</strong>
        <span>▢ ▢ ▢</span>
      </div>

      <div
        className="scrum-platform scrum-progress"
        style={{
          left: `${SCRUM_PROGRESS_X - cameraX}px`,
          bottom: '175px',
        }}
      >
        <strong>
          IN PROGRESS
        </strong>

        <span>▣ ▢ ▢</span>
      </div>

      <div
        className="scrum-platform scrum-done"
        style={{
          left: `${SCRUM_DONE_X - cameraX}px`,
          bottom: '240px',
        }}
      >
        <strong>DONE</strong>
        <span>✓ ✓ ✓</span>
      </div>

      {/* ---------- PROJECT MANAGEMENT ---------- */}

<div
  className="pm-stage"
  style={{
    left: `${PM_PLAN_X - cameraX}px`,
  }}
>
  <strong>PLAN</strong>
  <span>Scope</span>
</div>

<div
  className="pm-stage"
  style={{
    left: `${PM_BUILD_X - cameraX}px`,
  }}
>
  <strong>BUILD</strong>
  <span>Coordinate</span>
</div>

<div
  className="pm-stage"
  style={{
    left: `${PM_DELIVER_X - cameraX}px`,
  }}
>
  <strong>DELIVER</strong>
  <span>Results</span>
</div>

{/* ---------- DATA ---------- */}

<div
  className="data-stage"
  style={{
    left: `${DATA_RAW_X - cameraX}px`,
  }}
>
  {!dataCollected && (
    <div className="data-pickup">
      <span>●</span>
      <span>●</span>
      <span>●</span>
    </div>
  )}

  <strong>RAW DATA</strong>
  <span>01 · 10 · 11</span>
</div>
<div
  className={`data-stage ${
    databaseLoaded ? 'data-stage-active' : ''
  }`}
  style={{
    left: `${DATA_DATABASE_X - cameraX}px`,
  }}
>
  <strong>
    {databaseLoaded ? 'DATABASE ✓' : 'DATABASE'}
  </strong>

  <span>
    {databaseLoaded ? 'Data Stored' : 'PostgreSQL'}
  </span>
</div>

<div
  className={`data-stage ${
    dataUnlocked ? 'data-stage-active' : ''
  }`}
  style={{
    left: `${DATA_INSIGHTS_X - cameraX}px`,
  }}
>
  <strong>
    {dataUnlocked ? 'INSIGHTS ✓' : 'INSIGHTS'}
  </strong>

  <span>
    {dataUnlocked ? 'Data Understood' : 'Analyze · Decide'}
  </span>
</div>

      {/* ---------- PORTFOLIO FINISH ---------- */}

      <div
        className={`portfolio-finish ${
          portfolioReached ? 'portfolio-finish-reached' : ''
        }`}
        style={{
          left: `${PORTFOLIO_X - cameraX}px`,
        }}
      >
        <div className="finish-flag">🏁</div>
        <strong>PORTFOLIO</strong>
        <span>Finish the quest</span>
      </div>

      {/* ---------- QUEST COMPLETE ---------- */}

      {showQuestComplete && (
        <div className="quest-complete">
          <strong>QUEST COMPLETE!</strong>
          <span>Explore My Portfolio ↓</span>
        </div>
      )}

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

      {/* ---------- PROJECT MANAGEMENT MESSAGE ---------- */}

{showProjectManagementMessage && (
  <div className="unlock-message">
    <strong>
      PROJECT MANAGEMENT UNLOCKED!
    </strong>

    <span>
      Planning · Scope · Coordination · Risk · Delivery
    </span>
  </div>
)}

{/* ---------- DATA MESSAGE ---------- */}

{showDataMessage && (
  <div className="unlock-message">
    <strong>
      DATA COLLECTED!
    </strong>

    <span>
      Send it to the database →
    </span>
  </div>
)}

{/* ---------- DATABASE MESSAGE ---------- */}

{showDatabaseMessage && (
  <div className="unlock-message">
    <strong>
      DATABASE LOADED!
    </strong>

    <span>
      PostgreSQL · Data Stored → Analyze
    </span>
  </div>
)}

{/* ---------- DATA UNLOCKED MESSAGE ---------- */}

{showDataUnlockedMessage && (
  <div className="unlock-message">
    <strong>
      DATA UNLOCKED!
    </strong>

    <span>
      PostgreSQL · Data Processing · Analysis · Insights
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
        World X: {Math.round(x)}
        {' | '}
        Screen X: {Math.round(x - cameraX)}
        {' | '}
        Y: {Math.round(y)}
        {' | '}
        Camera: {Math.round(cameraX)}
      </div>
    </>
  )
}

export default Game