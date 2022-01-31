
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
      clientId: '938e4139-c212-4110-ac34-df6a9f0d2faa',
      redirectUri: 'http://localhost:3000',
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