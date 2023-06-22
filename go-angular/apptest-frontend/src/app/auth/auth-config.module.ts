import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: import.meta.env['NG_APP_AUTHORITY_URL'],
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: import.meta.env['NG_APP_CLIENT_ID'],
            scope: "openid profile groups, app_roles email",
            responseType: 'code',
            silentRenew: false,
            useRefreshToken: true,
            renewTimeBeforeTokenExpiresInSeconds: 30,
            authWellknownEndpointUrl: import.meta.env['NG_APP_WELLKNOWN_URL'],
            logLevel: LogLevel.Debug,
        }
    })],
    exports: [AuthModule],
})
export class AuthConfigModule { }

