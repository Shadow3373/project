import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
  PARTY_NAME: string;
  EMAIL_ADDRESS: string;
  STATUS_CODE: string;
  MOBILE_NUMBER: string;
  ACTIVE_CODE: string;
}
@Component({
  selector: 'app-table',
  standalone: false,
  styleUrl: 'table.component.css',
  templateUrl: 'table.component.html',
})
export class TabelComponent {
  totalCount: any;
  pageIndex = 0;
  pageSize = 15;
  @Input() users: any[] = [];

  displayedColumns: string[] = [
    'PARTY_NAME',
    'EMAIL_ADDRESS',
    'MOBILE_NUMBER',
    'ACTIVE_CODE',
    'STATUS_CODE',
  ];

  constructor(private userData: AuthUserService) {}

  ngOnInit(): void {
    this.fetchUsers(this.pageIndex, this.pageSize);
    console.log('table initial pageIndex', this.pageIndex);
    console.log('table initial pageSize', this.pageSize);
  }

  fetchUsers(pageIndex: number, pageSize: number): void {
    this.userData.getUsers(pageIndex, pageSize).subscribe((res) => {
      this.users = res.data;
      console.log('fetch users', this.users);
    });
  }
}
