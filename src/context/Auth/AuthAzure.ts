import { AuthenticationResult, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';

import { loginRequest, msalConfig } from '../../services/azure.config';
import { User, AuthMethodKey } from './auth.model';
import { IAuth } from './IAuth';

export class AuthAzure implements IAuth {

    public type: AuthMethodKey = 'AZURE';
    private instance: PublicClientApplication;
    
    constructor(){
        this.instance = new PublicClientApplication(msalConfig);
        console.log('starting auth azure');
    }

    public signIn = async () => {
        console.log('signIn azure');
        await this.instance.handleRedirectPromise().then(() => {
            this.handleLogin(this.instance);
        });
    };

    public signOut = async () => {
        console.log('signOut azure');
        await this.instance.handleRedirectPromise().then(() => {
            this.handleLogout(this.instance);
        });
    };

    public isAuthenticated = async () => {
        return await this.instance.handleRedirectPromise().then(x => {
            const accounts = this.instance.getAllAccounts();
            return accounts.length > 0;
        });
    };

    public getUser = async () => {

        const userStorage = localStorage.getItem('@Auth.user');
        if(userStorage !== null) {
            return JSON.parse(userStorage) as User;
        }

        const accounts = this.instance.getAllAccounts();
        if(accounts.length === 0) {
             return undefined;
        }

        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        // Silently acquires an access token which is then attached to a request for Microsoft Graph data
        const userAzure = await this.instance.acquireTokenSilent(request).then((response: AuthenticationResult) => {
            return this.getUserDetails(response.accessToken);
        });

        if(userAzure) {
            const user = {
                email: userAzure.userPrincipalName,
                username: userAzure.displayName
            } as User;
            localStorage.setItem('@Auth.user', JSON.stringify(user));
            return user;
        }

        return undefined;
    }

    private getAuthenticatedClient = (accessToken: string) => {
        const client = Client.init({
          authProvider: (done) => {
            done(null, accessToken);
          }
        });
      
        return client;
      }

    private getUserDetails = async (accessToken: string) => {
        const client = this.getAuthenticatedClient(accessToken);
      
        const user = await client
          .api('/me')
          .select('displayName,mail,userPrincipalName')
          .get();

        return user;
    }
        
    private handleLogin = (instance: IPublicClientApplication) => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.error(e);
        });
    }

    private handleLogout = (instance: IPublicClientApplication) => {
        instance.logout().catch(e => {
            console.error(e);
        });
    }
}