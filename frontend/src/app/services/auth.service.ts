import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  superAdminExists(): Observable<boolean> {
    return this.http.get<boolean>(this.endpoint + '/auth/superadminexists');
  }

  verifyPassword(user: any): Observable<any> {
    return this.http.post(this.endpoint + '/auth/verifypassword', user);
  }

  isUserLogged() {
    const userJsonString = localStorage.getItem('user');

    if (userJsonString !== null) {
      return true;

    } else {
      return false;
    }
  }

  register(user: {name: string, lastname: string, email: string, password: string}): Observable<any> {
    return this.http.post(this.endpoint + '/auth/register', user);
  }

  login(user: {email: string, password: string}): Observable<any> {
    return this.http.post(this.endpoint + '/auth/login', user);
  }

  logout() {
    localStorage.removeItem('user');
  }

}
