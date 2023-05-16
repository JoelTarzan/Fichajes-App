import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  user = false;
  userData: any;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.isUserLogged();

    if (this.user) {
      this.userData = JSON.parse(localStorage.getItem('user')!);
    }

    if (!this.authService.isUserLogged()) {
      this.router.navigate(['/login']);
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

}
