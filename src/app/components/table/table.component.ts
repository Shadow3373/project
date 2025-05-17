import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { InactiveDialogComponent } from '../inactive-dialog/inactive-dialog.component';

@Component({
  selector: 'app-table',
  standalone: false,
  styleUrl: 'table.component.css',
  templateUrl: 'table.component.html',
})
export class TableComponent {
  dialog = inject(MatDialog);
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

  inActiveDialog(customer: any) {
    this.dialog.open(InactiveDialogComponent, {
      width: '500px',
      data: {
        partyCode: customer.PARTY_CODE,
        partyStatus: customer.ACTIVE_CODE,
        partyName: customer.PARTY_NAME,
      },
    });
  }

  openDialog(customer: any): void {
    this.dialog.open(DeleteDialogRefComponent, {
      disableClose: false,
      width: '250px',
      data: {
        user: customer,
        list: this.dataSource,
      },
    });
  }
}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialogRef.component.html',
  styleUrl: './delete-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogContent, MatDialogActions],
})
export class DeleteDialogRefComponent {
  customer = inject(MAT_DIALOG_DATA);
  DialogRef = inject(MatDialogRef);

  remove(customer: any) {
    const datalist = this.customer.list.data;
    const index = datalist.indexOf(this.customer.user);
    if (index > -1) {
      datalist.splice(index, 1);
      this.customer.list.data = [...datalist];
      console.log('customer deleted successfully');
    }
  }
}
