import { Link,useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { useAuth } from '../contexts/authcontexts';
import { useState } from "react";

function Signuppage() {
    const { signup } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    function handleRedirect(path) {
    navigate(path); // Navigate after login
    }
    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            console.error('Error set for password mismatch'); // Debugging log
            return; // Stop the function from continuing
        }

        try {
            setError(''); // Resetting error before attempting signup
            setLoading(true);
            await signup(email, password);
            setLoading(false);
            handleRedirect('/')
            // Redirect or clear form here
        } catch (error) {
            console.error('Signup failed:', error);
            setError('Failed to create an account');
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                <div className="login-card">
                    <form onSubmit={handleSubmit}>
                        <h1>SignUp</h1>
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
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button disabled={loading} type="submit">Signup</button>
                        <p>Already have an account? <Link to="/login">Log In</Link></p>
                    </form>
                </div>
            </div>
            <footer>
                <div className='footer-container'>
                    <p>@BuggsBUnny</p>
                </div>
            </footer>
        </>
    );
}

export default Signuppage;
