import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: false,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css',
})
export class PanelComponent {
  label: string = 'User Register';

  constructor(private route: Router){}

  changeDir() {
    this.route.navigate(['user-module']);
  }
}
