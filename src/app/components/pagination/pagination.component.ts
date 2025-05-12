import { Component, Output, EventEmitter, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthUserService } from '../../service/auth-user.service';
import { TabelComponent } from '../table/table.component';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  users: any[] = [];
  totalCount = 100;
  pageSize = 15;
  pageIndex = 0;

  constructor(
    private userData: AuthUserService,
    private updatedUser: TabelComponent
  ) {}

  ngOnInit(): void {
    this.fetchParties(this.pageIndex, this.pageSize);
    console.log('initial load', this.pageIndex, this.pageSize);
  }

  fetchParties(pageIndex: number, pageSize: number): void {
    this.userData.getUsers(pageIndex, pageSize).subscribe((res) => {
      this.users = res.data;
      this.updatedUser.fetchUsers(pageIndex, pageSize);
      console.log('pagination users', this.users);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchParties(this.pageIndex, this.pageSize);
    console.log('page event', this.pageIndex, this.pageSize);
  }
}
