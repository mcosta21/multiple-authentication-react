import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { useState } from "react";
import { useEffect } from "react";
import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { msalConfig } from "../services/azure.config";
import { AuthMethod, AuthUser } from "./auth.model";
import { AuthAzureProvider } from "./AuthAzureContext";
import { AuthProvider } from "./AuthContext";
import { AuthInternProvider } from "./AuthInternContext";


interface AuthMethodProviderProps {
    method?: AuthMethod;
    children: ReactNode;
}

interface AuthMethodContextData {
    method?: AuthMethod;
    setMethod: (method: AuthMethod, authUser?: AuthUser) => void;
}

export const AuthMethodContext = createContext<AuthMethodContextData>(
    {} as AuthMethodContextData,
);

export function AuthMethodProvider({ method, children }: AuthMethodProviderProps) {
    
    const msalInstance = new PublicClientApplication(msalConfig);
    const [authMethod, setAuthMethod] = useState<AuthMethod>();
    const [authUser, setAuthUser] = useState<AuthUser>();

    useEffect(() => {
        const storageMethod = localStorage.getItem('@Auth.method');
        console.log(storageMethod);
    }, []); 

    function setMethod(method: AuthMethod, user?: AuthUser) {
        localStorage.setItem('@Auth.method', method);
        setAuthMethod(method);
        setAuthUser(user);
        console.log('change method')
    }
    
    return (
        <AuthMethodContext.Provider
          value={{ method, setMethod }}
        >
            {
                <AuthProvider>
                    {children}
                </AuthProvider>
            }
            {
                /*
                authMethod === AuthMethod.AZURE ? (
                    <MsalProvider instance={msalInstance}>
                        <AuthAzureProvider>
                            {children}
                        </AuthAzureProvider>
                    </MsalProvider>
                ) : (
                    <AuthInternProvider authUser={authUser}>
                        {children}
                    </AuthInternProvider>
                )
                */
            }

        </AuthMethodContext.Provider>
    );
}
