import { Component, Input } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.component.html',
  styleUrl: './listcustomer.component.css',
})
export class ListcustomerComponent {
  totalCount: any;
  pageSize = 10;
  pageIndex = 0;
  @Input() users: any[] = [];

  displayedColumns: string[] = [
    'PARTY_NAME',
    'PARTY_CODE',
    'EMAIL_ADDRESS',
    'MOBILE_NUMBER',
    'ACTIVE_CODE',
    'actions',
  ];

  constructor(private userData: AuthUserService) {}

  ngOnInit(): void {
    this.fetchUsers(this.pageIndex, this.pageSize);
  }

  fetchUsers(pageIndex: number, pageSize: number) {
    this.userData.getUsers(pageIndex, pageSize).subscribe((res) => {
      this.users = res.data;
      console.log('fetch users', this.users);
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchUsers(this.pageIndex, this.pageSize);
  }

  editFunction() {}
}
