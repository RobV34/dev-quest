import './App.css'
import Game from './components/Game'

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

      <Game />

      <div className="ground"></div>

    </main>
  )
}

export default App

