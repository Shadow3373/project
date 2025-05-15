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
  pageIndex = 0;
  pageSize = 100;
  customers: any[] = [];

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
    this.fetchCustomerParties(this.pageIndex, this.pageSize);
    // this.pageSize = 10;
    // this.updatedCusterlist(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchCustomerParties(pageIndex: number, pageSize: number): void {
    this.CustomerData.getCustomer(pageIndex, pageSize).subscribe((res) => {
      this.customers = res.data;
      this.totalCount = this.customers.length;
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatedCusterlist(this.pageIndex, this.pageSize);
  }

  updatedCusterlist(pageIndex: number, pageSize: number) {
    this.CustomerData.getCustomer(pageIndex, pageSize).subscribe((res) => {
      this.pageSize = res.data.length;
      this.customers = res.data;
    });
  }

  remove(customer: any) {
    const index = this.customers.indexOf(customer);
    if (index > -1) {
      this.customers.splice(index, 1);
      this.customers = [...this.customers];
    }
  }
}
