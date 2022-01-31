import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/azure.config";

export function ButtonSignIn(){
    const { instance } = useMsal();

    return (
        <button onClick={() => handleLogin(instance)}>Sign in using redirect</button>
    );
}

function handleLogin(instance: IPublicClientApplication) {
    instance.loginRedirect(loginRequest).catch(e => {
        console.error(e);
    });
}