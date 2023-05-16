import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  form!: FormGroup;
  userData: any;
  errorMessage: string | undefined;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private location: Location,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user')!);

    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      password: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required)
    });
  }

  update() {

    const userToLogin = {
      email: this.userData.email,
      password: this.form.get('oldPassword')?.value
    }

    this.authService.verifyPassword(userToLogin).subscribe(
      (result) => {

        if (result == true) {
          const user = {
            password: this.form.get('password')?.value
          }

          this.usersService.updateUser(this.userData.id, user).subscribe(
            () => {
              this.snackBar.open('Contraseña cambiada correctamente', 'Cerrar', {
                duration: 2000,
              });
            }
          );

        } else {
          this.errorMessage = 'Contraseña incorrecta';
        }
      }
    );

  }
}
