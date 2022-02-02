import { IAuth } from './IAuth';

export class AuthIntern implements IAuth {

    public type = 'INTERN';

    constructor(){
        console.log('starting auth intern');
    }

    public signIn = () => {
        //setTimeout(() => {
            const userStorage = sessionStorage.getItem('@Auth.email');
            console.log('sign intern', userStorage)
            if(userStorage === null)
                sessionStorage.setItem('@Auth.email', 'marcioc424@gmail.com');
            return { email: 'marcioc424@gmail.com', username: 'User interno'}
        //}, 1000);
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