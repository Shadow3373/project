import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(private http: HttpClient, private router: Router) {}

  private Url = 'http://172.16.16.49:7055/v1/trade';

  private token = localStorage.getItem('token');

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.Url}/register`, data);
  }

  loginApi(myFrom: any): Observable<any> {
    return this.http.post(`${this.Url}/signIn`, myFrom);
  }

  logoutApi(token: any): Observable<any> {
    const headers = new HttpHeaders({
      client_id: 'xzXNJFzxNtMvyLIFXCUL1005',
      Authorization: `${this.token}`,
    });

    return this.http.post(`${this.Url}/signOut`, token);
  }

  OAuthUser(token: any): Observable<any> {
    return this.http.post(`${this.Url}/authenticate/token`, token);
  }

  userCreate(rData: any, header: any): Observable<any> {
    const headers = new HttpHeaders({
      client_id: header,
      Authorization: `${this.token}`,
    });
    return this.http.post(`${this.Url}/onboarding/submit`, rData, { headers });
  }

  getCustomer(
    pageIndex: number,
    pageSize: number
  ): Observable<{ data: any[]; totalCount: number }> {
    const payload = {
      entityTypeCode: 'API_GW_PARTY',
      filters: [{ key: 'activeCode', operator: 'eq', value: 'ACTIVE' }],
      pagination: {
        pageSize,
        pageIndex,
      },
      sorting: {
        key: 'createdOn',
        value: 'asc',
      },
    };

    const headers = new HttpHeaders({
      client_id: 'xzXNJFzxNtMvyLIFXCUL1005',
      Authorization: `${this.token}`,
    });

    return this.http
      .post<any>(`${this.Url}/customer/list`, payload, { headers })
      .pipe(
        map((res) => ({
          data: res.partiesList || [],
          totalCount: res.totalCount || 0,
        }))
      );
  }

  getUsers(
    pageIndex: number,
    pageSize: number
  ): Observable<{ data: any[]; totalCount: number }> {
    const payload = {
      entityTypeCode: 'API_GW_PARTY',
      filters: [
        {
          key: 'activeCode',
          operator: 'eq',
          value: 'ACTIVE',
        },
      ],
      pagination: {
        pageSize,
        pageIndex,
      },
      sorting: {
        key: 'createdOn',
        value: 'asc',
      },
    };
    const headers = new HttpHeaders({
      client_id: 'xzXNJFzxNtMvyLIFXCUL1005',
      Authorization: `${this.token}`,
    });

    return this.http
      .post<any>(`${this.Url}/user/list`, payload, { headers })
      .pipe(
        map((res) => ({
          data: res.usersList || [],
          totalCount: res.totalCount || 0,
        }))
      );
  }
}
