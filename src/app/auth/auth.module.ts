// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RegisterComponent } from './register/register.component';
// import { LoginComponent } from './login/login.component';

// @NgModule({
//   declarations: [RegisterComponent, LoginComponent],
//   imports: [CommonModule,],
// })
// export class AuthModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  // AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent, // Auth module component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // MaterialModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase), // Auth module imports
    MaterialModule,
  ],
  exports: [LoginComponent, RegisterComponent],
  providers: [],
})
export class AuthModule {}
