import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;
  constructor(private afAuth: AngularFireAuth) {}
  login() {
    const provider = new GoogleAuthProvider();
    this.afAuth.signInWithPopup(provider).then((result) => {
      console.log(result);
    });
  }
  logout() {
    this.afAuth.signOut();
  }
}
