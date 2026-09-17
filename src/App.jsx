import './App.css'
import Game from './components/Game'

function App() {
  const scrollToPortfolio = () => {
    document
      .getElementById('about')
      ?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="portfolio-site">
      <section className="game-screen" id="dev-quest">
        <header className="game-header">
          <h1>ROB VATCHER</h1>
          <h2>SOFTWARE DEVELOPER</h2>

          <p className="tagline">
            BUILD · SOLVE · IMPROVE · REPEAT
          </p>

          <div className="game-actions">
            <button className="start-button" type="button">
              PRESS SPACE TO JUMP
            </button>

            <button
              className="skip-button"
              type="button"
              onClick={scrollToPortfolio}
            >
              SKIP TO PORTFOLIO ↓
            </button>
          </div>

          <p className="game-controls">
            MOVE: ← → OR A / D · JUMP: SPACE
          </p>
        </header>

        <Game />
        <div className="ground"></div>
      </section>

      <section className="portfolio-content" id="about">
        <div className="portfolio-container">
          <p className="section-kicker">PLAYER PROFILE</p>
          <h2>About Me</h2>

          <p className="about-lead">
            I bring software development skills together with experience in
            Agile teamwork, project delivery, data analysis, technical support,
            and business development.
          </p>

          <p className="about-copy">
            My background spans hands-on technology and client-focused delivery:
            building software, working with data under tight deadlines,
            coordinating projects and stakeholders, troubleshooting technical
            issues, and connecting solutions to business needs. I enjoy solving
            problems collaboratively and turning requirements into practical,
            high-quality results.
          </p>

          <div className="profile-tags" aria-label="Professional focus areas">
            <span>Software Development</span>
            <span>Scrum &amp; Agile</span>
            <span>Project Management</span>
            <span>Data</span>
            <span>Technical &amp; Business Development</span>
          </div>
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="portfolio-container">
          <p className="section-kicker">CAREER QUEST</p>
          <h2>Experience</h2>

          <div className="experience-grid">
            <article className="experience-card">
              <div className="experience-number">01</div>
              <p className="experience-type">IT SUPPORT</p>
              <h3>ESPN</h3>
              <p>
                Provided online support for ESPN+ and ESPN apps, including
                account management and troubleshooting streaming issues.
              </p>
            </article>

            <article className="experience-card">
              <div className="experience-number">02</div>
              <p className="experience-type">DATA ANALYST</p>
              <h3>Pro Football Focus</h3>
              <p>
                Conducted film analysis contributing to high-quality data
                insights while working under tight deadlines.
              </p>
            </article>

            <article className="experience-card">
              <div className="experience-number">03</div>
              <p className="experience-type">PROJECT MANAGER</p>
              <h3>Short Atlantic Inc.</h3>
              <p>
                Managed subcontractors, timelines and budgets, commissioned
                completed projects, and coordinated with contractors,
                architects and officials to meet project specifications.
              </p>
            </article>

            <article className="experience-card">
              <div className="experience-number">04</div>
              <p className="experience-type">SENIOR BUSINESS DEVELOPMENT</p>
              <h3>Black &amp; MacDonald</h3>
              <p>
                Helped increase HVAC division sales by 70% and expanded into
                project sales while working with technicians to support
                successful delivery.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
