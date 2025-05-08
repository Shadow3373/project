import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(private http: HttpClient, private router: Router) {}

  private Url = 'http://172.16.16.49:7055/v1/trade';

  onsubmit(orgCode: String, loginId: String, keyword: String) {
    if (orgCode === 'BSIT' && loginId === 'MAKER' && keyword === 'Test@123') {
      return 200;
    } else {
      return 403;
    }
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.Url}/register`, data);
  }

  loginApi(myFrom: any): Observable<any> {
    return this.http.post(`${this.Url}/signIn`, myFrom);
  }

  logoutApi(token: any): Observable<any> {
    return this.http.post(`${this.Url}/signOut`, token);
  }

  OAuthUser(token: any): Observable<any> {
    return this.http.post(`${this.Url}/authenticate/token`, token);
  }

  userCreate(rData: any): Observable<any> {
    return this.http.post(`${this.Url}/onboarding/submit`, rData);
  }
}
