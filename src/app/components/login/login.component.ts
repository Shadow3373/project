import { Component, inject, Injectable } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

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
    const data = {
      orgCode: this.formdata.orgCode,
      loginId: this.formdata.loginId,
      keyword: this.formdata.keyword,
    };

    this.auth.loginApi(data).subscribe({
      next: (res) => {
        alert('Loggedin Successfully');
        let token = res.session.apiAccessSessionToken.split(' ')[1];
        localStorage.setItem('token', token || '');
        this.auth.OAuthUser(token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMsg = 'Invalid Credentials';
      },
    });
    console.log(myForm);
  }
}
