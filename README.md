# Multiple Auth React

This project provides a multiple authentication process using React. 
So, you can use multiple methods to user autheticate inside your application, 
besides, the structure makes easy the development of others methods likes GitHub and 
Facebook.

Using it, you'll find these providers:

1. INTERN - Using your own authentication api;
2. AZURE - Using Microsoft authentication;
3. GOOGLE - Using Google authentication;

### Environment variables

Normally, the external authetications likes Microsoft and Google, it needs a key called clientId, because of that, you'll need to set your own key on .env file.

~~~json
// .env.example
VITE_AZURE_CLIENT_ID=
VITE_GOOGLE_CLIENT_ID=
VITE_LOGIN_PAGE=http://localhost:3000
~~~

> Follow these tutorials to get the clientId keys:

- [Microsoft](https://docs.microsoft.com/pt-br/azure/databricks/dev-tools/api/latest/aad/app-aad-token)
- [Google](https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid)
	

# Auth Services

All services implements the IAuth interface, so you can use these methods:
~~~javascript
export interface IAuth {
    type: AuthMethodKey;
    signIn: (authUser?: AuthUser) => Promise<User | void>;
    signOut: () => Promise<void>;
    isAuthenticated: () => Promise<boolean>;
    getUser: () => Promise<User | undefined>;
}
~~~


<details>  
<summary><h3>Azure<h3></summary>  

~~~javascript
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
~~~

</details>

<details>  
<summary><h3>GOOGLE<h3></summary>  

~~~javascript
import { AuthMethodKey } from './auth.model';
import { IAuth } from './IAuth';
import { googleConfig } from '../../services/google.config';
import { loadGapiInsideDOM, loadAuth2WithProps } from 'gapi-script';

export class AuthGoogle implements IAuth {

    public type: AuthMethodKey = 'GOOGLE';
    private instance: gapi.auth2.GoogleAuthBase | undefined;

    constructor(){
        console.log('starting auth google');
        this.initialize()
    }

    public signIn = async () => {
        console.log('signIn google');
        if(!this.instance) await this.initialize();
        await this.instance?.attachClickHandler(document.body, {}, this.onSuccess, this.onFailure);
    };

    public signOut = async () => {
        console.log('signOut google');
        if(!this.instance) await this.initialize();
        this.instance?.signOut();
    };

    public isAuthenticated = async () => {
        if(!this.instance) await this.initialize();
        return await (!!this.instance && this.instance.isSignedIn.get());
    };

    public getUser = async () => {
        if(!this.instance) await this.initialize();

        if(this.instance?.isSignedIn.get()) {
            const googleUser = this.instance?.currentUser.get();
            return {
                username: googleUser.getBasicProfile().getName(),
                email: googleUser.getBasicProfile().getEmail(),
                photo: googleUser.getBasicProfile().getImageUrl(),
            }
        }
        return undefined;
    }

    private initialize = async () => {
        await loadGapiInsideDOM(); 
        this.instance = await loadAuth2WithProps(gapi, googleConfig);
    }

    private onSuccess = (googleUser: gapi.auth2.GoogleUser) => {
        // Do something on success authentication
    }

    private onFailure = (error: string) => {
        // Do something on failure authentication
        alert(JSON.stringify(error));
    }
}
~~~

</details>  

<details>  
<summary><h3>INTERN<h3></summary>  

> This authentication uses the SessionStorage to save the user, and simulate a process api.

~~~javascript
import { AuthUser, AuthMethodKey } from './auth.model';
import { IAuth } from './IAuth';

export class AuthIntern implements IAuth {

    public type: AuthMethodKey = 'INTERN';

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

    public signOut = async () => {
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
~~~
