import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  errorMessage: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  ngOnInit() {

    this.authService.superAdminExists().subscribe(
      (result) => {
        if (!result) {
          this.router.navigate(['/register']);
        }
      }
    );

    if (this.authService.isUserLogged()) {
      this.router.navigate(['']);
    }

    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const user = {
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this.authService.login(user).subscribe(
      (result) => {

        const decodedToken = jwt_decode(result.token);
        const userJsonString = JSON.stringify(decodedToken);

        localStorage.setItem('user', userJsonString);

        window.location.reload();
      },
      (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Usuario no encontrado';

        } else if (error.status === 400) {
          this.errorMessage = 'Contraseña incorrecta';

        } else {
          this.errorMessage = 'Ha ocurrido algún error';
        }
      }
    );
  }

}
