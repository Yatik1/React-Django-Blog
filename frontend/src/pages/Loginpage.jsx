import { Link ,useNavigate} from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from '../contexts/authcontexts';
import { useState} from "react";

function Loginpage() {
    const { login,currentUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    function handleRedirect(path) {
    navigate(path); // Navigate after login
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            handleRedirect('/')
        } catch (error) {
            setError('Failed to login');
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        {error && <p style={{color: "red"}}>{error}</p>}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button disabled={loading} type="submit">Login</button>
                        <p>Need an new account? <Link to="/signup">Sign Up</Link></p>
                    </form>
                </div>
            </div>
            <footer>
                <div className='footer-container'>
                    <p>@BuggsBunny</p>
                </div>
            </footer>
        </>
    );
}

export default Loginpage;
