
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/Loading";
import { useAuth } from "../../hooks/useAuth";
import './styles.css';


export function Login(){
    const { isAuthenticated, isAuthProgress,  signIn } = useAuth();
    const navigate = useNavigate();

    function handleSignInAzure() {
        signIn('AZURE');
    }

    function handleSignInIntern(){
        const user = {
            email: 'marcioc424@gmail.com',
            password: '123456'
        }
        signIn('INTERN', user);
    }

    useEffect(() => {
        if(isAuthenticated){
            navigate('/home');
        }
    }, [isAuthenticated])

    if(isAuthProgress) {
        return <Loading />
    }

    return (
        <main className="login-page">

            <form>
                <aside className="sign-buttons">
                    <button className="btn-sign-azure" onClick={() => handleSignInAzure()}>
                        <img src="src/assets/microsoft_logo.png"/>
                    </button>
                </aside>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input type="email" name="email" />
                </div>

                <div>
                    <label htmlFor="password">Senha:</label>
                    <input type="password" name="password" />
                </div>

                <button className="btn-sign-intern" onClick={() => handleSignInIntern()}>Entrar</button>
            </form>

        </main>
    );
}