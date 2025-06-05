import './register.css'; 
import React, { useState } from 'react';

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

    const handleSubmit = () => {
        alert(`Registered:\nName: ${firstName} ${lastName}\nMajor: ${major}\nEmail: ${email}`);
        onClose(); // Close the register form after submission
    };

    return (
        <div className="register-popup">
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

            <div>
                <button className="register-button" onClick={onClose}>Cancel</button>
                <button className="register-button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Register;