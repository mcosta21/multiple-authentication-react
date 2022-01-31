import { useIsAuthenticated } from "@azure/msal-react";
import { useAuth } from "../../hooks/useAuth";
import { ButtonSignOut } from "../Login/ButtonSignOut";

export function Home(){
    const { signOut, isAuthenticated } = useAuth();
    return (
        <main>
            <h1>Home</h1>
            {
                isAuthenticated && 'Logado'
            }
            <button onClick={() => signOut()}>Sair</button>
        </main>
    );
}

