
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