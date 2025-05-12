import { Component, Injectable } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  formdata = { orgCode: '', loginId: '', keyword: '' };
  errorMsg = '';
  showPassword: boolean = false;
  uname: string = '';

  constructor(private auth: AuthUserService, private router: Router) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  onsubmit(myForm: NgForm) {
    // this.uname = this.formdata.loginId;
    // console.log(this.formdata.loginId, 'test');

    const data = {
      orgCode: this.formdata.orgCode,
      loginId: this.formdata.loginId,
      keyword: this.formdata.keyword,
    };

    // if (
    //   this.formdata.orgCode === 'BSIT' &&
    //   this.formdata.loginId === 'Mani' &&
    //   this.formdata.keyword === 'password@123'
    // ) {
    //   // this.router.navigate(['/dashboard'], { this.un });
    //   this.router.navigate(['/dashboard', { name: this.uname }]);
    //   console.log(this.uname, 'test');
    // } else {
    //   this.router.navigate(['/login']);
    // }

    this.auth.loginApi(data).subscribe({
      next: (res) => {
        alert('Login Successfully');
        let token = res.session.apiAccessSessionToken.split(' ')[1];
        localStorage.setItem('token', token || '');
        this.auth.OAuthUser(token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = 'Invalid Credentials';
        console.log(this.errorMsg);
      },
    });
    console.log(myForm);
  }
}
