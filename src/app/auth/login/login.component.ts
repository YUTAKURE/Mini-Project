import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { LoginData } from '../../login-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  showSpinner = false;
  showMessage = false;
  errorMessage = '';

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

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.submitted = true;
    this.showSpinner = true;
    this.showMessage = false;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.showSpinner = false;
      return;
    }

    this.login(); // フォーム送信時にログイン処理を呼び出す
  }

  login() {
    const email = this.loginForm.value['email'];
    const password = this.loginForm.value['password'];
    const data: LoginData = { email: email ?? '', password: password ?? '' };

    this.authService.SignIn(data.email, data.password).subscribe({
      next: (answer) => {
        console.log(answer);
        this.showSpinner = false;
        this.showMessage = true;
      },
      error: (error) => {
        console.error('Login failed', error);
        this.showSpinner = false;
        this.errorMessage =
          'Login failed. Please check your email address and password.';
      },
    });
  }
}
