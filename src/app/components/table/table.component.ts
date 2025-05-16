import { Component, Input, Output, ViewChild } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: false,
  styleUrl: 'table.component.css',
  templateUrl: 'table.component.html',
})
export class TableComponent {
  totalCount: any;

  displayedColumns: string[] = [
    'PARTY_NAME',
    'PARTY_CODE',
    'EMAIL_ADDRESS',
    'MOBILE_NUMBER',
    'STATUS_CODE',
    'actions',
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private CustomerData: AuthUserService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchCustomers(): void {
    const customerPayload = {
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

    this.CustomerData.getCustomer(customerPayload).subscribe((res) => {
      this.dataSource.data = res.data;
      this.totalCount = res.totalCount;
    });
  }

  remove(customer: any) {
    const index = this.dataSource.data.indexOf(customer);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = [...this.dataSource.data];
    }
  }
}
