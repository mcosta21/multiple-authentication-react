import { createContext, useEffect, useState } from "react";
import { AuthContextData, AuthProviderProps, User } from "./auth.model";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

export function AuthInternProvider({ authUser, children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if(authUser) {
            signIn();
        }
    }, [authUser]);

    function signIn() {
        console.log('signin - intern', authUser)
    }

    function signOut() {
        console.log('signout - intern')
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated: true, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}
