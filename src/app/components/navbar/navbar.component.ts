import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName: string | null = null;
  private paramUserName?: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramUserName = this.route.paramMap.subscribe((params) => {
      this.userName = params.get('id');
    });
  }
}
