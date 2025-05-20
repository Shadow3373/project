import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthUserService } from '../../service/auth-user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-active-dialog',
  standalone: false,
  templateUrl: './active-dialog.component.html',
  styleUrl: './active-dialog.component.css',
})
export class ActiveDialogComponent {
  dialogRef = inject(MatDialogRef<ActiveDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  payload = {
    userCode: this.data.userCode,
    userName: this.data.userName,
    userStatus: this.data.userStatus,
    reason: '',
  };

  constructor(private auth: AuthUserService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onActive(active: NgForm) {
   if (this.payload.userStatus === "ACTIVE") {
    const activeData = {
      partyCode: this.payload.userCode,
      reason: active.value.reason,
    };
    this.auth.inactiveCustomer(activeData).subscribe((res) => {
      return res;
    });
   } else {
    const activeData = {
      partyCode: this.payload.userCode,
      reason: active.value.reason,
    };
    this.auth.activeCustomer(activeData).subscribe((res) => {
      return res;
    });
   }
  }
}
