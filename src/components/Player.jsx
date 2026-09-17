function Player({ x, y }) {
    return (
      <div
        className="player"
        style={{
          left: `${x}px`,
          bottom: `${y}px`,
        }}
      >
        <div className="player-head"></div>
  
        <div className="player-body">
          {'</>'}
        </div>
      </div>
    )
  }
  
  export default Player