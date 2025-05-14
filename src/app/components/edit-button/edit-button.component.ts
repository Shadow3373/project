import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-button',
  standalone: false,
  templateUrl: './edit-button.component.html',
  styleUrl: './edit-button.component.css',
})
export class EditButtonComponent {
  @Input() userId!: number;

  constructor(private router: Router) {}

  editUser() {
    this.router.navigate(['/edit-form'], {
      queryParams: { id: this.userId },
    });
  }
}
