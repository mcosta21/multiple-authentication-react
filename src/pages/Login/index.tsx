
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthUser } from "../../context/Auth/auth.model";
import { useAuth } from "../../hooks/useAuth";
import { useLoader } from "../../hooks/useLoader";
import './styles.css';


export function Login(){

    const [authUser, setAuthUser] = useState<AuthUser>({ email: 'a', password: 'a'});
    const { isAuthenticated, signIn } = useAuth();
    const navigate = useNavigate();
    const { setIsLoading } = useLoader();

    function handleSignInAzure() {
        signIn('AZURE');
    }

    function handleSignInIntern(){
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
        console.log(isAuthenticated)
        setIsLoading(false);
        if(isAuthenticated){
            navigate('/home');
        }
    }, [isAuthenticated])

    return (
        <main className="login-page">

            <section>
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

                <button className="btn-sign-intern" onClick={() => handleSignInIntern()}>Entrar</button>
            </section>

        </main>
    );
}