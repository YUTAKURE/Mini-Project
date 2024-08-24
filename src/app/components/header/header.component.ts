import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Output() public sideNavToggle = new EventEmitter();

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onToggleSidenav() {
    // Open and close side nav bar
    this.sideNavToggle.emit();
  }

  logout() {
    this.authService
      .signOut()
      .then(() => {
        // サインアウト後の処理（例：リダイレクトやメッセージの表示など）
        console.log('Successfully signed out');
      })
      .catch((error) => {
        // エラーハンドリング
        console.error('Error during sign out:', error);
      });
  }
}
