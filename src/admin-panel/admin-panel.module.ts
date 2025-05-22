import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminpanelRoutingTsModule } from './adminpanel-routing.ts.module';

@NgModule({
  declarations: [PanelComponent, DashboardComponent],
  imports: [CommonModule, AdminpanelRoutingTsModule],
})
export class AdminPanelModule {}
