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

const signInRedirectURL = window.config.signInRedirectURL;
const signOutRedirectURL = window.config.signOutRedirectURL;
const clientID = window.config.clientID;
const baseUrl = window.config.baseUrl;
const scopes = window.config.scopes;

const authConfig = {
    signInRedirectURL: signInRedirectURL,
    signOutRedirectURL: signOutRedirectURL,
    clientID: clientID,
    baseUrl: baseUrl,
    scope: scopes
};

const App = () => (
    <AuthProvider config={authConfig}>
        <AppContent />
    </AuthProvider>
);

export default App;
