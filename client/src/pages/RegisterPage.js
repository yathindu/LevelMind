import { useState } from 'react';
import{Link,useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import'./AuthPages.css';

export default function RegisterPage() {
    const [Form, setForm] = useState({username: '', email: '', password: '', confirm: ''});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {register} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setForm({...Form,[e.target.name]: e.target.value});
    };

    const handlesubmit = async (e) =>{
        e.preventDefault();
        setError('');

        if (Form.password !== Form.confirm){
            return setError('Passwords do not match');
        }

        if (Form.password.length < 6){
            return setError('Password must be atleast 6 characters');
        }

        setLoading(true);
        try{
            await register(Form.username, Form.email, Form.password);
            navigate('/setup');            
        } 
        catch(err){
            setError(err.response?.data.message || 'Registration failed. Please try again.');   
        }
        finally{
            setLoading(false);
        }
    };

    return(
        <div className ="auth-page grid-bg">
            <div className="auth-card card fade-in-up">

                <Link to="/" className="auth-logo">
                   LEVEL<span style = {{color: 'var(--accent'}}>MIND</span>
                </Link>

                <h2 className="auth-title">CREATE ACCOUNT</h2>
                <p className="auth-subtitle">Start your AI coaching journey today</p>

                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label>Gamer Tag</label>
                        <input
                            name= "username"
                            type= "text"
                            placeholder= "YourGamerTag"
                            value={Form.username}
                            onChange={handleChange}
                            required/>
                    </div>

                    <div className="form-group">
                        <label>E-Mail</label>
                        <input
                            name= "email"
                            type= "email"
                            placeholder= "gamer@gmail.com"
                            value={Form.email}
                            onChange={handleChange}
                            required/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name= "password"
                            type= "password"
                            placeholder= "Minimum 6 characters"
                            value={Form.password}
                            onChange={handleChange}
                            required/>
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            name= "confirm"
                            type= "password"
                            placeholder= "Repeat password"
                            value={Form.confirm}
                            onChange={handleChange}
                            required/>
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <button 
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                      style={{marginTop:'0.5rem'}}>
                      {loading ? 'CREATING ACCOUNT...': 'CREATE ACCOUNT'}
                    </button>
                </form>

                <p className="auth-footer-text">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </div>
        </div>
    );
}