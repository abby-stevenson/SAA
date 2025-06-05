import './forgotPassword.css'; 
import React, { useState } from 'react';

interface TextArgs {
    query: string;
    handleSearchChange: (query: string) => void;
}

interface ForgotPasswordProps {
    onClose: () => void;
}

function TextBar({ query, handleSearchChange }: TextArgs) {
    const queryCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchChange(e.target.value);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder="Enter Northeastern Email"
                value={query}
                onChange={queryCallback}
            />
        </div>
    );
}

function ForgotPassword({ onClose }: ForgotPasswordProps) {
    const [query, setQuery] = useState('');

    const handleReset = () => {
        alert(`Reset link sent to: ${query}`);
        onClose(); // Close popup after sending
    };

    return (
        <div className="password-popup">
            <span className="course-message-text">Verify Email and Reset Password</span>
            <TextBar query={query} handleSearchChange={setQuery} />
            <div className="button-group">
                <button className="cancel-button" onClick={onClose}>Cancel</button>
                <button className="reset-button" onClick={handleReset}>Reset Password</button>
            </div>
        </div>
    );
};

export default ForgotPassword;
