// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserContextType = {
    userEmail: string;
    setUserEmail: (email: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userEmail, setUserEmail] = useState('');

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};