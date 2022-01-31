import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../services/azure.config";

export function ButtonSignOut(){
    const { instance } = useMsal();

    return (
        <button onClick={() => handleLogout(instance)}>Sign out</button>
    );
}

function handleLogout(instance: IPublicClientApplication) {
    instance.logout().catch(e => {
        console.error(e);
    });
}