
interface MsalConfig {
  auth: {
    clientId: string,
    redirectUri: string,
    authority: string,
  },
  cache: {
    cacheLocation: string,
    storeAuthStateInCookie: boolean,
  }
}

export const msalConfig = {
    auth: {
      clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
      redirectUri: import.meta.env.VITE_LOGIN_PAGE,
      authority: "https://login.microsoftonline.com/common",
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    },
} as MsalConfig;
  
export const loginRequest = {
  scopes: ['user.read'],
}

