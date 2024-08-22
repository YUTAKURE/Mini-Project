export interface User {
  uid: string; // User id on firebase
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}
