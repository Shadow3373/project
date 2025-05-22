import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  active: number = 0;
  inactive: number = 0;
  totalUser: number = 0;

  constructor(private auth: AuthUserService) {}

  ngOnInit(): void {
    this.activeUser();
    this.inactiveuser();
    this.totalUsers();
  }

  private activePayload = {
    entityTypeCode: 'API_GW_PARTY',
    filters: [
      {
        key: 'activeCode',
        operator: 'eq',
        value: 'ACTIVE',
      },
    ],
    pagination: {
      pageSize: 1000,
      pageIndex: 0,
    },
    sorting: {
      key: 'createdOn',
      value: 'asc',
    },
  };

  private InActivePayload = {
    entityTypeCode: 'API_GW_PARTY',
    filters: [
      {
        key: 'activeCode',
        operator: 'eq',
        value: 'IN_ACTIVE',
      },
    ],
    pagination: {
      pageSize: 1000,
      pageIndex: 0,
    },
    sorting: {
      key: 'createdOn',
      value: 'asc',
    },
  };

  private Payload = {
    entityTypeCode: 'API_GW_PARTY',
    filters: [],
    pagination: {
      pageSize: 1000,
      pageIndex: 0,
    },
    sorting: {
      key: 'createdOn',
      value: 'asc',
    },
  };

  activeUser() {
    this.auth.getUsers(this.activePayload).subscribe((res) => {
      this.active = res.data.length;
    });
  }

  inactiveuser() {
    this.auth.getUsers(this.InActivePayload).subscribe((res) => {
      this.inactive = res.data.length;
    });
  }

  totalUsers() {
    this.auth.getUsers(this.Payload).subscribe((res) => {
      this.totalUser = res.data.length;
    });
  }
  
}
