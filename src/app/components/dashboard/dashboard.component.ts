import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: any;
  options: any;

  @Input() activeUsers: any;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor =
        documentStyle.getPropertyValue('--text-color') || '#495057';

      this.data = {
        labels: ['Active Users', 'Inactive Users'],
        datasets: [
          {
            data: [540, 325],
            backgroundColor: [
              documentStyle.getPropertyValue('--p-orange-500') || '#ff9800',
              documentStyle.getPropertyValue('--p-gray-500') || '#9e9e9e',
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--p-orange-400') || '#ffa726',
              documentStyle.getPropertyValue('--p-gray-400') || '#bdbdbd',
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
