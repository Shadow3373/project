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
  length: any = 0;

  displayedColumns: string[] = [
    'PARTY_NAME',
    'PARTY_CODE',
    'EMAIL_ADDRESS',
    'MOBILE_NUMBER',
    'ACTIVE_CODE',
    'actions',
  ];

  dataSource: any = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userData: AuthUserService) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    console.log(this.dataSource);
    this.fetchUsers();
  }

  fetchUsers() {
    const payload = {
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

    this.userData.getUsers(payload).subscribe((res) => {
      this.dataSource.data = res.data;
      this.length = res.totalCount;
    });
  }

  remove(user: any) {
    const index = this.dataSource.data.indexOf(user);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    }
  }
}
