import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthUserService } from '../../service/auth-user.service';
import { ListcustomerComponent } from '../listcustomer/listcustomer.component';

@Component({
  selector: 'app-edit-form',
  standalone: false,
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.css',
})
export class EditFormComponent {
  userId: number | null = null;
  user: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = +params['id'];
      if (this.userId) {
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(id: number) {
    // this.users.fetchUsers()
    const mockUsers = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
      { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    ];

    this.user = mockUsers.find((u) => u.id === id);
  }
}
