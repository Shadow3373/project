import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { FromSubmitComponent } from './components/from-submit/from-submit.component';
import { TableComponent } from './components/table/table.component';
import { ListcustomerComponent } from './components/listcustomer/listcustomer.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'createuser', component: FromSubmitComponent },
      { path: 'listcustomer', component: TableComponent },
      { path: 'listuser', component: ListcustomerComponent },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotFoundComponent },
  { path: '**', redirectTo: 'app-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
