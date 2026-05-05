import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout } from '../api/authApi';

interface User {
    _id: string;
    username: string;
    role: string;
    token: string;
}

interface AuthContextType {
    user: User | null;
    loginUser: (credentials: any) => Promise<void>;
    registerUser: (credentials: any) => Promise<void>;
    logoutUser: () => void;
    isAdmin: boolean;
    isEditor: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const loginUser = async (credentials: any) => {
        const data = await login(credentials);
        setUser(data);
    };

    const registerUser = async (credentials: any) => {
        const data = await register(credentials);
        setUser(data);
    };

    const logoutUser = () => {
        logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            loginUser,
            registerUser,
            logoutUser,
            isAdmin: user?.role === 'admin',
            isEditor: user?.role === 'editor'
        }}>
            {children}
        </AuthContext.Provider>
    );
};
