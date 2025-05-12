import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthUserService } from '../../service/auth-user.service';

@Component({
  selector: 'app-from-submit',
  standalone: false,
  templateUrl: './from-submit.component.html',
  styleUrl: './from-submit.component.css',
})
export class FromSubmitComponent {
  constructor(private auth: AuthUserService) {}
  rData = {
    partyData: {
      partyCode: '',
      partyName: '',
      emailAddress: '',
      mobileNumber: '',
    },
    userData: {
      userId: '',
      firstName: '',
      lastName: '',
      emailAddress: '',
      mobileNumber: '',
    },
  };

  client_id = 'xzXNJFzxNtMvyLIFXCUL1005';

  errorMsg = '';

  onSubmit(userfrom: NgForm) {
    this.auth.userCreate(this.rData, this.client_id).subscribe({
      next: (res) => {
        alert('SuccessFully Registered the user.');
        return res;
      },
      error: (err) => {
        console.log(err);
      },
    });
    // console.log('from successfully submitted', this.rData);
  }
}
