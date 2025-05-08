import { Component } from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  formData = {
    userName: '',
    email: '',
    keyword: '',
    ConfirmKeyword: '',
  };
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private newUser: AuthUserService) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
