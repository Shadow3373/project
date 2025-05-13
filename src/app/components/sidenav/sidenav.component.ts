import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

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

/*  */

// import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';

// @Component({
//   /* selector: 'sidenav-autosize-example',
//   templateUrl: 'sidenav-autosize-example.html',
//   styleUrl: 'sidenav-autosize-example.css',
//   imports: [MatSidenavModule, MatButtonModule], */
//   selector: 'app-sidenav',
//   standalone: false,
//   templateUrl: './sidenav.component.html',
//   styleUrl: './sidenav.component.css',
// })
// export class SidenavComponent {
//   showFiller = false;
// }
