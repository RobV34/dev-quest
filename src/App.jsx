import './App.css'
import Player from './components/Player'

function App() {
  return (
    <main className="game-screen">

      <header className="game-header">
        <h1>ROB VATCHER</h1>

        <h2>SOFTWARE DEVELOPER</h2>

        <p className="tagline">
          BUILD · SOLVE · IMPROVE · REPEAT
        </p>

        <button className="start-button">
          PRESS SPACE TO START
        </button>
      </header>

      <Player />

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

      <div className="ground"></div>

    </main>
  )
}

export default App

