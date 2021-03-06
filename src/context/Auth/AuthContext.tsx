import { createContext, useEffect, useState } from "react";
import { useLoader } from "../../hooks/useLoader";
import { AuthContextData, AuthMethod, AuthMethodKey, AuthProviderProps, AuthUser, User } from "./auth.model";
import { IAuth } from "./IAuth";

export const AuthContext = createContext<AuthContextData>(
    { } as AuthContextData,
);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authMethod, setAuthMethod] = useState<IAuth>();
    const { setIsLoading } = useLoader();

    useEffect(() => {
        createAuthMethodFromStorage();
    }, []);

    async function signIn(method: AuthMethodKey, authUser?: AuthUser) {
       localStorage.setItem('@Auth.method', method);
       const auth = AuthMethod[method];
       setAuthMethod(auth);
       setIsLoading(true);

       const user = await auth.signIn(authUser);

       if(user != undefined) {
            await setUserLogged(auth)
       }
    }

    function signOut() {
        if(authMethod) {
            setIsAuthenticated(false);
            setUser(undefined);
            authMethod?.signOut();
            localStorage.removeItem('@Auth.method');
            localStorage.removeItem('@Auth.user')
        }
        else {
            console.error('auth method undefined');
        }
    }

    useEffect(() => {
        if(authMethod) {
            setUserLogged(authMethod);
        }
    }, [authMethod])

    async function setUserLogged(authMethod: IAuth) {
       const isAuthenticated = await authMethod.isAuthenticated();
       setIsAuthenticated(isAuthenticated);
       const user = await authMethod.getUser();
       setUser(user);
    }

    async function createAuthMethodFromStorage(){
        const storageMethod = await localStorage.getItem('@Auth.method');
        if(storageMethod) {
            const method = storageMethod as AuthMethodKey;
            const auth = AuthMethod[method];
            setAuthMethod(auth);
        }
    }

    function getAuthMethodType(){
        return authMethod ? authMethod.type : 'undefined';
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, signIn, signOut, getAuthMethodType }}
        >
            {children}
        </AuthContext.Provider>
    );
}
