import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticationChanged: any;
  constructor(private afAuth: AngularFireAuth) {}

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

  signUp(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Sign up successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        // Login successful
      })
      .catch((error) => {
        console.log(error);
        // An error occurred
      });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }
}
