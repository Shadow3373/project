import { Component, Output, EventEmitter, Input, input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthUserService } from '../../service/auth-user.service';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  customers: any[] = [];
  totalCount = 50;
  pageSize = 10;
  pageIndex = 0;

  constructor(
    private CustomerData: AuthUserService,
    private updatedCustomers: TableComponent
  ) {}

  ngOnInit(): void {
    this.fetchCustomerParties(this.pageIndex, this.pageSize);
    // console.log('initial load', this.pageIndex, this.pageSize);
  }

  fetchCustomerParties(pageIndex: number, pageSize: number): void {
    this.CustomerData.getCustomer(pageIndex, pageSize).subscribe((res) => {
      this.customers = res.data;
      this.updatedCustomers.fetchCustomers(pageIndex, pageSize);
      console.log('fetch customers', this.customers);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchCustomerParties(this.pageIndex, this.pageSize);
    // console.log('page event', this.pageIndex, this.pageSize);
  }
}
