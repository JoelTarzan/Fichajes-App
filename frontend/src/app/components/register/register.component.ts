import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  async ngOnInit() {

    const superAdminExists = await this.authService.superAdminExists();

    if (superAdminExists) {
      this.router.navigate(['/login']);
    }

    this.initForm();
  }

  initForm(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  register() {
    const user = {
      name: this.form.get('name')?.value,
      lastname: this.form.get('lastname')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    }

    this.authService.register(user).subscribe(
     () => {this.router.navigate(['']);
     }
   );
  }
}
