import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NG_APP_API_URL } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = NG_APP_API_URL;

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);

  getPeople() {
    return this.http.get(this.rootURL + '/people', { 'headers': this.headers });
  }

  getCustomer() {
    return this.http.get(this.rootURL + '/customers', { 'headers': this.headers });
  }

}
