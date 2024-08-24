import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { LoginData } from '../../login-data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  submitted = false;
  showSpinner = false;
  showMessage = false;

  registrationForm = new FormGroup({
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get fullname() {
    return this.registrationForm.get('fullname')!;
  }
  get email() {
    return this.registrationForm.get('email')!;
  }
  get password() {
    return this.registrationForm.get('password')!;
  }
  onSubmit(): void {
    this.submitted = false;
    if (this.registrationForm.invalid) return;
    console.log(JSON.stringify(this.registrationForm.value, null, 2));
  }
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.showSpinner = true;
    this.showMessage = false;
    this.submitted = true;
    if (this.registrationForm.invalid) return;
    console.log(JSON.stringify(this.registrationForm.value, null, 2));
    let email = this.registrationForm.value['email'];
    let password = this.registrationForm.value['password'];
    let data: LoginData = { email: email ?? '', password: password ?? '' };
    this.authService
      .SignUp(data.email, data.password)
      .subscribe((answer: any) => {
        console.log(answer);
        this.showSpinner = false;
        this.showMessage = true;
      });
  }
}
