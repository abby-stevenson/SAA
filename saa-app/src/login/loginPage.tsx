import React from 'react';
import "./loginPage.css";
import { Link } from 'react-router-dom';

function LoginPage() {
    return (
        <div className="login-side-by-side">
            <img src="khouryLoginPic.png" alt="" className="full-height-img"/>
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
                        />
                    </div>

                    <div className="text-container">
                        <div>Password</div>
                        <input
                            className="text-box-login"
                            type="text"
                            placeholder="Enter your password..."
                        />
                    </div>
                    <div>
                        <button className="login-button">Sign in</button>
                    </div>
                    <div className="text-container">
                        <Link to="/SAA/Login/Forgot-Password" className="forgot-pass">Forgot Password?</Link>
                    </div>
                    <div className="or-separator">
                        <hr className="or-line" />
                        <span className="or-word">or</span>
                        <hr className="or-line" />
                    </div>
                    <div>
                        <button className="register-button">Sign in</button>
                    </div>
                </div>

            </div>


        </div>
    );
}

export default LoginPage;