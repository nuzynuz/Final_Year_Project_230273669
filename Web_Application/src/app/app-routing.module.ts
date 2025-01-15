import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user-common/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes : Routes=[
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent},
  {
    path: 'manager',
    canActivate:[AuthGuardService],
    loadChildren: ()=> import('./components/manager/manager.module').then(m=>m.ManagerModule),
  },
  {
    path: 'coordinator',
    canActivate:[AuthGuardService],
    loadChildren: ()=> import('./components/coordinator/coordinator.module').then(m=>m.CoordinatorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
