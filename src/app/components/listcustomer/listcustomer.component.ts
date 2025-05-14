import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.component.html',
  styleUrl: './listcustomer.component.css',
})
export class ListcustomerComponent implements OnInit, AfterViewInit {
  totalCount: any;
  pageSize = 1000;
  pageIndex = 0;

  userId: any;
  fname: any;

  users: any[] = [];

  displayedColumns: string[] = [
    'PARTY_NAME',
    'PARTY_CODE',
    'EMAIL_ADDRESS',
    'MOBILE_NUMBER',
    'ACTIVE_CODE',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userData: AuthUserService) {}

  ngOnInit(): void {
    this.fetchUsers(this.pageIndex, this.pageSize);
    this.pageSize = 10;
    this.updateUserslist(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchUsers(pageIndex: number, pageSize: number) {
    this.userData.getUsers(pageIndex, pageSize).subscribe((res) => {
      this.users = res.data;
      this.totalCount = this.users.length;
      this.pageSize = res.totalCount;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updateUserslist(this.pageIndex, this.pageSize);
  }

  updateUserslist(pageIndex: number, pageSize: number) {
    this.userData.getUsers(pageIndex, pageSize).subscribe((res) => {
      this.pageSize = res.totalCount;
      this.users = res.data;
    });
  }
}
