
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthUser } from "../../context/Auth/auth.model";
import { useAuth } from "../../hooks/useAuth";
import './styles.css';


export function Login(){

    const [authUser, setAuthUser] = useState<AuthUser>({ email: 'a', password: 'a'});
    const { isAuthenticated, signIn } = useAuth();
    const navigate = useNavigate();

    function handleSignInAzure() {
        signIn('AZURE');
    }

    function handleSignInIntern(event: React.FormEvent){
        event.preventDefault();
        
        if(!authUser.email) {
            alert('E-mail não informado')
            return;
        };

        if(!authUser.password) {
            alert('Senha não informada');
            return;
        }

        signIn('INTERN', authUser);
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate('/home');
        }
    }, [isAuthenticated])

    return (
        <main className="login-page">

            <form onSubmit={handleSignInIntern}>
                <aside className="sign-buttons">
                    <button className="btn-sign-azure" onClick={() => handleSignInAzure()}>
                        <img src="src/assets/microsoft_logo.png"/>
                    </button>
                </aside>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" name="email" onChange={(e) => setAuthUser({...authUser, email: e.target.value })}/>
                </div>

                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" onChange={(e) => setAuthUser({...authUser, password: e.target.value })} />
                </div>

                <button type="submit" className="btn-sign-intern">Entrar</button>
            </form>

        </main>
    );
}