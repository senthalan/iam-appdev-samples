import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { NG_APP_CLIENT_ID } from './app-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(public oidcSecurityService: OidcSecurityService) { }

  userInfo: any = {};
  isUserAuthenticated: boolean = false;
  parsedUserData: string = '';

  authOptions: Object = {};

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, idToken, accessToken }) => {
      this.isUserAuthenticated = isAuthenticated;
      this.userInfo = userData;
      this.parsedUserData = JSON.stringify(userData);
      console.log("accesstoken", accessToken)
      console.log("idtoken", idToken)
      localStorage.setItem('access_token', accessToken)
    });

  }

  login(acr?: string) {
    if (acr) {
      this.authOptions = {
        customParams: {
          acr: acr,
        },
      };
      if (acr === "acr2") {
        this.oidcSecurityService.logoff().subscribe(() => {
          this.oidcSecurityService.authorize("", this.authOptions);
        });
      } else {
        this.oidcSecurityService.authorize("", this.authOptions);
      }
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

}
