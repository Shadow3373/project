import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { AuthUserService } from '../../service/auth-user.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;
  loadusers: any;
  @Input() activeUsers: any;
  constructor(
    private auth: AuthUserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.initChart();
  }

  pageIndex: number = 0;
  pageSize: number = 1000;

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor =
        documentStyle.getPropertyValue('--text-color') || '#495057';

      this.data = {
        labels: [
          'Active Users',
          'Inactive Users',
          'Active Customers',
          'Inactive Customers',
        ],
        datasets: [
          {
            data: [this.loadusers, 35, 45, 30],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-orange-500') || '#ff9800',
              documentStyle.getPropertyValue('--p-gray-500') || '#9e9e9e',
              documentStyle.getPropertyValue('--p-green-500') || '#ffceff',
              documentStyle.getPropertyValue('--p-red-500') || '#9e9efc',
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-orange-400') || '#ffa726',
              documentStyle.getPropertyValue('--p-gray-400') || '#bdbdbd',
              documentStyle.getPropertyValue('--p-green-400') || '#ffcefa',
              documentStyle.getPropertyValue('--p-red-400') || '#9e9efa',
            ],
          },
        ],
      };

      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
          tooltip: {
            bodyColor: textColor,
            titleColor: textColor,
            backgroundColor: '#ffffff',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };

      this.cd.markForCheck();
    }
  }
}
