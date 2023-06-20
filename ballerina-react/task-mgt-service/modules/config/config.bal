import ballerina/os;

public configurable string TOKEN_ISSUER = getFromEnvVariable("TOKEN_ISSUER", "api.asgardeo.io");
public configurable string JWKS_ENDPOINT = getFromEnvVariable("JWKS_ENDPOINT", "https://api.asgardeo.io/oauth/jwks");

function getFromEnvVariable(string envVaribale, string defaultValue) returns string {
    string envVariableVal = os:getEnv(envVaribale);
    string valueToSet = envVariableVal != "" ? envVariableVal : defaultValue;
    return valueToSet;
}
