import { createContext, useEffect, useState } from "react";
import { AuthContextData, AuthProviderProps, User } from "./auth.model";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextData>(
    { isAuthenticated: false } as AuthContextData,
);

export function AuthInternProvider({ authUser, children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if(authUser) {
            signIn();
        }
    }, [authUser]);

    function signIn() {
        if(authUser) {
            console.log('signin - intern', authUser)
            setIsAuthenticated(true);
            setUser({ email: authUser?.email, username: 'teste' });
        }
    }

    function signOut() {
        console.log('signout - intern')
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}
