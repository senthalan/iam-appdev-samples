import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public oidcSecurityService: OidcSecurityService) { }

  userInfo: any = {};
  isUserAuthenticated: boolean = false;

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, idToken, accessToken }) => {
      console.log('app authenticated', isAuthenticated);
      console.log('app userData', userData);
      console.log('ID Token', idToken);
      console.log('Access Token', accessToken);
      this.isUserAuthenticated = isAuthenticated;
      this.userInfo = userData;
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }
}
