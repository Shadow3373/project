import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  token = localStorage.getItem('token');

  getToken = {
    apiAccessSessionToken: `Bearer ${this.token}`,
  };

  constructor(
    private auth: AuthUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onLogout() {
    this.auth.logoutApi(this.getToken).subscribe({
      next: (res) => {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
