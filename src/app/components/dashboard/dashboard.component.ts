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
  users: any;
  inActiveUsers: any;
  @Input() activeUsers: any;
  constructor(
    private auth: AuthUserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cd: ChangeDetectorRef
  ) {}
  getusers() {
    const payload = {
      entityTypeCode: 'API_GW_PARTY',
      filters: [
        {
          key: 'activeCode',
          operator: 'eq',
          value: 'ACTIVE',
        },
      ],
      pagination: {
        pageSize: 1000,
        pageIndex: 0,
      },
      sorting: {
        key: 'createdOn',
        value: 'asc',
      },
    };

    this.auth.getUsers(payload).subscribe((res) => {
      this.users = res.data.length;
      this.initChart();
      console.log(this.users);
    });
  }

  getInavtiveUsers() {
    const payload = {
      entityTypeCode: 'API_GW_PARTY',
      filters: [
        {
          key: 'activeCode',
          operator: 'eq',
          value: 'IN_ACTIVE',
        },
      ],
      pagination: {
        pageSize: 1000,
        pageIndex: 0,
      },
      sorting: {
        key: 'createdOn',
        value: 'asc',
      },
    };

    this.auth.getUsers(payload).subscribe((res) => {
      this.inActiveUsers = res.data.length;
      this.initChart();
      console.log(this.inActiveUsers);
    });
  }
  ngOnInit() {
    this.getusers();
    this.getInavtiveUsers();
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
            data: [this.users, this.inActiveUsers],
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
