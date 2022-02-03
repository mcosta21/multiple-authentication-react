import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { loginRequest, msalConfig } from '../../services/azure.config';
import { IAuth } from './IAuth';

function handleLogin(instance: IPublicClientApplication) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}

function handleLogout(instance: IPublicClientApplication) {
    instance.logout().catch(e => {
        console.error(e);
    });
}

export class AuthAzure implements IAuth {

    public type = 'AZURE';
    private instance: PublicClientApplication;
    
    constructor(){
        this.instance = new PublicClientApplication(msalConfig);
        console.log('starting auth azure');
    }

    public signIn = async () => {
        console.log('sign azure');
        await this.instance.handleRedirectPromise().then(() => {
            handleLogin(this.instance);
        });
    };

    public signOut = () => {
        console.log('signOut azure');
        this.instance.handleRedirectPromise().then(() => {
            handleLogout(this.instance);
        });
    };

    public isAuthenticated = async () => {
        return await this.instance.handleRedirectPromise().then(x => {
            const accounts = this.instance.getAllAccounts();
            return accounts.length > 0;
        });
    };

    public getUser = () => {
        const accounts = this.instance.getAllAccounts();
        if(accounts.length > 0) {
            return {
                email: accounts[0].username,
                username: accounts[0].name || accounts[0].username,
            };
        }
        return undefined;
    }

    
}