import * as msal from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: "5daa006a-c35a-40d4-935b-81e49cbc1f2e",
        authority: "https://login.microsoftonline.com/0ae51e19-07c8-4e4b-bb6d-648ee58410f4",
        redirectUri: "http://localhost:3000/bosch"
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level: any, message: any, containsPii: any) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }
            }
        }
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
    scopes: ["User.Read", "profile", "openid", "email",]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me" //e.g. https://graph.microsoft.com/v1.0/me
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance, loginRequest, graphConfig, msalConfig };