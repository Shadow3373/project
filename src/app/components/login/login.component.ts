import { Component, inject, OnInit } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formdata = { orgCode: '', loginId: '', keyword: '' };
  showPassword: boolean = false;
  uname: string = '';
  getToken: any = localStorage.getItem('token');

  ngOnInit():void {
    if (this.getToken) {
      this.router.navigate(['app']);
      console.log(this.getToken);
    }
  }

  private _snackBar = inject(MatSnackBar);

  constructor(private auth: AuthUserService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onsubmit(myForm: NgForm) {
    const data = {
      orgCode: this.formdata.orgCode,
      loginId: this.formdata.loginId,
      keyword: this.formdata.keyword,
    };

    this.auth.loginApi(data).subscribe({
      next: (res) => {
        let token = res.session.apiAccessSessionToken.split(' ')[1];
        localStorage.setItem('token', token || '');
        this.auth.OAuthUser(token);
        this.router.navigate(['app/dashboard']);
        this._snackBar.open(res.status, 'close', { duration: 2000 });
        console.log(res);
      },
      error: (err) => {
        this._snackBar.open(err.error[0].errors[0].message, 'close', {
          duration: 2000,
        });
      },
    });
  }
}
