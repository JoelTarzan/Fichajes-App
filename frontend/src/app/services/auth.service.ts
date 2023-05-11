import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:3000';
  user = false;

  constructor(private http: HttpClient) { }

  //TODO Metodos que hagan el login y el register, uno que compruebe si esta logueado
  async superAdminExists() {
    return await this.http.get<boolean>(this.endpoint + '/auth/superadminexists').toPromise();
  }

  userLogged() {
    return this.user;
  }


}
