import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChartModule } from 'primeng/chart';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { FromSubmitComponent } from './components/from-submit/from-submit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ListcustomerComponent } from './components/listcustomer/listcustomer.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CustomereditComponent } from './components/customeredit/customeredit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InactiveDialogComponent } from './components/inactive-dialog/inactive-dialog.component';
import { ActiveDialogComponent } from './components/active-dialog/active-dialog.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AdminPanelModule } from '../admin-panel/admin-panel.module';
import { AdminpanelRoutingTsModule } from '../admin-panel/adminpanel-routing.ts.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    TableComponent,
    FromSubmitComponent,
    NavbarComponent,
    SidenavComponent,
    ListcustomerComponent,
    EditFormComponent,
    LoadingComponent,
    CustomereditComponent,
    DashboardComponent,
    InactiveDialogComponent,
    ActiveDialogComponent,
    PieChartComponent,
  ],
  imports: [
    AppRoutingModule,
    AdminpanelRoutingTsModule,
    BrowserModule,
    ChartModule,
    FormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogClose,
    MatDialogActions,
    MatDialogContent,
    MatProgressSpinnerModule,
    AdminPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
