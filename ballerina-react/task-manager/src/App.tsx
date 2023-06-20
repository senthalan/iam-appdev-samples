import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./error-boundary";
import { HomePage, NotFoundPage } from "./pages";
import "./App.css";

const AppContent: FunctionComponent = (): ReactElement => {
    const { error } = useAuthContext();

    return (
        <ErrorBoundary error={error}>
            <Router>
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route element={ <NotFoundPage /> } />
            </Routes>
        </Router>
        </ErrorBoundary>
    )
};

const signInRedirectURL = process.env.REACT_APP_SIGN_IN_REDIRECT_URL as string;
const signOutRedirectURL = process.env.REACT_APP_SIGN_OUT_REDIRECT_URL as string;
const clientID = process.env.REACT_APP_CLIENT_ID as string;
const baseUrl = process.env.REACT_APP_IDP_BASE_URL as string;
const scopes = process.env.REACT_APP_SCOPES as string;

const scopesArray = scopes?.split(" ");

const authConfig = {
    signInRedirectURL: signInRedirectURL,
    signOutRedirectURL: signOutRedirectURL,
    clientID: clientID,
    baseUrl: baseUrl,
    scope: scopesArray
};

const App = () => (
    <AuthProvider config={authConfig}>
        <AppContent />
    </AuthProvider>
);

export default App;
