import { AuthUser } from './auth.model';
import { IAuth } from './IAuth';

export class AuthIntern implements IAuth {

    public type = 'INTERN';

    constructor(){
        console.log('starting auth intern');
    }

    public signIn = async (authUser?: AuthUser) => {
        setTimeout(() => {

            if(authUser) {
                sessionStorage.setItem('@Auth.email', authUser.email);
                return { email: authUser.email, username: 'User interno'}
            }

            const userStorage = sessionStorage.getItem('@Auth.email');
            if(userStorage !== null) {
                return { email: userStorage, username: 'User interno'}
            }

            return undefined;
        }, 200000);
    };

    public signOut = () => {
        sessionStorage.removeItem('@Auth.email')
    };

    public isAuthenticated = () => {
        const userStorage = sessionStorage.getItem('@Auth.email');
        return Promise.resolve(!!userStorage);
    };
    
    public getUser = () => {
        const userStorage = sessionStorage.getItem('@Auth.email');
        if(userStorage !== null) {
            return { email: userStorage, username: 'User interno'};
        }
        return undefined;
    }    
}