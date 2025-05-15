import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthUserService } from '../../service/auth-user.service';

@Component({
  selector: 'app-edit-form',
  standalone: false,
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css',
})
export class EditFormComponent {
  eData: any = {
    userId: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    mobileNumber: '',
    parentPartyCode: 'ABC',
  };

  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private auth: AuthUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const fullName = params.get('name');
      (this.eData.userId = params.get('id')),
        (this.eData.firstName = fullName?.split(' ')[0]),
        (this.eData.lastName = fullName?.split(' ')[1]),
        (this.eData.emailAddress = params.get('email')),
        (this.eData.mobileNumber = params.get('no'));
    });
    console.log(this.eData);
  }

  modifyUser(modifyFrom: NgForm) {
    this.auth.modifyUser(this.eData).subscribe({
      next: (res) => {
        alert('User Updated Successfully.');
        this.router.navigate(['listuser']);
        return res;
      },
      error: (err) => {
        this.errorMsg = err;
        console.log(this.errorMsg);
      },
    });
  }
}
