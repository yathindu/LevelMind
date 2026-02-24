import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ProfileSetupPage.css';

const POPULAR_GAMES = ['Valorant', 'CS2', 'League of Legends', 'PUBG', 'Apex Legends', 'Dota 2', 'Fortnite', 'Overwatch 2'];
const PLAYSTYLES = ['Aggressive', 'Defensive', 'Support', 'Balanced', 'Strategic'];
const GOAL_OPTIONS = ['Reach a higher rank', 'Improve aim accuracy', 'Better game sense', 'Improve teamwork', 'Consistent performance', 'Learn new strategies'];

export default function ProfileSetupPage() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    bio: '',
    playstyle: 'Balanced',
    games: [],
    goals: [],
  });

  const toggleGame = (game) => {
    setProfile((p) => ({
      ...p,
      games: p.games.find((g) => g.name === game)
        ? p.games.filter((g) => g.name !== game)
        : [...p.games, { name: game, rank: 'Unranked', hoursPlayed: 0 }],
    }));
  };

  const toggleGoal = (goal) => {
    setProfile((p) => ({
      ...p,
      goals: p.goals.includes(goal)
        ? p.goals.filter((g) => g !== goal)
        : [...p.goals, goal],
    }));
  };

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.put('/api/profile/setup', profile);
      updateUser(res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-page grid-bg">
      <div className="setup-container">

        <div className="setup-header fade-in-up">
          <div className="setup-logo">
            LEVEL<span style={{ color: 'var(--accent)' }}>MIND</span>
          </div>
          <h1 className="setup-title">GAMER PROFILE SETUP</h1>
          <p className="setup-subtitle">Help your AI coach understand you, {user?.username}</p>

          <div className="steps">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`step ${step >= s ? 'active' : ''}`}>
                <div className="step-dot">{step > s ? '✓' : s}</div>
                <span className="step-label">
                  {s === 1 ? 'Playstyle' : s === 2 ? 'Games' : 'Goals'}
                </span>
              </div>
            ))}
          </div>
        </div>

 
        <div className="setup-card card fade-in-up">

 
          {step === 1 && (
            <div>
              <h2 className="step-title">HOW DO YOU PLAY?</h2>
              <p className="step-desc">Choose the playstyle that best describes you</p>
              <div className="playstyle-grid">
                {PLAYSTYLES.map((ps) => (
                  <button
                    key={ps}
                    type="button"
                    className={`playstyle-btn ${profile.playstyle === ps ? 'selected' : ''}`}
                    onClick={() => setProfile({ ...profile, playstyle: ps })}
                  >
                    {ps}
                  </button>
                ))}
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label>Bio (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell your AI coach about yourself..."
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  maxLength={200}
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          )}


          {step === 2 && (
            <div>
              <h2 className="step-title">WHAT DO YOU PLAY?</h2>
              <p className="step-desc">Select all games you play</p>
              <div className="games-grid">
                {POPULAR_GAMES.map((game) => (
                  <button
                    key={game}
                    type="button"
                    className={`game-btn ${profile.games.find((g) => g.name === game) ? 'selected' : ''}`}
                    onClick={() => toggleGame(game)}
                  >
                    <span className="game-check">
                      {profile.games.find((g) => g.name === game) ? '✓' : '+'}
                    </span>
                    {game}
                  </button>
                ))}
              </div>
            </div>
          )}


          {step === 3 && (
            <div>
              <h2 className="step-title">WHAT ARE YOUR GOALS?</h2>
              <p className="step-desc">Select all that apply</p>
              <div className="goals-grid">
                {GOAL_OPTIONS.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    className={`goal-btn ${profile.goals.includes(goal) ? 'selected' : ''}`}
                    onClick={() => toggleGoal(goal)}
                  >
                    <span className="goal-check">
                      {profile.goals.includes(goal) ? '✓' : '+'}
                    </span>
                    {goal}
                  </button>
                ))}
              </div>
              {error && <p className="error-msg" style={{ marginTop: '1rem' }}> {error}</p>}
            </div>
          )}


          <div className="setup-nav">
            {step > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setStep(step - 1)}
              >
                ← BACK
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                className="btn-primary"
                style={{ width: 'auto', flex: 1 }}
                onClick={() => setStep(step + 1)}
                disabled={step === 2 && profile.games.length === 0}
              >
                NEXT →
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary"
                style={{ width: 'auto', flex: 1 }}
                onClick={handleSubmit}
                disabled={loading || profile.goals.length === 0}
              >
                {loading ? 'SAVING...' : ' LAUNCH MY COACHING'}
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}