
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { AuthMethod } from "../../context/auth.model";
import { useAuth, useAuthMethod } from "../../hooks/useAuth";
import { ButtonSignIn } from './ButtonSignIn';
import { ButtonSignOut } from "./ButtonSignOut";

import './styles.css';

export function Login(){
    const { setMethod } = useAuthMethod();

    function handleSignInAzure() {
        setMethod(AuthMethod.AZURE);
    }

    function handleSignInIntern(){
        const user = {
            email: 'marcioc424@gmail.com',
            password: '123456'
        }
        setMethod(AuthMethod.INTERN, user);
    }

    return (
        <main>
            <button onClick={() => handleSignInAzure()}>SignIn with Azure</button>
            <button onClick={() => handleSignInIntern()}>SignIn with Intern</button>
            <div/>
        </main>
    );
}