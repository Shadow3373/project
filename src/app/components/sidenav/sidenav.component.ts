import { Component, inject } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  private _snackBar = inject(MatSnackBar);

  token = localStorage.getItem('token');
  // cookies = this.cookies
  getToken = {
    apiAccessSessionToken: `Bearer ${this.token}`,
  };

  constructor(
    private auth: AuthUserService,
    private router: Router,
  ) {}

  onLogout() {
    this.auth.logoutApi(this.getToken).subscribe({
      next: (res) => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
        this._snackBar.open(res.message, 'close', { duration: 2000 });
      },
      error: (err) => {
        if (
          err.error[0].errors[0].message === 'Session token already inActive'
        ) {
          localStorage.removeItem('token');
          this.router.navigate(['login']);
          this._snackBar.open('Logged Out Successfully', 'Close', {
            duration: 2000,
          });
        }
      },
    });
  }
}
