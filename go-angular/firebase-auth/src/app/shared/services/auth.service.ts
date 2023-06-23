import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User
} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserData: any;
  constructor(private auth: Auth, private router: Router, public ngZone: NgZone) {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  //get User
  getAuthFire() {
    return this.auth.currentUser;
  }

  //get authenticated user from Local Storage
  getAuthLocal() {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user;
  }

  //Check if User is logged in or not
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user')
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }


  //Register 
  Register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Login 
  Login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Logout
  Logout() {
    signOut(this.auth).then(() => this.router.navigate(['/sign-in']))
  }

}
