import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://api.asgardeo.io/t/',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: environment.clientId,
            scope: "openid profile groups, app_roles email",
            responseType: 'code',
            silentRenew: false,
            useRefreshToken: true,
            renewTimeBeforeTokenExpiresInSeconds: 30,
            authWellknownEndpointUrl: 'https://api.asgardeo.io/t/iamapptesting/oauth2/token/.well-known/openid-configuration',
            logLevel: LogLevel.Debug,
        }
    })],
    exports: [AuthModule],
})
export class AuthConfigModule { }

