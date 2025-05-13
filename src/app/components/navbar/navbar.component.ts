import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  userName: string | null = null;
  private paramUserName?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private menutoggle: HomeComponent
  ) {}

  ngOnInit(): void {
    this.paramUserName = this.route.paramMap.subscribe((params) => {
      this.userName = params.get('id');
    });
  }

  toggle() {
    if (this.menutoggle.isOpened == true) {
      this.menutoggle.isOpened = false;
    } else {
      this.menutoggle.isOpened = true;
    }
  }
}
