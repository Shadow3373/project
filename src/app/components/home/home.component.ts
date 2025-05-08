import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  token = localStorage.getItem('token');

  getToken = {
    apiAccessSessionToken: `Bearer ${this.token}`,
  };
  test: any;
  page: any;

  constructor(
    private auth: AuthUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.page = params;
      console.log(this.page, 'this.page');
    });
  }

  onClick() {
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

  OAuthuser() {
    this.auth.OAuthUser(this.getToken).subscribe({
      next: (res) => {
        console.log(res);
        this.test = res.username;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
