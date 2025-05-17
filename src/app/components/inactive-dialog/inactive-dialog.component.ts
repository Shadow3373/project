import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthUserService } from '../../service/auth-user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive-dialog',
  standalone: false,
  templateUrl: './inactive-dialog.component.html',
  styleUrl: './inactive-dialog.component.css',
})
export class InactiveDialogComponent {
  dialogRef = inject(MatDialogRef<InactiveDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  payload = {
    partyCode: this.data.partyCode,
    partyName: this.data.partyName,
    partyStatus: this.data.partyStatus,
    reason: '',
  };

  constructor(private route: Router, private auth: AuthUserService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(inActive: NgForm) {
    if (this.payload.partyStatus === "ACTIVE") {
      const inActiveData = {
        partyCode: this.payload.partyCode,
        reason: inActive.value.reason,
      };
      this.auth.inactiveCustomer(inActiveData).subscribe((res) => {
        return res;
      });
    } else {
      const inActiveData = {
        partyCode: this.payload.partyCode,
        reason: inActive.value.reason,
      };
      this.auth.activeCustomer(inActiveData).subscribe((res) => {
        return res;
      });
    }
  }
}
