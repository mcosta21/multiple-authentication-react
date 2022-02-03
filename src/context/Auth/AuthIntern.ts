import { AuthUser } from './auth.model';
import { IAuth } from './IAuth';

export class AuthIntern implements IAuth {

    public type = 'INTERN';

    constructor(){
        console.log('starting auth intern');
    }

    public signIn = async (authUser?: AuthUser) => {
        await this.timeout(3000);
        if(authUser) {
            sessionStorage.setItem('@Auth.email', authUser.email);
            return { email: authUser.email, username: authUser.email }
        }

        const userStorage = sessionStorage.getItem('@Auth.email');
        if(userStorage !== null) {
            return { email: userStorage, username: userStorage }
        }

        return undefined;
    };

    public signOut = () => {
        sessionStorage.removeItem('@Auth.email')
    };

    public isAuthenticated = () => {
        const userStorage = sessionStorage.getItem('@Auth.email');
        return Promise.resolve(!!userStorage);
    };
    
    public getUser = async () => {
        const userStorage = await sessionStorage.getItem('@Auth.email');
        if(userStorage !== null) {
            return { email: userStorage, username: 'User interno'};
        }
        return undefined;
    }    

    private timeout = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}