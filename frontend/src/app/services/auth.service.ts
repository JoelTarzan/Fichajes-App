import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  superAdmin = false;
  user = true;

  constructor() { }

  //TODO Metodos que hagan el login y el register, uno que compruebe si existe un super usuario, uno que compruebe si esta logueado
  superAdminExists() {
    return this.superAdmin;
  }

  userLogged() {
    return this.user;
  }


}
