import './forgotPassword.css'; 
import React, { useState } from 'react';

interface TextArgs {
    query: string;
    handleSearchChange: (query: string) => void;
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

function ForgotPassword() {
    const [query, setQuery] = useState('');

    const handleCancel = () => {
        setQuery('');
    };

    const handleReset = () => {
        alert(`Reset link sent to: ${query}`);
    };

    return (
        <div className="password-popup">
            <span className="course-message-text">Verify Email and Reset Password</span>
            <TextBar query={query} handleSearchChange={setQuery} />
            <div className="button-group">
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
                <button className="reset-button" onClick={handleReset}>Reset Password</button>
            </div>
        </div>
    );
};

export default ForgotPassword;
