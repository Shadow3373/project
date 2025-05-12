import { Component, OnInit } from '@angular/core';
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

  constructor(
    private auth: AuthUserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {}
  OAuthuser() {
    this.auth.OAuthUser(this.getToken).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
