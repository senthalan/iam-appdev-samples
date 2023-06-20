declare global {
    interface Window {
        config: {
            clientID: string;
            scopes?: string[];
            baseUrl: string;
            signInRedirectURL: string;
            signOutRedirectURL: string;
            meServiceBaseUrl: string;
            manageServiceBaseUrl: string;
       };
    }
}

export {};