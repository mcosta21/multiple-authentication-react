
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthUser } from "../../context/Auth/auth.model";
import { useAuth } from "../../hooks/useAuth";
import { useLoader } from "../../hooks/useLoader";
import './styles.css';


export function Login(){

    const [authUser, setAuthUser] = useState<AuthUser>({ email: 'marcioc424@gmail.com', password: '123456'});
    const { isAuthenticated, signIn } = useAuth();
    const navigate = useNavigate();
    const { setIsLoading } = useLoader();

    const [isAzureEnabled, setIsAzureEnabled] = useState(false);
    const [isGoogleEnabled, setIsGoogleEnabled] = useState(false);

    useEffect(() => {

        if(import.meta.env.VITE_AZURE_CLIENT_ID) {
            setIsAzureEnabled(true);
        }

        if(import.meta.env.VITE_GOOGLE_CLIENT_ID) {
            setIsGoogleEnabled(true);
        }

    }, []);

    useEffect(() => {
        setIsLoading(false);
        if(isAuthenticated){
            navigate('/home');
        }
    }, [isAuthenticated])
    
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

    function handleSignInGoogle(){
        signIn('GOOGLE');
    }

    return (
        <main className="login-page">

            <section>
                <aside className="sign-buttons">
                    <button 
                        className="btn-sign-azure" 
                        disabled={!isAzureEnabled}
                        onClick={() => handleSignInAzure()}
                    >
                        <img src="src/assets/microsoft_logo.png"/>
                    </button>
                    <button 
                        className="btn-sign-google"
                        disabled={!isGoogleEnabled} 
                        onClick={() => handleSignInGoogle()}
                    >
                        <img src="src/assets/google_logo.png"/>
                    </button>
                </aside>

                <div>
                    <label htmlFor="email">E-mail:</label>
                    <input 
                        type="email" 
                        name="email" 
                        defaultValue={authUser.email}
                        onChange={(e) => setAuthUser({...authUser, email: e.target.value })}
                    />
                </div>

                <div>
                    <label htmlFor="password">Senha:</label>
                    <input 
                        type="password" 
                        name="password" 
                        defaultValue={authUser.password}
                        onChange={(e) => setAuthUser({...authUser, password: e.target.value })} />
                </div>

                <button className="btn-sign-intern" onClick={() => handleSignInIntern()}>Entrar</button>

                <footer>
                    {
                        !isAzureEnabled && <span>Azure clientId not informed on .env file</span>
                    }
                    {
                        !isGoogleEnabled && <span>Google clientId not informed on .env file</span>
                    }
                </footer>
            </section>

            

        </main>
    );
}