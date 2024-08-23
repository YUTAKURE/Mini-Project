import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { LoginData } from '../../login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get email() {
    return this.loginForm.get('email')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }
  // get confirmPassword() { return this.registrationForm.get('confirmPassword')!; }

  onSubmit(): void {
    // this.submitted = false;
    if (this.loginForm.invalid) return;
    // console.log(JSON.stringify(this.loginForm.value, null, 2));
  }

  constructor(public authService: AuthService) {}
  ngOnInit(): void {}

  login() {
    // this.showSpinner = true;
    // this.showMessage = false;
    // this.submitted = true;

    if (this.loginForm.invalid) return;

    // console.log(JSON.stringify(this.loginForm.value, null, 2));
    let email = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];
    let data: LoginData = { email: email ?? '', password: password ?? '' };
    // // this.authService.SignUp(data.email, data.password);
    // this.authService.SignIn(data.email, data.password);
    // .subscribe(answer => {
    //     console.log(answer);
    //     this.showSpinner = false;
    //     this.showMessage = true;
    // });
  }
}
