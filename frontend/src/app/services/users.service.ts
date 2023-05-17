import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endpoint: string = 'https://backfichajes.joeltarzan.es';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.endpoint + '/users');
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(this.endpoint + '/users/' + id);
  }

  updateUser(id: string, user: {name?: string, lastname?: string, password?: string, email?: string, phone?: string, isAdmin?: boolean}): Observable<any> {
    return this.http.patch(this.endpoint + '/users/' + id, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(this.endpoint + '/users/' + id);
  }
}
