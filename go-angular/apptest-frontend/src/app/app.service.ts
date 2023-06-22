import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = import.meta.env['NG_APP_API_URL'];

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
