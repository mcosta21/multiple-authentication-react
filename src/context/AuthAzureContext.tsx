import { IPublicClientApplication } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { createContext, useEffect, useState } from "react";
import { loginRequest } from "../services/azure.config";
import { AuthContextData, AuthProviderProps, User } from "./auth.model";

export const AuthAzureContext = createContext<any>(
    { isAuthenticated: false } as AuthContextData,
);

function handleLogin(instance: IPublicClientApplication) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

function handleLogout(instance: IPublicClientApplication) {
    instance.logout().catch(e => {
        console.error(e);
    });
}

export function AuthAzureProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = useIsAuthenticated();
    const { instance } = useMsal();

    useEffect(() => {
        if(!isAuthenticated) {
            signIn();
        }
        else {
            console.log('already logged')
        }
    }, []);

    useEffect(() => {
        setUser({ email: 'teste@gmail.com', username: 'teste azure'})
    }, [isAuthenticated]);

    function signIn() {
        handleLogin(instance);
    }

    function signOut() {
        handleLogout(instance);
    }

    return (
        <AuthAzureContext.Provider
            value={{ user, isAuthenticated, signIn, signOut }}
        >
            {children}
        </AuthAzureContext.Provider>
    );
}