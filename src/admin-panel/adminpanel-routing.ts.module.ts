import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelComponent } from './panel.component';
import { RegisterComponent } from '../app/components/register/register.component';

const route: Routes = [
  {path:'admin', component: PanelComponent},
  {
    path: '',
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user-module', component: RegisterComponent },
    ],  
  },
];

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class AdminpanelRoutingTsModule {}
