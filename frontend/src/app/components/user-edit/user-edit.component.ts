import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Location } from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: any;
  form!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private location: Location,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.usersService.getUserById(id).subscribe(
      (user) => {
        this.user = user;
        this.initForm();
      }
    );
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.user.name),
      lastname: new FormControl(this.user.lastname),
      email: new FormControl(this.user.email, Validators.email),
      phone: new FormControl(this.user.phone),
      isAdmin: new FormControl(this.user.isAdmin)
    });
  }

  back() {
    this.location.back();
  }

  update() {
    const user = {
      name: this.form.get('name')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      phone: this.form.get('phone')?.value,
      isAdmin: this.form.get('isAdmin')?.value,
    }

    if (user.isAdmin == "true") {
      user.isAdmin = true;

    } else if (user.isAdmin == "false") {
      user.isAdmin = false;

    } else {
      user.isAdmin = this.user.isAdmin;

    }

    this.usersService.updateUser(this.user.id, user).subscribe(
      () => {
        this.snackBar.open('Usuario guardado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

  delete() {
    this.usersService.deleteUser(this.user.id).subscribe(
      () => {
        this.router.navigate(['/users']);
        this.snackBar.open('Usuario eliminado correctamente', 'Cerrar', {
          duration: 2000,
        });
      }
    );
  }

}
