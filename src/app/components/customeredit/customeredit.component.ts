import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from '../../service/auth-user.service';

@Component({
  selector: 'app-customeredit',
  standalone: false,
  templateUrl: './customeredit.component.html',
  styleUrl: './customeredit.component.css',
})
export class CustomereditComponent {
  partyUpdate: any = {
    actionCode: 'update',
    partyData: {
      partyCode: '',
      partyName: '',
      emailAddress: '',
      mobileNumber: '',
    },
  };

  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      (this.partyUpdate.partyData.partyCode = params.get('id')),
        (this.partyUpdate.partyData.partyName = params.get('name')),
        (this.partyUpdate.partyData.emailAddress = params.get('email')),
        (this.partyUpdate.partyData.mobileNumber = params.get('no'));
    });
  }

  modifyCustomer(modifyFrom: NgForm) {
    this.auth.modifyCustomer(this.partyUpdate).subscribe({
      next: (res) => {
        alert('Party Customer Updated Successfully.');
        this.router.navigate(['listcustomer']);
        return res;
      },
      error: (err) => {
        this.errorMsg = err;
        console.log(this.errorMsg);
      },
    });
  }
}
