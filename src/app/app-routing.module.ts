import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { FromSubmitComponent } from './components/from-submit/from-submit.component';
import { TabelComponent } from './components/table/table.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'createuser', component: FromSubmitComponent },
  { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'listUser', component: TabelComponent },
  { path: '**', component: NotFoundComponent },
  { path: '**', redirectTo: 'app-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// canActivate: [AuthGuard]
