import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  user: number;
  list: any;
}

@Component({
  selector: 'app-listcustomer',
  standalone: false,
  templateUrl: './listcustomer.component.html',
  styleUrl: './listcustomer.component.css',
})
export class ListcustomerComponent implements OnInit, AfterViewInit {
  dialog = inject(MatDialog);
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

  openDialog(user: any): void {
    this.dialog.open(DeleteDialogRefComponent, {
      width: '250px',
      data: {
        user: user,
        list: this.dataSource,
      },
    });
  }
}

@Component({
  selector: 'app-delete-dialogRef',
  templateUrl: './delete-dialogRef.component.html',
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogRefComponent {
  user = inject(MAT_DIALOG_DATA);
  DialogRef = inject(MatDialogRef);

  remove(user: any) {
    const datalist = this.user.list.data;
    const index = datalist.indexOf(this.user.user);
    if (index > -1) {
      datalist.splice(index, 1);
      this.user.list.data = [...datalist];
      console.log('user deleted successfully');
    }
  }
}
