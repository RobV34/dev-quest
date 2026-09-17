import { useEffect, useState } from 'react'

function Player() {
  const [position, setPosition] = useState(100)
  const [isJumping, setIsJumping] = useState(false)

  useEffect(() => {
    function handleKeyDown(event) {

      // Move right
      if (event.key === 'ArrowRight' || event.key === 'd') {
        setPosition((currentPosition) => currentPosition + 15)
      }

      // Move left
      if (event.key === 'ArrowLeft' || event.key === 'a') {
        setPosition((currentPosition) =>
          Math.max(0, currentPosition - 15)
        )
      }

      // Jump
      if (event.code === 'Space') {
        event.preventDefault()

        setIsJumping(true)

        setTimeout(() => {
          setIsJumping(false)
        }, 500)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      className={`player ${isJumping ? 'jumping' : ''}`}
      style={{ left: `${position}px` }}
    >
      <div className="player-head"></div>

      <div className="player-body">
        {'</>'}
      </div>
    </div>
  )
}

export default Player