import './register.css'; 
import React, { useState } from 'react';
import SuccessCreatedPopup from "../SuccessCreatedPopup/SuccessCreatedPopup";
import DeniedLoginPopup from "../deniedAccountLoginPopup/deniedAccount";

interface TextArgs {
    query: string;
    handleSearchChange: (query: string) => void;
}

interface FNameArgs {
    query: string;
    handleSearchChange: (query: string) => void;
}
interface LNameArgs {
    query2: string;
    handleSearchChange: (query2: string) => void;
}
interface MajorArgs {
    query: string;
    handleSearchChange: (query: string) => void;
}
interface EmailArgs {
    query: string;
    handleSearchChange: (query: string) => void;
}

interface PasswordArgs {
    query: string;
    handleSearchChange: (query: string) => void;
}

interface RegisterProps {
    onClose: () => void;
}

function TextBar({ query, handleSearchChange }: TextArgs) {
    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter First Name"
                    value={query}
                    onChange={queryCallback}
                />
            </div>
        </>
    );
}

function LastNameTextBar({ query2, handleSearchChange }: LNameArgs) {
    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };
    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={query2}
                    onChange={queryCallback}
                />
            </div>
        </>
    );
}

function MajorTextBar({ query, handleSearchChange }: MajorArgs) {
    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };
    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter Major"
                    value={query}
                    onChange={queryCallback}
                />
            </div>
        </>
    );
}

function EmailTextBar({ query, handleSearchChange }: EmailArgs) {
    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };
    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter Northeastern Email"
                    value={query}
                    onChange={queryCallback}
                />
            </div>
        </>
    );
}

function PasswordTextBar({ query, handleSearchChange }: PasswordArgs) {
    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };
    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Enter Password"
                    value={query}
                    onChange={queryCallback}
                />
            </div>
        </>
    );
}

function Register({ onClose }: RegisterProps) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [major, setMajor] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showDeniedPopup, setShowDeniedPopup] = useState(false);

    const handleSubmit = async () => {
        if (firstName && lastName && major && email && password) {
            // Prepare data payload
            const userData = {
                name: firstName + " " + lastName,
                password: password,
                major: major,
                email: email
            };

            try {
                const response = await fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });

                if (response.ok) {
                    setShowSuccessPopup(true);

                    // Close both popup and form after 2 seconds
                    setTimeout(() => {
                        setShowSuccessPopup(false);
                        onClose();
                    }, 2000);
                } else {
                    // Handle error response from server
                    setShowDeniedPopup(true);
                    setTimeout(() => {
                        setShowDeniedPopup(false);
                    }, 2000);
                }
            } catch (error) {
                // Handle network or other errors
                console.error('Error adding user:', error);
                setShowDeniedPopup(true);
                setTimeout(() => {
                    setShowDeniedPopup(false);
                }, 2000);
            }
        } else {
            // Show denied popup if any field is empty
            setShowDeniedPopup(true);
            setTimeout(() => {
                setShowDeniedPopup(false);
            }, 2000);
        }
    };

    return (
        <div className="register-popup">
            {showSuccessPopup && <SuccessCreatedPopup />}
            {showDeniedPopup && <DeniedLoginPopup />}

            <span className="course-message-text">First Name</span>
            <TextBar query={firstName} handleSearchChange={setFirstName} />
            <span className="course-message-text">Last Name</span>
            <LastNameTextBar query2={lastName} handleSearchChange={setLastName} />
            <span className="course-message-text">Major</span>
            <MajorTextBar query={major} handleSearchChange={setMajor} />
            <span className="course-message-text">Northeastern Email</span>
            <EmailTextBar query={email} handleSearchChange={setEmail} />
            <span className="course-message-text">Password</span>
            <PasswordTextBar query={password} handleSearchChange={setPassword} />

            <div className="register-buttons-container">
                <button className="register-button cancel-button" onClick={onClose}>Cancel</button>
                <button className="register-button submit-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Register;