import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  constructor(
    private http: HttpClient,
    private route: Router,
    private router: ActivatedRoute
  ) {}
  private clientId = 'xzXNJFzxNtMvyLIFXCUL1005';
  private Url = 'http://172.16.16.49:7055/v1/trade';

  private token = localStorage.getItem('token');

  loginApi(myFrom: any): Observable<any> {
    return this.http.post(`${this.Url}/signIn`, myFrom);
  }

  logoutApi(token: any): Observable<any> {
    return this.http.post(`${this.Url}/signOut`, token);
  }

  OAuthUser(token: any): Observable<any> {
    const headers = new HttpHeaders({
      client_id: this.clientId,
    });

    return this.http.post(`${this.Url}/authenticate/token`, token, { headers });
  }

  userCreate(rData: any): Observable<any> {
    const headers = new HttpHeaders({
      client_id: this.clientId,
      Authorization: `${this.token}`,
    });
    return this.http.post(`${this.Url}/onboarding/submit`, rData, { headers });
  }

  modifyUser(userData: any): Observable<any> {
    const Data = {
      actionCode: 'update',
      userData,
    };
    const headers = new HttpHeaders({
      client_id: this.clientId,
      Authorization: `${this.token}`,
    });

    return this.http.post(`${this.Url}/user/modify`, Data, {
      headers,
    });
  }

  modifyCustomer(partyData: any): Observable<any> {
    const headers = new HttpHeaders({
      client_id: this.clientId,
      Authorization: `${this.token}`,
    });

    return this.http.post(`${this.Url}/customer/modify`, partyData, {
      headers,
    });
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
      client_id: this.clientId,
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
      client_id: this.clientId,
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
