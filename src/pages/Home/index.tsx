import { useAuth } from "../../hooks/useAuth";

export function Home(){
    const { signOut, isAuthenticated, user } = useAuth();
    return (
        <main>
            <h1>Home</h1>
            {
                isAuthenticated ? 'Logado' : 'Deslogado'
            }

            { user && <h1>{user.username}</h1>}
            <button onClick={() => signOut()}>Sair</button>
        </main>
    );
}

