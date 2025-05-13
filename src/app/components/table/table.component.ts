import { Component, Input, Output } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';

@Component({
  selector: 'app-table',
  standalone: false,
  styleUrl: 'table.component.css',
  templateUrl: 'table.component.html',
})
export class TableComponent {
  totalCount: any;
  pageIndex = 0;
  pageSize = 15;
  @Input() customers: any[] = [];
  displayedColumns: string[] = [
    'PARTY_NAME',
    'EMAIL_ADDRESS',
    'MOBILE_NUMBER',
    'ACTIVE_CODE',
    'STATUS_CODE',
    'actions',
  ];

  constructor(private CustomerData: AuthUserService) {}

  ngOnInit(): void {
    this.fetchCustomers(this.pageIndex, this.pageSize);
    // console.log('table initial pageIndex', this.pageIndex);
    // console.log('table initial pageSize', this.pageSize);
  }

  fetchCustomers(pageIndex: number, pageSize: number): void {
    this.CustomerData.getCustomer(pageIndex, pageSize).subscribe((res) => {
      this.customers = res.data;
      // console.log('fetch Customers', this.customers);
    });
  }
}
