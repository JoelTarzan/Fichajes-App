import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private location: Location,) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      isAdmin: new FormControl(false)
    });
  }

  back() {
    this.location.back();
  }

  createUser() {
    const user = {
      name: this.form.get('name')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      isAdmin: this.form.get('isAdmin')?.value,
    }

    if (user.isAdmin == "true") {
      user.isAdmin = true;

    } else {
      user.isAdmin = false;
    }

    this.authService.register(user).subscribe(
      () => {
        this.router.navigate(['/users']);
      }
    );
  }

}
