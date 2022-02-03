import { useAuth } from "../../hooks/useAuth";
import './styles.css';

export function Home(){
    const { signOut, getAuthMethodType, user } = useAuth();
    return (
        <main className="home-page">
            <h1>Home</h1>
            {
                !user ? <h1>...</h1> 
                : (
                    <div>
                        <p>
                            <span>E-mail: </span>
                            <strong>{user.email}</strong>
                        </p>
                        <p>
                            <span>Nome: </span>
                            <strong>{user.username}</strong>
                        </p>
                        <p>
                            <span>Autenticado com </span>
                            <strong>{getAuthMethodType()}</strong>
                        </p>
                    </div>
                )
            }
            <button onClick={() => signOut()}>Sair</button>
        </main>
    );
}

