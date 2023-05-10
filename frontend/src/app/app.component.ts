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

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.userLogged();

    if (!this.authService.userLogged()) {
      this.router.navigate(['/login']);
    }
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

}
