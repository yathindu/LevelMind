import { Link } from 'react-router-dom';
import './LandingPage.css';

const GAMES = ['Valorant', 'CS2', 'League of Legends', 'PUBG', 'Apex Legends', 'Dota 2', 'Fortnite', 'Overwatch 2'];

export default function LandingPage() {
  return (
    <div className="landing grid-bg">


      <nav className="landing-nav">
        <div className="container landing-nav-inner">
          <div className="landing-logo">
            LEVEL<span style={{ color: 'var(--accent)' }}>MIND</span>
          </div>
          <div className="nav-links">
            <Link to="/login" className="btn-secondary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.7rem' }}>
              LOG IN
            </Link>
            <Link to="/register" className="btn-primary" style={{ width: 'auto', padding: '0.5rem 1.2rem', fontSize: '0.7rem' }}>
              GET STARTED
            </Link>
          </div>
        </div>
      </nav>


      <section className="hero container">
        <div className="hero-content fade-in-up">
          <div className="tag" style={{ marginBottom: '1.5rem' }}>
            ⚡ AI-Powered Gaming Coach
          </div>
          <h1 className="hero-title">
            LEVEL UP YOUR<br />
            <span className="hero-accent glow-text">GAME.</span>
          </h1>
          <p className="hero-subtitle">
            LevelMind analyzes your gameplay sessions and delivers
            personalized AI coaching tips — like having a pro coach
            in your corner, 24/7.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn-primary" style={{ width: 'auto', padding: '1rem 2.5rem' }}>
              START FOR FREE
            </Link>
            <p className="hero-note">No credit card required · Works with all popular games</p>
          </div>
        </div>


        <div className="hero-card fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="hero-card-header">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="hero-card-title">AI COACH INSIGHT</span>
          </div>
          <div className="hero-card-body">
            <div className="insight-item">
              <span className="insight-label">📊 Session Analysis</span>
              <p className="insight-text">
                Your win rate drops 42% in rounds lasting over 3 minutes.
                Focus on early aggression and map control.
              </p>
            </div>
            <div className="insight-item">
              <span className="insight-label">🎯 This Week's Focus</span>
              <p className="insight-text">
                Practice crosshair placement at head level. Run 20 aim
                trainer sessions targeting flick accuracy.
              </p>
            </div>
            <div className="insight-item">
              <span className="insight-label">📈 Rank Progress</span>
              <div className="progress-bar-wrap">
                <div className="progress-bar" style={{ width: '68%' }} />
              </div>
              <span className="progress-label">68% toward Diamond rank goal</span>
            </div>
          </div>
        </div>
      </section>

      <div className="games-ticker">
        <div className="ticker-track">
          {[...GAMES, ...GAMES].map((g, i) => (
            <span key={i} className="ticker-item">{g}</span>
          ))}
        </div>
      </div>

      <section className="features container">
        <h2 className="section-title">
          WHY <span style={{ color: 'var(--accent)' }}>LEVELMIND?</span>
        </h2>
        <div className="features-grid">
          {[
            { icon: '🤖', title: 'AI Analysis', desc: 'Deep analysis of your sessions to find exactly where you lose — and how to fix it.' },
            { icon: '📊', title: 'Performance Dashboard', desc: 'Visual charts tracking your KDA, win rate, and improvement over time.' },
            { icon: '🎯', title: 'Goal Tracker', desc: 'Set rank goals and get AI-generated tasks to hit them on schedule.' },
            { icon: '🎮', title: 'Riot API', desc: 'Auto-import your Valorant and League of Legends match history. No manual logging needed.' },
          ].map((f) => (
            <div className="feature-card card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="cta-section">
        <div className="container cta-inner">
          <h2 className="cta-title">
            READY TO <span style={{ color: 'var(--accent)' }} className="glow-text">DOMINATE?</span>
          </h2>
          <Link to="/register" className="btn-primary" style={{ width: 'auto', padding: '1rem 3rem' }}>
            CREATE FREE ACCOUNT
          </Link>
        </div>
      </section>


      <footer className="footer">
        <p>© 2024 LevelMind · Built with React, Node.js & AI</p>
      </footer>

    </div>
  );
}