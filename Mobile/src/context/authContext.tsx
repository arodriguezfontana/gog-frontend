import React, { createContext, useState, useContext, ReactNode } from "react";
import { User } from "../types/user";

type AuthContextType = {
    token: string | null;
    id: string | null;
    setToken: (token: string | null) => void;
    logout: () => void;
    login: (user: User, token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);

    const login = (user: User, token: string | null) => {
        setToken(token);
        setId(user?.id);
    }

    const logout = () => {
        setToken(null);
        setId(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout, login, id }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};