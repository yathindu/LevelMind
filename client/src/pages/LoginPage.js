import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import'./AuthPages.css';

export default function LoginPage() {
    const [Form, setForm] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
       setForm({...Form, [e.target.name]: e.target.value});
      };
    
      const handleSubmit = async(e) =>{
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const user = await login (Form.email,Form.password);
            navigate(user.profileComplete ? '/dashboard':'/setup');
        }
        catch(err){
            setError(err.response?.data?.message || 'Login failed. Please try again.');       
        }
        finally{
            setLoading(false);
        }

      };

      return(
        <div className ="auth-page grid-bg">
            <div className="auth-card card fade-in-up">

                <Link to="/" className="auth-logo">
                   LEVEL<span style = {{color: 'var(--accent)'}}>MIND</span>
                </Link>

                <h2 className="auth-title">WELCOME BACK</h2>
                <p className="auth-subtitle">Log in to continue your journey</p>

                <form onSubmit = {handleSubmit}>
                    <div className="form-group">
                        <label>E-Mail</label>
                        <input
                          name="email"
                          type="email"
                          placeholder="gamer@gmail.com"
                          value={Form.email}
                          onChange={handleChange}
                          required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                          name="password"
                          type="password"
                          placeholder=".........."
                          value={Form.password}
                          onChange={handleChange}
                          required/>
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{marginTop:'0.5rem'}}>
                      {loading ? 'LOGGING IN...' : 'LOG IN'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>

            </div>
        </div>
      );
   
}