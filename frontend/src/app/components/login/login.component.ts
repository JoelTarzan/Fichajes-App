import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  async ngOnInit() {

    const superAdminExists = await this.authService.superAdminExists();

    if (await !superAdminExists) {
      this.router.navigate(['/register']);
    }

    if (this.authService.userLogged()) {
      this.router.navigate(['']);
    }
  }

}
