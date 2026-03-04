import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard grid-bg">

      <aside className="sidebar">
        <div className="sidebar-logo">
          LEVEL<span style={{ color: 'var(--accent)' }}>MIND</span>
        </div>

        <nav className="sidebar-nav">
          {[
            { icon: '🏠', label: 'Dashboard', active: true },
            { icon: '📋', label: 'Sessions', active: false },
            { icon: '🤖', label: 'AI Coach', active: false },
            { icon: '📊', label: 'Stats', active: false },
            { icon: '🎯', label: 'Goals', active: false },
          ].map((item) => (
            <button key={item.label} className={`nav-item ${item.active ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          ⏻ LOGOUT
        </button>
      </aside>


      <main className="main-content">


        <header className="topbar">
          <div>
            <h1 className="page-title">DASHBOARD</h1>
            <p className="page-subtitle">
              Welcome back, <span style={{ color: 'var(--accent)' }}>{user?.username}</span>
            </p>
          </div>
          <div className="user-badge">
            <div className="user-avatar">
              {user?.username?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="user-name">{user?.username}</p>
              <span className="tag">{user?.playstyle}</span>
            </div>
          </div>
        </header>


        <div className="stats-row fade-in-up">
          {[
            { label: 'Games Tracked', value: user?.games?.length || 0, icon: '🎮' },
            { label: 'Sessions Logged', value: 0, icon: '📋' },
            { label: 'AI Insights', value: 0, icon: '🤖' },
            { label: 'Goals Active', value: user?.goals?.length || 0, icon: '🎯' },
          ].map((stat) => (
            <div key={stat.label} className="stat-card card">
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>


        <div className="content-grid fade-in-up">


          <div className="card">
            <h3 className="card-title">MY GAMES</h3>
            {user?.games?.length > 0 ? (
              <div className="games-list">
                {user.games.map((game, i) => (
                  <div key={i} className="game-row">
                    <span className="game-name">{game.name}</span>
                    <span className="tag">{game.rank}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No games added yet</p>
            )}
          </div>

          <div className="card">
            <h3 className="card-title">MY GOALS</h3>
            {user?.goals?.length > 0 ? (
              <div className="goals-list">
                {user.goals.map((goal, i) => (
                  <div key={i} className="goal-row">
                    <span className="goal-dot">▶</span>
                    <span className="goal-text">{goal}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-msg">No goals set yet</p>
            )}
          </div>


          <div className="card ai-card">
            <h3 className="card-title">AI COACH</h3>
            <div className="coming-soon">
              <span className="coming-icon">🤖</span>
              <p className="coming-title">LOG YOUR FIRST SESSION</p>
              <p className="coming-desc">
                Once you log a gameplay session, your AI coach will analyze
                your performance and deliver personalized tips.
              </p>
              <button className="btn-primary" style={{ marginTop: '1.5rem' }} disabled>
                COMING IN PHASE 2
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}