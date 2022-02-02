import { createContext, useEffect, useState } from "react";
import { AuthContextData, AuthMethod, AuthMethodKey, AuthProviderProps, AuthUser, User } from "./auth.model";
import { IAuth } from "./IAuth";

export const AuthContext = createContext<AuthContextData>(
    { } as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthProgress, setIsAuthProgress] = useState(false);
    const [authMethod, setAuthMethod] = useState<IAuth>();

    useEffect(() => {
        createAuthMethodFromStorage();
    }, []);

    async function signIn(method: AuthMethodKey, authUser?: AuthUser) {
       setIsAuthProgress(true);
       localStorage.setItem('@Auth.method', method);
       const auth = AuthMethod[method];
       setAuthMethod(auth);

       const user = await auth.signIn();

       if(user) {
            setUserLogged(auth)
       }
       setIsAuthProgress(false);
    }

    function signOut() {
        setIsAuthProgress(true);
        if(authMethod) {
            setIsAuthenticated(false);
            setUser(undefined);
            authMethod?.signOut();
            setIsAuthProgress(false);
            localStorage.removeItem('@Auth.method');
        }
        else {
            setIsAuthProgress(false);
            console.error('auth method undefined');
        }
    }

    useEffect(() => {
        if(authMethod) {
            setUserLogged(authMethod);
        }
        setIsAuthProgress(false);
    }, [authMethod])

    async function setUserLogged(authMethod: IAuth) {
       const isAuthenticated = await authMethod.isAuthenticated();
       setIsAuthenticated(isAuthenticated);
       setUser(authMethod.getUser());
    }

    function createAuthMethodFromStorage(){
        setIsAuthProgress(true);
        const storageMethod = localStorage.getItem('@Auth.method');
        if(storageMethod) {
            const method = storageMethod as AuthMethodKey;
            const auth = AuthMethod[method];
            setAuthMethod(auth);
        }
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut, isAuthProgress }}
        >
            {children}
        </AuthContext.Provider>
    );
}
