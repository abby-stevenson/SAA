import React, {createContext, useContext, useState, ReactNode, useCallback} from 'react';

interface UserProfile {
  email: string;
  name: string;
  major: string;
}

interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
  fetchUser: (email: string) => Promise<void>;
  logoutMessage: boolean;
  setLogoutMessage: (flag: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [email, setEmail] = useState('');
  const [logoutMessage, setLogoutMessage] = useState(false);


  const fetchUser = useCallback(async (email: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/user?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('User not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData: UserProfile = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      throw error;
    }
  }, []);


  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setLogoutMessage(true);
  };

  return (
      <UserContext.Provider value={{ email, setEmail, user, setUser, logout, fetchUser, logoutMessage, setLogoutMessage}}>
        {children}
      </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};