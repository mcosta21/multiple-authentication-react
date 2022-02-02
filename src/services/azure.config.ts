
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
      clientId: String(process.env.REACT_APP_AZURE_CLIENT_ID),
      redirectUri: String(process.env.REACT_APP_LOGIN_PAGE),
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