import { IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { createContext, ReactNode, useState } from "react";
import { loginRequest, msalConfig } from "../services/azure.config";
import { AuthContextData, AuthProviderProps, User } from "./auth.model";

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
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

    function signIn() {
        handleLogin(instance);
    }

    function signOut() {
        handleLogout(instance);
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
}