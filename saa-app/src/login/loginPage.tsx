import React, {useState} from 'react';
import "./loginPage.css";
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import ForgotPassword from "../components/forgotPassword/forgotPassword";
import Register from "../components/register/register";
import IncorrectPasswordPopup from "../components/incorrectPasswordPopup/incorrectPassword";
import { useUser } from '../context/UserContext';

interface UserProfile {
    email: string;
    name: string;
    major: string;
}

function LoginPage() {
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [email, setEmail] = useState(''); // Added email state
    const [password, setPassword] = useState(''); // Added password state
    const [error, setError] = useState('');
    const [showIncorrectPassword, setShowIncorrectPassword] = useState(false);
    const navigate = useNavigate();
    const { user, setUser, setEmail: setUserEmail } = useUser();

    // Dummy user data
    const dummyUsers = [
        { email: 'user@neu.edu', password: 'password123' },
        { email: 'test@neu.edu', password: 'test123' }
    ];

    const handleLogin = () => {
        setError(''); // Reset error message
        setShowIncorrectPassword(false);


        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        setShowIncorrectPassword(true); 
                    } else {
                        setError('Login failed. Please try again.');
                    }
                    throw new Error('Login failed');
                }
                return response.json(); 
            })
            .then(data => {
                const userProfile: UserProfile = {
                    email: data.email,
                    name: data.name || '', 
                    major: data.major || '' 
                };

                setUserEmail(email); 
                setUser(userProfile);
                navigate('/SAA/Home');
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    };

    return (
        <div className="login-side-by-side">
            <img src="khouryLoginPic.png" alt="" className="full-height-img"/>

            {!showRegister ? (
                <div className="login-rest-of-page">
                    <div className="centered-container">
                        <div className="title-login">Study Abroad Advisor</div>
                        <div className="text-login">Sign in to discover your pathway to
                            <div>computer science abroad</div>
                        </div>
                        <div className="text-container">
                            <div>Email</div>
                            <input
                                className="text-box-login"
                                type="text"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="text-container">
                            <div>Password</div>
                            <input
                                className="text-box-login"
                                type="password" 
                                placeholder="Enter your password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="error-message">{error}</div>}
                        <div>
                            <button
                                className="login-button"
                                onClick={handleLogin} 
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="text-container">
                            <span className="forgot-password-link"
                                  onClick={() => setShowForgotPassword(true)}>
                              Forgot Password?
                            </span>
                        </div>
                        <div className="or-separator">
                            <hr className="or-line" />
                            <span className="or-word">or</span>
                            <hr className="or-line" />
                        </div>
                        <div>
                            <button
                                className="register-button-login"
                                onClick={() => setShowRegister(true)}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="login-rest-of-page">
                    <Register onClose={() => setShowRegister(false)} />
                </div>
            )}

            {showForgotPassword && (
                <div className="modal-overlay">
                    <ForgotPassword
                        onClose={() => setShowForgotPassword(false)}
                    />
                </div>
            )}

            {showIncorrectPassword && (
                <div className="modal-overlay">
                    <IncorrectPasswordPopup
                        onClose={() => setShowIncorrectPassword(false)}
                    />
                </div>
            )}


        </div>
    );
}

export default LoginPage;